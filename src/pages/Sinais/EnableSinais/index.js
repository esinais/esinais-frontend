import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../Context/AuthContext';
import {Link} from 'react-router-dom';
import './enableSinais.css';
import api from '../../../config/configApi'
import { useLocation } from 'react-router-dom';
import Sidebar from '../../../Components/Sidebar';
import Navbar from '../../../Components/Navbar';
import EnableSinal from '../../../Components/Enable-sinais';
import ModalSucesso from '../../../Components/Modal-success';


export const AutorizarSinal = () => {
    const token = localStorage.getItem('token');
    const perfilUsuarioLogado = localStorage.getItem('perfilUsuario');
    //Hoocks que recebe as informações de outra página quando cadastra o usuário com sucesso
    const { state } = useLocation();
    
    //Hoocks que recebe os dados vindo API
    const [data, setData] = useState([]);
    

    const [pagina, setPagina] = useState("");
    const [ultimaPagina, setUltimaPagina] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [nomeBandeira, setNomeBandeira] = useState([]);

    //Hoocks de quando houver erro, pode ser setadis alguns valores
    const [status, setStatus] = useState({
        type: state ? state.type : "" ,
        message: state ? state.message: ""
    })

    const openSidebar = () => {
        setSidebarOpen(true);
        
    }
    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    const exibirbandeira = (regiao) =>{
        console.log(regiao.length);
        let termoCompleto = [];
        let termo = '';
        for (let j = 0; j < regiao.length; j++) {
            termoCompleto[j] = '';
            termo = regiao[j].regiao.split(' ');
            
            if(termo == ''){
                termoCompleto[j] = regiao;
            }else{
                for (let i = 0; i < termo.length; i++) {
                    termoCompleto[j] = termoCompleto[j] + termo[i];
                    
                }
            }
            
        }
        setNomeBandeira(termoCompleto);
        //console.log("oooooooo")
        console.log(nomeBandeira);
        
        
        
        
    }
    

    const getSinais = async (pagina) =>{
        
        if(pagina === undefined){
            pagina = 1;
            
        }
        setPagina(pagina);
       
        const headers = {
            'headers': {
                'Authorization': `Bearer ${(token)}`
            }
        }
        
        //fazendo requisição para rota de listar sinais do back-end
        await api.get("/sinais/"+5+"/PENDENTE/"+pagina, headers)
        .then ((response) => {
            
            //Apresentar o retorno da API e setar em setData
            setData(response.data.sinais);
            //console.log(response.data)
            exibirbandeira(response.data.sinais)
            setUltimaPagina(response.data.ultimaPagina);
            
        }).catch((err) =>{
            if(err.response){
                //Type e message são oriundas do retorno da API quando apresenta o erro 0
                setStatus({
                    type: err.response.data.status,
                    message: err.response.data.message,
                    
                });
                
                setUltimaPagina(err.response.data.ultimaPagina);
                
            } else{
                //entra aqui se API estiver offline
                setStatus({
                    type: 'error',
                    message: "Erro tente mais tarde!"
                })
            }
        })
    }

    //papel do useEffect - Ao utilizar a página, carregue a seguinte função.
    //o colchetes [] indica para executar somente uma vez
    useEffect(() =>{
        getSinais(); 
    },[]);

    const situacaoSinal = async (idSinal, tipoSituacao) =>{
        //console.log(idSinal, tipoSituacao);
        var situacao = tipoSituacao;
        
        //'Content-Type': 'application/json',
        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(token)}`
            }
        }
        //console.log("Estou recebendo: " + idSinal + "  " + situacao);
        await api.put('/sinais/'+1+"/"+idSinal, {situacao}, headers)
        .then((response) => {
            setStatus({
                type: response.data.status,
                message: response.data.message
            });
            //console.log(response);
            setMensagem(response.data.message);
            setMostrarModalSucesso(true);
            //chamando a funação para recarregar as informções novamente
            getSinais();
        }).catch((err)=> {
            if(err.response){
                //Type e message são oriundas do retorno da API quando apresenta o erro 0
                setStatus({
                    type: err.response.data.status,
                    message: err.response.data.message
                })
            }else{
                //entra aqui se API estiver offline
                setStatus({
                    type: 'error',
                    message: "Erro tente mais tarde!"
                })
            }
        })
    }

    //recuperando o token do localStorage do navegador
    //const token = localStorage.getItem('token');
    //recuperando as informações de logado e o botão sair através do handleLogout
    const { authenticated, handleLogout } = useContext(Context);

    //console.log("Situação do usuário na página usuario: " + authenticated);
    
    return(
        <div className='container_dashboard'>
            {/*<Link to="/dashboard">Dashboard</Link><br />
            <Link to="/usuarios">Usuarios</Link><br />
            <Link to="/sinais">Sinais</Link><br />
            <h1>Autorizar Sinal</h1>
            <Link to="/cadastrarSinal/">cadastrar</Link><br /><hr />
            
            
            
            {status.type === 0 ? <p>{status.message}</p>:""}
            {status.type === 'error'? <p>{status.message}</p>:""}
            {status.type === 1 ? <p>{status.message}</p>:""}
            {data.map(sinais => (
                <div key={sinais.id}>
                    <span>{sinais.id}</span><br />
                    <span>{sinais.nomeSinal}</span><br />
                    <Link to={"/editarSinal/" + sinais.id}><button type="button">DETALHES</button></Link>
                    <button type="button" onClick={() => situacaoSinal(sinais.id, "aprovado")}>APROVADO</button>
                    <button type="button" onClick={() => situacaoSinal(sinais.id, "reprovado")}>REPROVAR</button><hr />
                </div>
            ))}
            
            {pagina !== 1 ? <button type="button" onClick={() => getSinais(1)}>Primeira</button> : <button type="button" disabled>Primeira</button>}{" "}
            {pagina !== 1 ? <button type="button" onClick={() => getSinais(pagina - 1)}>{pagina - 1}</button> : ""}{" "}
            <button type="button" disabled>{pagina}</button>{" "}
            {pagina !== ultimaPagina ? <button type="button" onClick={() => getSinais(pagina + 1)}>{pagina + 1}</button> : ""}{" "}
            {pagina !== ultimaPagina ? <button type="button" onClick={() => getSinais(ultimaPagina)}>Última</button> : <button type="button" disabled>Última</button>}*/}
        
            <Navbar 
                sidebarOpen={sidebarOpen} 
                openSidebar={openSidebar} 
            />
            <Sidebar 
                handleLogout={handleLogout} 
                sidebarOpen={sidebarOpen} 
                closeSidebar={closeSidebar} 
                perfil={perfilUsuarioLogado}
            />
            <EnableSinal 
                data={data}
                situacaoSinal={situacaoSinal}
                bandeiras={nomeBandeira}
            /> 
            {mostrarModalSucesso ? (
                <ModalSucesso 
                    mostrarModalSucesso={true}
                    setMostrarModalSucesso={setMostrarModalSucesso}
                    message={mensagem}
                    controller={"autorizarSinal"}
                    parametro={0}
                    enderecoPagina={"autorizarSinal"}

                />
            ): ""}
        
        </div>

    );
}