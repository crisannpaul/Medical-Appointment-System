import React, {Component} from 'react';
import {registerClient} from "../../api/client_auth_api";

class Register extends Component {
  render() {
    return (
      <div>
        <p>Welcome to the registration page.</p>
        <button
          onClick={() => registerClient("Borys Kubisty", "borys@mail.com", "borys10", "peanut allergy")}>Register
        </button>
      </div>
    );
  }
}

export default Register;