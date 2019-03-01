import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // add it to all the req
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
