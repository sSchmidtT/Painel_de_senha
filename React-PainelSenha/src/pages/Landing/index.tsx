import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Card, { Convenio } from '../../components/Card';


import './styles.css';

function Landing(){
    const socket = io.connect('http://localhost:3000');

    let cConvenios:any = [];
    const [convenios, setConvenios] = useState<Convenio[]>([]);

    useEffect(() => {
        if(cConvenios.length === 0){
            socket.emit('convenios_emit');
        }
    }, []);

    socket.on('convenios_emit', (conveniosList: any) => {
        //cConvenios = conveniosList;
        setConvenios(conveniosList);
    });

    socket.on('convenios_att', (received:string) => {
        let convenio:Convenio = JSON.parse(received);
        let idxConvenio = convenios.findIndex((item: Convenio) => item.convenio === convenio.convenio);
        if(idxConvenio > -1){
            convenios[idxConvenio].senhaLiberada = convenio.senhaLiberada;
            convenios[idxConvenio].dataLiberacao = convenio.dataLiberacao;
            convenios[idxConvenio].horaLiberacao = convenio.horaLiberacao;
        }else{
            convenios.push(convenio);
        }
        setConvenios(convenios);
        socket.emit('received_command', 'Command Received');
    });
    return (
        <div id="page-landing" className="container">
            <header className="header-content">
                <strong>PAINEL DE SENHA</strong>
                <div className="line"></div>
            </header>
            <main className="page-content">
                {
                    convenios.map((convenio: Convenio, index: number) => {
                        return (<Card convenio={convenio} />);
                    })
                }
            </main>
        </div>
        
    );
}

export default Landing;