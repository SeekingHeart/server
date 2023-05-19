const http = require("http");
let hello = "";
for (let i = 0; i < 1024 * 10; i++) {
  hello += "a";
}

const str = hello;
const bufStr = Buffer.from(hello);
const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/buffer") {
    res.end(bufStr);
  } else if (req.url === "/string") {
    res.end(str);
  }
});

server.listen(3000);
