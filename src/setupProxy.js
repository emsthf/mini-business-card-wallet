const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://10.0.3.92:8080",
      changeOrigin: true,
    })
  );
};
