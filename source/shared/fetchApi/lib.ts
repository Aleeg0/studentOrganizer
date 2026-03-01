import axios from "axios";

//const apiCache = createMMKV();
const api = axios.create({});

export const fetcher = async <T>(url: string) => {
  const { data } = await api.get<T>(url);
  return data;
};
