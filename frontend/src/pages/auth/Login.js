import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {loginClient} from "../../api/client_auth_api";

const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleEmailChange = (event) => {
    event.persist();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.persist();
    setPassword(event.target.value);
  };

  const handleLoginPress = (e) => {
    loginServerCall();
    e.preventDefault();
  };

  const loginServerCall = async () => {
    // get the client object from login API call
    const client = await loginClient(email, password);
    if (client.id == null)
      window.alert("User does not exist.")
    else {
      // set the browser storage key of "client" to be client object
      localStorage.setItem('client', JSON.stringify(client));
      // navigate to home page
      navigate('/');
      // reload page to reflect on updated browser storage
      window.location.reload();
    }
  }

  return (
    <Form>
      <h1>
        Account Login
      </h1>
      <br />

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

      <Form.Group as={Row} className="mb-3">
        <Col>
          <Button
            type="submit"
            onClick={handleLoginPress}
            style={{float: 'right'}}
          >Login</Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default Login;