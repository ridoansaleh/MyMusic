var axios = require('axios');

// set the default configuration
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;