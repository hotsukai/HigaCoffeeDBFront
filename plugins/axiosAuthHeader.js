import axios from "axios";

export default function({ $axios }) {
  let token = localStorage.getItem("authToken");
  console.debug("auth token ", token);
  $axios.onRequest(config => {
    $axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    return config;
  });
}
