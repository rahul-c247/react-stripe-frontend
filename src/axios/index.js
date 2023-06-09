import axios from 'axios';
let serverURl = process.env.REACT_APP_API_END_POINT;

const ApiHelper =  axios.create({
  baseURL: serverURl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

export const setAuthToken = (token) => {
  const auth = `Bearer ${token}`;
  ApiHelper.defaults.headers.common['Authorization'] = auth;
};


const requestHandler = (request) => {
    return request;
  };
  
  const responseHandler = (response) => {
    return response;
  };
  
  const errorHandler = (error) => {
  
    // eslint-disable-next-line no-console
    //console.log(error.response.data, "Server Interaction error");
  
    return error;
  
  };

  ApiHelper.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${JSON.parse(token)}` : '';
    return config;
  });

  ApiHelper.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
  );
  
  ApiHelper.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
  );

  export default ApiHelper;