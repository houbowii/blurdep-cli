const cp = require("child_process")
const 
    express = require('express'),
    betterFS = require('./utils/betterFS'),
    bodyParser = require('body-parser'), 
    path = require('path'),
    server = express();

let port = (process.env.npm_config_port)?process.env.npm_config_port:3033;

server.listen(port, ()=>{
    console.log(`server start in ${port}\nclick: (ctrl+click)`); 
    console.log('\x1B[32m%s\x1B[0m',`\thttp://localhost:${port}/`);
    cp.exec(`start chrome http://localhost:${port}/`)
});

server.use(bodyParser.urlencoded({extended: true}));

server.use(express.static("./client"));
server.use((req, res)=>{
    res.status(404);
    let file404 = betterFS.readFile(path.resolve("./client/error/404.html")).then(result=>{
        res.send(result);
    }).catch(err=>{
        console.log(err);
    })
})