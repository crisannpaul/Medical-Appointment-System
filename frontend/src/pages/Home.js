import React, {Component} from 'react';
import {loginClient, registerClient} from "../api/client_auth_api";
import {findClientById, getClients, updateClientById} from "../api/client_profile_api";
import {
  bookAppointment,
  checkAppointmentAvailability, concludeAppointment,
  findAppointmentById,
  getAppointments
} from "../api/appointment_api";

class Home extends Component {
  render() {
    return (
      <div>
        <p>Welcome to the home page.</p>
        <button onClick={async () => {
          const res = await loginClient("borys@mail.com", "borys10");
          console.log(res);
        }}>
          loginClient()
        </button>
        <button onClick={async () => {
          const res = await registerClient("Borys Kubisty", "borys@mail.com", "borys10", "peanut allergy");
          console.log(res);
        }}>
          registerClient()
        </button>

        <button onClick={async () => {
          const res = await getClients();
          console.log(res);
        }}>
          getClients()
        </button>

        <button onClick={async () => {
          const res = await findClientById(1);
          console.log(res);
        }}>
          findClientById()
        </button>

        <button onClick={async () => {
          const res = await updateClientById(1, "MR BORYS");
          console.log(res);
        }}>
          updateClientById()
        </button>


        <button onClick={async () => {
          const res = await getAppointments();
          console.log(res);
        }}>
          getAppointments()
        </button>

        <button onClick={async () => {
          const res = await findAppointmentById(1);
          console.log(res);
        }}>
          findAppointmentById()
        </button>

        <button onClick={async () => {
          const date = new Date();
          const schedule = date.toISOString();

          const res = await checkAppointmentAvailability(schedule);
          console.log(res);
        }}>
          checkAppointmentAvailability()
        </button>

        <button onClick={async () => {
          const date = new Date();
          const schedule = date.toISOString();

          const res = await bookAppointment(schedule, 1);
          console.log(res);
        }}>
          bookAppointment()
        </button>

        <button onClick={async () => {
          const res = await concludeAppointment(1, "Client has foot injury. Has been given medication.");
          console.log(res);
        }}>
          concludeAppointment()
        </button>
    </div>
    );
  }
}

export default Home;