const server = require("./server");
const routes = require("./routes");

routes(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
