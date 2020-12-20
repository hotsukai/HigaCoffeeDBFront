export default function({ $axios }) {
  $axios.onRequest(config => {
    let token = localStorage.getItem("authToken");
    console.debug("auth token ", token, "isValid : ", !!token);
    if (!!token) {
      $axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      delete $axios.defaults.headers.common["Authorization"];
    }
    console.debug("header : ", $axios.defaults.headers.common["Authorization"]);
    return config;
  });
}
