import React,{ useState } from 'react';
import hello from '../assets/esinais.png';
import Chart from '../assets/esinais.png';
import './search-usuario.css';
import ModalExcluir from '../Modal-Excluir';  

const SearchUsuarios = ({ getUsuario, valueInput, data, deletarUsuario}) =>{
    const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
    const [confirmarExcluir, setConfirmarExcluir] = useState(false);
    const [idUsuario, setIdUsuario] = useState(0);

    const exibicaoModalExcluir = () => {
        return (
            <ModalExcluir
                mostrarModalExcluir={mostrarModalExcluir}
                setMostrarModalExcluir={setMostrarModalExcluir}
                setConfirmarExcluir={setConfirmarExcluir}         

             />
        )
    }
    const deletaridUsuario = (idUsuario) => {
        setIdUsuario(idUsuario);
        setMostrarModalExcluir(true);
    }

    return (
        <main className='searchUsuarios'>
            <div className='searchUsuarios__container'>
                <div className='searchUsuarios__title'>
                    <img src={hello} alt="hello"/>
                    <div className='main_greeting'>
                        <h1 className='searchUsuarios__greeting_h1'>Gerenciar Usuário</h1>
                        <p className='searchUsuarios__greeting_p'>Selecione a opção de busca</p>
                    </div>
                </div>
                <div className='searchUsuarios__cards'>
                    <div className='cardU'>
                        
                            <form onSubmit={getUsuario} className='cardBuscaU'>
                                <div className='cardU_interno2'>
                                    <label className='text-primaryyU-p' for="buscarPor">Buscar por: </label>
                                    <select className='selectU' name="tipo" id="buscarPor" onChange={valueInput}>
                                        <option value="" selected>Selecione:</option>
                                        <option value="3">CPF</option>
                                        <option value="4">E-mail</option>
                                        <option value="1">ID</option>
                                        <option value="2">Nome</option>
                                        <option value="5">Perfil</option>
                                        <option value="6">Status</option>
                                    </select>
                                    
                                </div>
                                <div className='cardU_interno3'>
                                    <label className='text-primaryyU-p' >Digite o valor</label>
                                    <input className='inputU' type="text" name="valor" onChange={valueInput}></input>
                                </div>
                                <button className='buttonEditarU' type="submit">Buscar</button>
                            
                            </form>
                           
                    </div>
                    <div className='cardBuscaUsuario'>
                        <div className='tituloInfoU'>
                            <p className='text-tituloInfoU-p'>Informações Sinais</p>
                        </div>
                        {data.map((usuarios_encontrados, index) => (
                            <>
                            <div className=''>
                            <span className='font-bold text-title'>ID: {usuarios_encontrados.id}</span>
                            <br />
                            <span className='font-bold text-title'>Nome: {usuarios_encontrados.nome}</span>
                            <br />
                            <span className='font-bold text-title'>E-mail: {usuarios_encontrados.email}</span>
                            <br />
                            <span className='font-bold text-title'>Endereço: {usuarios_encontrados.endereco}</span>
                            <br />
                            <span className='font-bold text-title'>Telefone: {usuarios_encontrados.telefone}</span>
                            <br />
                            <span className='font-bold text-title'>Perfil: {usuarios_encontrados.perfil}</span>
                            <br />
                            <span className='font-bold text-title'>Status Usuário: {usuarios_encontrados.statusUsuario}</span>
                            <br />
                            <img src={hello} alt="hello" height={80} width={100}/>
                        </div>
                                                
                        
                        <div className='div-img-sinal-button'>
                            <a href={"editarUsuario/"+ usuarios_encontrados.id} ><button className='buttonEditar' type="submit">Editar</button></a>
                            <button className='buttonExcluir' type="button" onClick={() => deletaridUsuario(usuarios_encontrados.id)}>Excluir</button>
                     
                        </div>
                        </>
                        ))}
    

                        
                        <hr />
                        {mostrarModalExcluir ? (exibicaoModalExcluir()):"" }
                        {confirmarExcluir ? (deletarUsuario(idUsuario)): ""}

                    </div>
                   
                </div>
            </div>
        </main>
    );
}
export default SearchUsuarios;

                        
                   