import {API} from "./api";

const APPOINTMENT_PATH = "/appointment";

export const getAppointments = async () => {
  // awaiting response and returning the payload
  const res = await API.get(`${APPOINTMENT_PATH}/list`);
  return res.data;
}

export const checkAppointmentAvailability = async (date) => {
  // awaiting response and returning the payload
  const res = await API.get(`${APPOINTMENT_PATH}/availability?schedule=${date}`);
  return res.data;
}

export const bookAppointment = async (schedule, clientId) => {
  // parameter setup
  const params = new URLSearchParams();
  params.append('schedule', schedule);
  params.append('clientId', clientId);

  // awaiting response and returning the payload
  const res = await API.post(`${APPOINTMENT_PATH}/book`, params);
  return res.data;
}

export const concludeAppointment = async (id, notes) => {
  // parameter setup
  const params = new URLSearchParams();
  params.append('notes', notes);

  // awaiting response and returning the payload
  const res = await API.patch(`${APPOINTMENT_PATH}/conclude/${id}`, params);
  return res.data;
}
