const cp = require("child_process")
const 
    express = require('express'),
    betterFS = require('./utils/betterFS'),
    bodyParser = require('body-parser'), 
    path = require('path'),
    port = 8888,
    server = express()



server.listen(port, ()=>{
    console.log(`server start in ${port}\nclick: (ctrl+click)`); 
    console.log('\x1B[32m%s\x1B[0m',`\thttp://localhost:${port}/`);
    cp.exec(`start chrome http://localhost:${port}/`)
});

server.use(bodyParser.urlencoded({extended: true}));//获得到请求体信息,存入req.body


server.use(express.static("./client"));
server.use((req, res)=>{
    res.status(404);
    let file404 = betterFS.readFile(path.resolve("./client/error/404.html")).then(result=>{
        res.send(result);
    }).catch(err=>{
        console.log(err);
    })
})