import axios from 'axios';

const api = {
  get: (path) => {
    return axios.get(path)
      .then(response => response)
      .catch(err => { throw err });
  },
  post: (path, body) => {
    return axios.post(path, body)
      .then(response => response)
      .catch(err => { throw err });
  }
};

export default api;
