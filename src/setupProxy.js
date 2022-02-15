const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "http://10.0.3.92:8080",
      target: "http://localhost:8080",
      // target: 'http://192.168.0.126:8080',
      // target: 'http://10.0.2.4:8080',
      changeOrigin: true,
    })
  );
};
