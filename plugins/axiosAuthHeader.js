export default function({ $axios }) {
  $axios.onRequest(config => {
    let token = localStorage.getItem("authToken");
    if (!!token) {
      $axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      delete $axios.defaults.headers.common["Authorization"];
    }
    return config;
  });
}
