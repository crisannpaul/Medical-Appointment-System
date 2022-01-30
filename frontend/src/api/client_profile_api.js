import {API} from "./api";

const CLIENT_PROFILE_PATH = "/client/profile";

export const getClients = async () => {
  // awaiting response and returning the payload
  const res = await API.get(`${CLIENT_PROFILE_PATH}/list`);
  return res.data;
}

export const findClientById = async (id) => {
  // awaiting response and returning the payload
  const res = await API.get(`${CLIENT_PROFILE_PATH}/view/${id}`);
  return res.data;
}

export const updateClientById = async (id, name, email, password, record) => {
  // parameter setup
  const params = new URLSearchParams();
  if (name != null) params.append('name', name);
  if (email != null) params.append('email', email);
  if (password != null) params.append('password', password);
  if (record != null) params.append('record', record);

  // awaiting response and returning the payload
  const res = await API.patch(`${CLIENT_PROFILE_PATH}/update/${id}`, params);
  return res.data;
}