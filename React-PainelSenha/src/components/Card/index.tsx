import React from 'react';

import './styles.css';

export interface Convenio{
    convenio: string;
    senhaLiberada: string;
    dataLiberacao: string;
    horaLiberacao: string;
    
}
interface CardProps{
    convenio: Convenio;
}

const Card: React.FC<CardProps> = ({convenio}) => {
    return (
        
         <div className="cardElement">
             <div className="cardHeader">
                 <strong>{convenio.convenio.toUpperCase()}</strong>
                 <div className="line"></div>
             </div>
             <div className="cardMain">
                 <div className="cardData">
                     <div className="date">
                        {convenio.dataLiberacao}
                     </div>
                     <div className="time">
                        {convenio.horaLiberacao}
                     </div>
                 </div>
                 <div className="cardSenha">
                    <div className="senhaTitle">Senha</div>
                    <div className="senha">{convenio.senhaLiberada}</div>
                 </div>
             </div>
         </div>
    );
}

export default Card;