const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// app.use(bodyParser.json({limit: '50mb'})); 
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true })); 
app.use(bodyParser.urlencoded({ extended: false }));
const cors = require("cors");
app.use(cors());
const router = require('./router')
app.use('/api',router)

//引入websocket
let ws = require('nodejs-websocket')
//设定端口
let port = 8010;
let user = 0

// 创建新的连接，每加进来一个用户都会走一遍
let server = ws.createServer((connect)=>{
    console.log('create a new websocket connection')
    user++;
    connect.nickname = 'user' + user
    connect.fd = 'user' + user
    let mes = {};
    mes.type = 'enter'
    mes.data = connect.nickname + 'enter the room'
    broadcast(JSON.stringify(mes))

    //客户端发送数据
    connect.on('text' ,(data)=>{
        let dataP=JSON.parse(data)
        let str=dataP.txt
        let str2=dataP.txt2
        console.log('dataP:',dataP);
        console.log('answer'+str)
        mes.type = 'message';
        mes.data = str2 + ':' + str;
        broadcast(JSON.stringify(mes))
    })

    //关闭连接
    connect.on('close' ,(code , reason) => {
        console.log('close the connection')
        mes.type = 'leave';
        mes.data = connect.nickname + 'leave the room' 
        broadcast(JSON.stringify(mes))
    })

    connect.on('error', ()=>{
      broadcast(JSON.stringify('未知错误'))
    })

}).listen(port)
//播报消息，每个用户的信息都会被发送
function broadcast(str){
    server.connections.forEach(function(connection){
        connection.sendText(str)
    })
}


//启动服务器
app.listen(80, () => {
  console.log("express running at http://127.0.0.1"); //启动成功
});