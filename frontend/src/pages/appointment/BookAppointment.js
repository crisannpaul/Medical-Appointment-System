import React from 'react';
import NotLoggedIn from "../../components/NotLoggedIn";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import {bookAppointment, checkAppointmentAvailability} from "../../api/appointment_api";

const BookAppointment = () => {
  const client = JSON.parse(localStorage.getItem('client'));

  return client == null ? (<NotLoggedIn/>) : (<Protected client={client}/>);
}

const Protected = (props) => {
  const { client } = props;
  const [appointmentDate, setAppointmentDate] = React.useState(new Date());

  const handleCheckAvailability = (e) => {
    checkAvailabilityCall();
    e.preventDefault();
  }

  const handleConfirmBooking = (e) => {
    confirmBookingCall();
    e.preventDefault();
  }

  const checkAvailabilityCall = async () => {
    const formattedDate = appointmentDate.toISOString();
    const available = await checkAppointmentAvailability(formattedDate);

    window.alert(available ? "The timeslot is available." : "The timeslot is NOT available.");
  }

  const confirmBookingCall = async () => {
    const formattedDate = appointmentDate.toISOString();
    const success = await bookAppointment(formattedDate, client.id);

    window.alert(success ? "Appointment successful booked." : "The timeslot is NOT available.");
  }

  return (<div>
      <h1>Book Appointment</h1>
      <br/>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form>
          <Row>
            <Col sm={4}>
              Bookings are handled by the hour, select one at your nearest convenience.
            </Col>
            <Col sm={8}>
              <Stack direction="horizontal" gap={2}>
                <DatePicker
                  selected={appointmentDate}
                  onChange={(date) => setAppointmentDate(date)}
                  showTimeSelect
                  timeIntervals={60}
                  dateFormat="Pp"
                />
                <Button variant="secondary"
                        onClick={handleCheckAvailability}>
                  Check Availability
                </Button>
                <div className="vr"/>
                <Button variant="primary"
                        onClick={handleConfirmBooking}>
                  Confirm Booking
                </Button>
              </Stack>
            </Col>
          </Row>
        </Form>
      </Form.Group>
    </div>);

}

export default BookAppointment;