const server = require("./server");
const {webRoutes} = require("./routes/web");
const {apiRoutes} = require("./routes/api");

apiRoutes(server)
webRoutes(server)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
