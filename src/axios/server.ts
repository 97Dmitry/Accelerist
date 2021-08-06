import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://accelerist.herokuapp.com/api/v1/",
});

export default httpClient;

export const axiosFetcher = (url: string) =>
  httpClient.get(url).then((res) => res.data);
