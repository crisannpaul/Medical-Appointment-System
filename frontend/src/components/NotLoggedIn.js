import React from 'react';
import {Alert} from "react-bootstrap";

const NotLoggedIn = () => {
  return (
    <Alert variant="info">You need to be logged in to view your profile.</Alert>
  );
}

export default NotLoggedIn;