import {API} from "./api";

const CLIENT_AUTH_PATH = "/client/auth";

export const registerClient = async (name, email, password, record) => {
  // parameter setup
  const params = new URLSearchParams();
  params.append('name', name);
  params.append('email', email);
  params.append('password', password);
  params.append('record', record);

  // awaiting response and returning the payload
  const res = await API.post(`${CLIENT_AUTH_PATH}/register`, params);
  return res.data;
}

export const loginClient = async (email, password) => {
  // parameter setup
  const params = new URLSearchParams();
  params.append('email', email);
  params.append('password', password);

  console.log(`${CLIENT_AUTH_PATH}/login`);

  // awaiting response and returning the payload
  const res = await API.post(`${CLIENT_AUTH_PATH}/login`, params);
  return res.data;
}
