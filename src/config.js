var axios = require("axios");

// set the default configuration
axios.defaults.baseURL =
  "https://my-json-server.typicode.com/ridoansaleh/my-music-api";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
