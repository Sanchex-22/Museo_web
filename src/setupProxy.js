const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://35.153.252.87:8080/",
      changeOrigin: true,
    })
  );
};
