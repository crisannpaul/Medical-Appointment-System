import React from 'react';
import {registerClient} from "../../api/client_auth_api";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [record, setRecord] = React.useState("");

  const handleNameChange = (event) => {
    event.persist();
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    event.persist();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.persist();
    setPassword(event.target.value);
  };

  const handleRecordChange = (event) => {
    event.persist();
    setRecord(event.target.value);
  };

  const handleRegisterPress = (e) => {
    registerServerCall();
    e.preventDefault();
  }

  const registerServerCall = async () => {
    // send client data and get response
    const response = await registerClient(name, email, password, record);
    /**
     * show the response from server and re-direct to login
     * ---
     * on successful login, the user isn't logged in,
     * and on "email exists", the account already exists
     * so both scenarios require login, thus redirect
     */
    window.alert(response);
    navigate('/login');
  }

  return (
    <Form>
      <h1>
        Account Registration
      </h1>
      <br/>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          Name
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="email"
            placeholder="Name"
            defaultValue={name}
            onChange={handleNameChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          Email
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="email"
            placeholder="Email"
            defaultValue={email}
            onChange={handleEmailChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={3}>
          Password
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={handlePasswordChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          Medical Record
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="email"
            placeholder="Enter your medical record"
            defaultValue={record}
            onChange={handleRecordChange}
            as="textarea"
            rows={6}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col>
          <Button
            type="submit"
            onClick={handleRegisterPress}
            style={{float: 'right'}}
          >Register</Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default Register;