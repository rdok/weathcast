function webRoutes(server) {
  server.get("/", (req, res) => res.render("index", { title: "Homepage" }));
  server.get("/about", (req, res) => res.render("about", { title: "About" }));
  server.get("*", (req, res) => res.render("error", { title: "Not Found" }));
}

module.exports = { webRoutes };
