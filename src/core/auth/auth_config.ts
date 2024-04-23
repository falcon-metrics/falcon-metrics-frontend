const config = {
  domain: 'example.auth0.com',
  clientId: 'CxA4EhS4LPTEH8GlChPx4Q2FiD9xNNb7',
  audience: process.env.REACT_APP_API_BASE_URL
    ? process.env.REACT_APP_API_BASE_URL
    : 'https://api.example.com/',
};

export default config;
