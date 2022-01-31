import React from 'react';
import NotLoggedIn from "../../components/NotLoggedIn";
import {concludeAppointment, getAppointments} from "../../api/appointment_api";
import {Button, Form, Modal, Table} from "react-bootstrap";

const MyAppointments = () => {
  const client = JSON.parse(localStorage.getItem('client'));

  return client == null ? (<NotLoggedIn/>) : (<Protected client={client}/>);
}

class Protected extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      show: false,
      editId: null,
      editNote: "",
    };
  }

  handleShow = (item) => this.setState({
    show: true,
    editId: item.id,
    editNote: item.notes,
  });
  handleClose = (confirm) => {
    if (confirm) this.handleConcludeCall(this.state.editId, this.state.editNote);

    this.setState({
      show: false,
      editId: null,
      editNote: "",
    });
  }
  handleNotesChange = (event) => {
    event.persist();
    this.setState({
      editNote: event.target.value,
    })
  }

  handleConcludeCall = async (id, notes) => {
    await concludeAppointment(id, notes);
    window.location.reload();
  }

  componentDidMount() {
    this.getAppointmentsCall();
  }

  getAppointmentsCall = async () => {
    const list = await getAppointments();
    this.setState({
      data: list.filter(item => item.clientId === 1),
    })
  }

  render() {
    if (this.state.data == null) return <div>loading...</div>

    const rows = [];

    this.state.data.forEach((item) => {
      //get readable version of date
      const dateObj = new Date(item.schedule);
      let dateString = dateObj.toUTCString();
      // separate the date and line to be on different lines
      const position = dateString.length - 12;
      const output = [dateString.slice(0, position), `<br/>`, dateString.slice(position)].join('');
      // shorthand occurred variable
      const o = item.occurred;

      rows.push(
        <tr>
        <td style={{textAlign: "center", verticalAlign: "middle" }}>{item.id}</td>
        <td><div dangerouslySetInnerHTML={{__html: output}} /></td>
        <td
          style={{
            backgroundColor: o ? "lightgoldenrodyellow" : "lightcoral",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >{o ? "Yes" : "No"}</td>
        <td>{item.notes}</td>
        <td style={{textAlign: "center", verticalAlign: "middle" }}>
          <Button
            onClick={() => this.handleShow(item)}
            variant="secondary"
            size="sm"
          >Conclude</Button>
        </td>
      </tr>
      );
    })

    return <div>
      <h1>My Bookings</h1>
      <br/>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th width={200}>Date & Time</th>
          <th width={120}>Occurred</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
        <Modal show={this.state.show} onHide={() => this.handleClose(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Conclude Appointment</Modal.Title>
          </Modal.Header>
          <Form style={{margin: 20}}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="notes" placeholder="Enter notes"
                as="textarea"
                rows={6}
                defaultValue={this.state.editNote}
                onChange={this.handleNotesChange}
              />
            </Form.Group>
          </Form>
          <Modal.Footer>
            <Button variant="success" onClick={() => this.handleClose(true)}>
              Confirm Appointment Conclusion
            </Button>
          </Modal.Footer>
        </Modal>
      </Table>
    </div>
  }
}


export default MyAppointments;
