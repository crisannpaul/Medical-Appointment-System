import React from 'react';
import NotLoggedIn from "../../components/NotLoggedIn";
import {updateClientById} from "../../api/client_profile_api";
import {Button, Col, Form, Row} from "react-bootstrap";

const ViewClient = () => {
  const client = JSON.parse(localStorage.getItem('client'));

  return client == null ? (<NotLoggedIn/>) : (<Protected client={client}/>);
}

const Protected = () => {
  const client = JSON.parse(localStorage.getItem('client'));

  const [name, setName] = React.useState(client.name);
  const [password, setPassword] = React.useState(client.password);
  const [record, setRecord] = React.useState(client["record"]);

  const handleNameChange = (event) => {
    event.persist();
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.persist();
    setPassword(event.target.value);
  };

  const handleRecordChange = (event) => {
    event.persist();
    setRecord(event.target.value);
  };

  const handleUpdatePress = (e) => {
    updateClientCall();
    e.preventDefault();
  };

  const updateClientCall = async () => {
    console.log(client);
    const newClient = await updateClientById(client.id, name, password, record);
    localStorage.setItem('client', JSON.stringify(newClient));
    window.location.reload();
  };


  return (
    <Form>
      <h1>My Profile</h1>
      <br/>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            defaultValue={client.name}
            onChange={handleNameChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            defaultValue={client.email}
            disabled
          />
          <Form.Text className="text-muted">
            Your email cannot be changed.
          </Form.Text>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            defaultValue={client.password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridRecord">
          <Form.Label>Medical Record</Form.Label>
          <Form.Control
            type="record"
            placeholder="Enter medical record"
            as="textarea"
            rows={6}
            defaultValue={client["record"]}
            onChange={handleRecordChange}
          />
        </Form.Group>
      </Row>

      <Form.Group as={Row} className="mb-3">
        <Col>
          <Button
            type="submit"
            style={{float: 'right'}}
            onClick={handleUpdatePress}
          >Update</Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ViewClient;