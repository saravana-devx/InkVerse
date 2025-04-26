let BaseUrl;

if (process.env.NODE_ENV === 'production') {
  BaseUrl = `${process.env.REACT_APP_Production_Backend_url}/api/v1`;
} else {
  BaseUrl = 'http://localhost:3000/api/v1';
}

export default BaseUrl;
