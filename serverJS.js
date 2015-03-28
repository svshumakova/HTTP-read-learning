var server = require('net').createServer(function (socket) {
    socket.on('data', processData.bind(socket));
    socket.on('error', processError.bind(socket));
});


function processError() {
    console.log('error');
}

//function parseData(data) {
//    //your code goes here
//
//}


function processData(data) {
    var fs = require('fs'),
        parse=require('./parseHeaders');
    var self=this;
    var httpObj=parse.parseHeaders(data);
    console.log(httpObj);

    if(httpObj.path){
        var reqPath='./public'+httpObj.path;
        console.log(reqPath);
            fs.readFile(reqPath, function (err, data) {
                if (err) {
                    var err404='HTTP/1.1 404 Not Found\r\n\r\n';

                    self.end(err404);
                }
                if(data){
                    message=data;
                    console.log(message);
                    self.write('HTTP/1.1 200 OK\r\n\r\n');
                    self.end(message);
                }
            });


    } else {

        self.end('no pass');
    }
}

server.listen(8080, function () {
    console.log('Все очень запущено на порту 8080');
});