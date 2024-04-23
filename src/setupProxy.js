/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const morgan = require('morgan');
// const createProxyMiddleware = require('http-proxy-middleware');

function projects({ headers, params, query }, resp) {
  console.debug({ headers, params, query });
  const { authorization } = headers;
  return axios
    .get(`https://${params.namespace}.atlassian.net/rest/api/3/project/`, {
      headers: { authorization },
    })
    .then(({ data }) => resp.send(data));
}

module.exports = function (app) {
  app.use(morgan('dev'));
  app.get(
    '/projects/atlassian/jira/:namespace',
    projects,
    // app.use(
    //   '/projects/atlassian/jira/:namespace',
    //   createProxyMiddleware({
    //     target: 'https://example.atlassian.net/rest/api/3/',
    //     changeOrigin: true,
    //     logLevel: 'debug',
    //     // pathRewrite: {
    //     //   '^/atlassian': '', // remove base path
    //     // },
    //     router: function(req) {
    //       const {params, query} = req;
    //       console.debug(params, query);
    //       return {
    //           protocol: 'https:', // The : is required
    //           host: `${params.namespace}.atlassian.net/rest/api/3/project/`,
    //       };
    //     },
    //   }),
  );
};
