import {API} from "./api";

const CLIENT_PROFILE_PATH = "/client/profile";

export const updateClientById = async (id, name, password, record) => {
  // parameter setup
  const params = new URLSearchParams();
  if (name != null) params.append('name', name);
  if (password != null) params.append('password', password);
  if (record != null) params.append('record', record);

  // awaiting response and returning the payload
  const res = await API.patch(`${CLIENT_PROFILE_PATH}/update/${id}`, params);
  return res.data;
}