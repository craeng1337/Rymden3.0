const app = require("./app");
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}