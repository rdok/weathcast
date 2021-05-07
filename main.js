const app = require("./app");
const { webRoutes } = require("./routes/web");
const { apiRoutes } = require("./routes/api");

apiRoutes(app);
webRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
