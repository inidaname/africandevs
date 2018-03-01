var http = require("http");
var fs = require('fs')

http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: application/json
   response.writeHead(200, {"Content-Type": "application/json"});
   
   // Send the response body as "Welcome To Africa"
   var getPeople = fs.createReadStream(__dirname + '/people.json', 'utf8');
    getPeople.pipe(response)
}).listen(8081);

// Console will print the message
console.log('Africa running at http://127.0.0.1:8081/ You are free to join the race');