import React,{ useState } from 'react';
import hello from '../assets/esinais.png';
import Chart from '../assets/esinais.png';
import './search-sinais.css';
import ModalExcluir from '../Modal-Excluir';  

const SearchSinais = ({ getSinais, valueInput, data, deletarSinal, perfil, bandeira}) =>{
    const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
    const [confirmarExcluir, setConfirmarExcluir] = useState(false);
    const [idSinal, setIdSinal] = useState(0);
    console.log("chegou aqui" + bandeira);
    const exibicaoModalExcluir = () => {
        return (
            <ModalExcluir
                mostrarModalExcluir={mostrarModalExcluir}
                setMostrarModalExcluir={setMostrarModalExcluir}
                setConfirmarExcluir={setConfirmarExcluir}         

             />
        )
    }
    const deletaridSinal = (idSinal) => {
        setIdSinal(idSinal);
        setMostrarModalExcluir(true);
    }

    return (
        <main className='searchSinais'>
            <div className='searchSinais__container'>
                <div className='searchSinais__title'>
                    <img src={hello} alt="hello"/>
                    <div className='main_greeting'>
                        <h1 className='searchSinais__greeting_h1'>Gerenciar Sinal</h1>
                        <p className='searchSinais__greeting_p'>Selecione a opção de busca</p>
                    </div>
                </div>
                <div className='searchSinais__cards'>
                    {perfil === "administrador" ? (
                        <div className='cardS'>
                        
                            <form onSubmit={getSinais} className='cardBusca'>
                                <div className='cardS_interno2'>
                                    <label className='text-primaryy-p' for="buscarPor">Buscar por: </label>
                                    <select className='selectS' name="tipo" id="buscarPor" onChange={valueInput}>
                                        <option value="" selected>Selecione:</option>
                                        <option value="2">Classificação Gramatical</option>
                                        <option value="1">Nome</option>
                                        <option value="3">Região</option>
                                    </select>
                                    
                                </div>
                                <div className='cardS_interno3'>
                                    <label className='text-primaryy-p' >Digite o valor</label>
                                    <input className='inputS' type="text" name="valor" onChange={valueInput}></input>
                                </div>
                                <button className='buttonEditar' type="submit">Buscar</button>
                            
                            </form>
                           
                    </div>
                    ):""}
                    
                    <div className='cardBuscaSinal'>
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
                            <img src={"http://localhost:8080/files/bandeiras/"+bandeira+".png"} alt="hello" height={80} width={100}/>
                        </div>
                                                
                        <div className='div-img-sinal-asso'>
                            <img src={"http://localhost:8080/files/sinais/" + sinais_encontrados.enderecoSinal} alt="hello" height={150} width={130}/>
                            <br />
                            <span className='font-bold text-title'>Sinal</span>
 
                        </div>
                        <div className='div-img-sinal-asso'>
                            <img src={"http://localhost:8080/files/imgAssociativa/" + sinais_encontrados.enderecoImgAssociativa} alt="hello" height={150} width={130}/>
                            <br />
                            <span className='font-bold text-title'>Imagem Associativa</span>
                       
                        </div>
                        <div className='div-img-sinal-button'>
                            <a href={"/editarSinal/"+ sinais_encontrados.id} ><button className='buttonEditar' type="submit">Editar</button></a>
                            {perfil === "administrador" ? (
                                <button className='buttonExcluir' type="button" onClick={() => deletaridSinal(sinais_encontrados.id)}>Excluir</button>
                     
                            ): ""}
                            
                        </div>
                        </>
                        ))}
                        {/*data ? (<>
                           <div className=''>
                            <span className='font-bold text-title'>Nome Sinal: {data[0].nomeSinal}</span>
                            <br />
                            <span className='font-bold text-title'>Classificação Gramatical: {data[0].classificacaoGramatical}</span>
                            <br />
                            <span className='font-bold text-title'>Região: {data[0].regiao}</span>
                            <br />
                            <img src={hello} alt="hello" height={80} width={100}/>
                        </div>
                                                
                        <div className='div-img-sinal-asso'>
                            <img src={"http://localhost:8080/files/sinais/" + data[0].enderecoSinal} alt="hello" height={150} width={130}/>
                            <br />
                            <span className='font-bold text-title'>Sinal</span>
 
                        </div>
                        <div className='div-img-sinal-asso'>
                            <img src={"http://localhost:8080/files/sinais/" + data[0].enderecoImgAssociativa} alt="hello" height={150} width={130}/>
                            <br />
                            <span className='font-bold text-title'>Imagem Associativa</span>
                       
                        </div>
                        <div className='div-img-sinal-button'>
                            <button className='buttonEditar' type="submit">Editar</button>
                            <button className='buttonExcluir' type="submit">Excluir</button>
                     
                        </div>
                        </>):""*/}  

                        
                        <hr />
                        {mostrarModalExcluir ? (exibicaoModalExcluir()):"" }
                        {confirmarExcluir ? (deletarSinal(idSinal)): ""}

                    </div>
                   
                </div>
            </div>
        </main>
    );
}
export default SearchSinais;

                        
                   