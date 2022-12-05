import React,{ useState } from 'react';
import './enable-sinais.css';
import hello from '../assets/esinais.png';



const EnableSinais = ({ data, situacaoSinal, bandeiras}) =>{
    //console.log("estou recebendo em aprovar sinal")
    console.log(bandeiras)
    return (
        <main className='enableSinais'>
        
            <div className='enableSinais__container'>
                <div className='enableSinais__title'>
                    <img src={hello} alt="hello"/>
                    <div className='main_greeting'>
                        <h1 className='enableSinais__greeting_h1'>Auditoria do Sinal</h1>
                        <p className='enableSinais__greeting_p'>Verificar as informações dos sinais cadastrado pelo usuário</p>
                    </div>
                </div>
                <div className='enableSinais__cards'>
                    
                    <div className='cardBuscaSinalEnable'>
                        <div className='tituloInfo'>
                            <p className='text-tituloInfo-p'>Informações Sinais</p>
                        </div>
                        {data.map((sinais_encontrados, index) => (
                            <>
                            <div className=''>
                            <span className='font-bold text-title'>Nome Sinal: {sinais_encontrados.nomeSinal}</span>
                            <br />
                            <span className='font-bold text-title'>Classificação Gramatical: {sinais_encontrados.classificacaoGramatical}</span>
                            <br />
                            <span className='font-bold text-title'>Região: {sinais_encontrados.regiao}</span>
                            <br />
                            <span className='font-bold text-title'>Status Sinal: {sinais_encontrados.statusSinal}</span>
                            <br />
                            <span className='font-bold text-title'>Situção: {sinais_encontrados.situacao}</span>
                            <br />
                            <img src={"http://localhost:8080/files/bandeiras/" +bandeiras[index]+".png"} alt="hello" height={80} width={100}/>
                        </div>
                                                
                        <div className='div-img-sinal-asso-Enable'>
                            <img src={"http://localhost:8080/files/sinais/" + sinais_encontrados.enderecoSinal} alt="hello" height={150} width={130}/>
                            <br />
                            <span className='font-bold text-title'>Sinal</span>
 
                        </div>
                        <div className='div-img-sinal-asso-Enable'>
                            <img src={"http://localhost:8080/files/imgAssociativa/" + sinais_encontrados.enderecoImgAssociativa} alt="hello" height={150} width={130}/>
                            <br />
                            <span className='font-bold text-title'>Imagem Associativa</span>
                       
                        </div>
                        <div className='div-img-sinal-button-Enable'>
                        
                            <button className='buttonAprovar' type="button" onClick={() => situacaoSinal(sinais_encontrados.id, "aprovado")}>Aprovar</button>
                            <button className='buttonReprovar' type="button" onClick={() => situacaoSinal(sinais_encontrados.id, "reprovado")}>Reprovar</button>
                            <a href={"editarSinal/"+ sinais_encontrados.id} ><button className='buttonEditarAprovar' type="submit">Editar</button></a>
                            
                     
                        </div>
                        </>
                        ))}
                       

                        
                        <hr />
                       

                    </div>
                   
                </div>
            </div>
        </main>
    );
}
export default EnableSinais;