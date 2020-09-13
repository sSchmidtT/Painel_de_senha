require('dotenv-safe').config({silent: true});
let state = require('./lib/state');
let appState = new state();

let app = require('./app')(appState);

let http = require('http').createServer(app);

let io = require('socket.io')(http);

let convenios = [
                    {convenio:'Convênio Milho', senhaLiberada:'125325', dataLiberacao:'20/Ago', horaLiberacao:'12:28:12'},
                    {convenio:'Convênio Milho', senhaLiberada:'125325', dataLiberacao:'20/Ago', horaLiberacao:'12:28:12'},
                    {convenio:'Convênio Milho', senhaLiberada:'125325', dataLiberacao:'20/Ago', horaLiberacao:'12:28:12'},
                    {convenio:'Convênio Milho', senhaLiberada:'125325', dataLiberacao:'20/Ago', horaLiberacao:'12:28:12'},
                    {convenio:'Convênio Milho', senhaLiberada:'125325', dataLiberacao:'20/Ago', horaLiberacao:'12:28:12'},
                    {convenio:'Convênio Milho', senhaLiberada:'125325', dataLiberacao:'20/Ago', horaLiberacao:'12:28:12'}
                ];

let socketConnection = [];

io.on('connection', function(socket){
    socketConnection.push(socket.id);
    socket.on('convenios_emit', () => {
        socket.emit('convenios_emit', convenios);
    })

    socket.on('disconnect', function(){
        console.log(`number socket's connected ${socketConnection.length}`);
        
    });

    socket.on('received_command', function(msg){
        console.log("message: " + msg);
    });
});

appState.addObserver((command) => {
    io.emit(command.emit, command.command);
    console.log('send broadcast client');
    let convenio = JSON.parse(command.command);
    let idx = convenios.findIndex((item) => item.convenio == convenio.convenio);
    if(idx > -1) {
        convenios[idx].senhaLiberada = convenio.senhaLiberada;
        convenios[idx].dataLiberacao = convenio.dataLiberacao;
        convenios[idx].horaLiberacao = convenio.horaLiberacao;
    }else{
        convenios.push(convenio);
    }
});

http.listen(3000,() => {
    console.log('Servidor de exemplo aberto na porta: 3000')
});
