const express = require('express');

module.exports = function(appState){
    const router = express.Router();
    var sendCommand ;
    var response ;
    // middleware that is specific to this router
    router.use(function timeLog(req, res, next) {
        //console.log('req: ', req);
        console.log('Time: ', Date.now());
        next();
    });

    router.post('/', async function(req, res, next){
        if(req.body != null){
            response = {status: 200, msg: "Evento recebido com sucesso"};
            sendCommand = {}

            sendCommand.emit = "convenios_att";
            sendCommand.command = JSON.stringify(req.body);
            console.log(JSON.stringify(req.body));
        }else
            response = {status: 204, msg: "Objeto não recebido"};

        
        next();
    })

    router.use(function notifySub(req, res){
        if(sendCommand){
            appState.update(sendCommand);
        }
        res.status(response['status']).json(response['msg']);
    });

    //other routes..
    return router;
}