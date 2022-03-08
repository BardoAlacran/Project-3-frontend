import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005',
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = requestBody => {
    return this.api.post('/auth/login', requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/login");
  };

  signup = requestBody => {
    return this.api.post('/auth/signup', requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/singup");
  };

  verify = () => {
    return this.api.get('/auth/verify');
    // same as
    // return axios.post("http://localhost:5005/auth/verify");
  };

  getAllPosts = () => {
    return this.api.get('/');
  };

  getDetailPost = id => {
    return this.api.get(`/post/${id}`);
  };

  addPost = body => {
    return this.api.post('/add', body);
  };

  deletePost = id => {
    return this.api.delete(`/post/${id}/delete`);
  };

  editPost = (body, id) => {
    return this.api.put(`/post/${id}/edit`, body);
  };

  getProfile = id => {
    return this.api.get(`/profile/${id}`);
  };
}

// Create one instance (object) of the service
const apiService = new ApiService();

export default apiService;
