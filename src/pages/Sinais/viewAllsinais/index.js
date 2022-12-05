import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../Context/AuthContext';
import {Link} from 'react-router-dom';
import api from '../../../config/configApi'
import { useLocation } from 'react-router-dom';


export const Sinais = () => {
    const token = localStorage.getItem('token');
    
    //Hoocks que recebe as informações de outra página quando cadastra o usuário com sucesso
    const { state } = useLocation();
    
    //Hoocks que recebe os dados vindo API
    const [data, setData] = useState([]);

    const [pagina, setPagina] = useState("");
    const [ultimaPagina, setUltimaPagina] = useState("");

    //Hoocks de quando houver erro, pode ser setadis alguns valores
    const [status, setStatus] = useState({
        type: state ? state.type : "" ,
        message: state ? state.message: ""
    })

    const getSinais = async (pagina) =>{
        
        if(pagina === undefined){
            pagina = 1;
            console.log("enviei")
        }
        setPagina(pagina);
       
        const headers = {
            'headers': {
                'Authorization': `Bearer ${(token)}`
            }
        }

       
        //fazendo requisição para rota de listar sinais do back-end
        await api.get("/sinais/"+1+"/"+pagina, headers)
        .then ((response) => {
            console.log(response);
            //Apresentar o retorno da API e setar em setData
            setData(response.data.sinais);
            setUltimaPagina(response.data.ultimaPagina);
        }).catch((err) =>{
            if(err.response){
                //Type e message são oriundas do retorno da API quando apresenta o erro 0
                setStatus({
                    type: err.response.data.status,
                    message: err.response.data.message
                })
                
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

    const deleteSinal = async (idSinal) =>{

        const headers = {
            'headers': {
                'Authorization': `Bearer ${(token)}`
            }
        }

        await api.delete('/sinais/'+idSinal, headers)
        .then((response) => {
            setStatus({
                type: response.data.status,
                message: response.data.message
            });
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

    console.log("Situação do usuário na página usuario: " + authenticated);
    
    return(
        <div>
            <Link to="/dashboard">Dashboard</Link><br />
            <Link to="/usuarios">Usuarios</Link><br />
            <Link to="/sinais">Sinais</Link><br />
            <h1>Listar Sinal</h1>
            <Link to="/cadastrarSinal/">cadastrar</Link><br /><hr />
            
            
            
            {status.type === 0 ? <p>{status.message}</p>:""}
            {status.type === 'error'? <p>{status.message}</p>:""}
            {status.type === 1 ? <p>{status.message}</p>:""}
            {data.map(sinais => (
                <div key={sinais.id}>
                    <span>{sinais.id}</span><br />
                    <span>{sinais.nomeSinal}</span><br />
                    <Link to={"/editarSinal/" + sinais.id}><button type="button">Editar</button></Link>
                    <button type="button" onClick={() => deleteSinal(sinais.id)}>Apagar</button><hr />
                </div>
            ))}
            {console.log('páginação? ' + ultimaPagina)}
            {pagina !== 1 ? <button type="button" onClick={() => getSinais(1)}>Primeira</button> : <button type="button" disabled>Primeira</button>}{" "}
            {pagina !== 1 ? <button type="button" onClick={() => getSinais(pagina - 1)}>{pagina - 1}</button> : ""}{" "}
            <button type="button" disabled>{pagina}</button>{" "}
            {pagina !== ultimaPagina ? <button type="button" onClick={() => getSinais(pagina + 1)}>{pagina + 1}</button> : ""}{" "}
            {pagina !== ultimaPagina ? <button type="button" onClick={() => getSinais(ultimaPagina)}>Última</button> : <button type="button" disabled>Última</button>}
        </div>

    );
}