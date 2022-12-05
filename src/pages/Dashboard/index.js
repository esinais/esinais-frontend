import React, { useContext, useState, useEffect } from 'react';
import api from '../../config/configApi';
import { Context } from '../../Context/AuthContext';
import './dashboard.css';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import Main from '../../Components/Main';


//import { IntlProvider } from 'react-intl';
//import Layout from '../../layouts/index';
//import messages from './messages.js';

export const Dashboard = () => {

    //recuperando o token do localStorage do navegador
    const token = localStorage.getItem('token');
    const idUsuario = localStorage.getItem('idUsuario');
    const perfilUsuarioLogado = localStorage.getItem('perfilUsuario');
    //recuperando as informações de logado e o botão sair através do handleLogout
    const { authenticated, handleLogout } = useContext(Context);
    const [data, setData] = useState('');
    const [status, setStatus] = useState({
        type: '',
        mensagem: '',
        loading: false //verifica se a API está respondendo
    });
    console.log("Situação do usuário na página dashboard: " + authenticated);
    /*Fazer uma única função que traz através de um objeto as informções para
    o dashboard: 
        -   Quantidade de sinais pendentes (S) ok
        -   Quantidade total de sinais no sistema (S) ok
        -   Contribuições (U) ok
        -   Colocação está indefinido (-)
        -   Quantidade de verbo (S) ok
        -   Quantidade de substantivo (S) ok
        -   Quantidade de Adjetivo (S) ok
        -   Quantidade de Numeral (S) ok
        -   Gráfico (Indefinido de qual será (Cadastro de sinais ou visita ao sistema))*/

    //{//<button type='button' onClick={//handleLogout}>Sair</button>}
    /*{
        <Link to="/dashboard">Dashboard</Link><br />
            <Link to="/usuarios">Usuarios</Link><br />
            <Link to="/sinais">Sinais</Link><br />
            <Link to="/autorizarSinal">AutorizarSinal</Link><br />
    }
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
    */

    //style={{height: "100vh"}}
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
        console.log("entrei aqwui")
    }
    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    {/*
        <div className='container_dashboard' >
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <Main/>
        </div>
*/}
const getDadosDashboard = async e => {
    //e.preventDefault();
   
    const headers = {
        'Content-Type': 'application/json'
    }


    //fazendo requisição para rota de listar sinais do back-end
    ///sinais/:id_tipo/:paginacao
    //
    await api.get("/sinais/11/"+idUsuario+"/1", headers)
        .then((response) => {
            //console.log(response.data.sinais_encontrados.polissemia[0].nomeSinal)
            //Apresentar o retorno da API e setar em setData
            setData(response.data.dashboard);
            console.log(response.data.dashboard.verbos)
            
            //setSinonimos(response.data.sinais_encontrados);
            //setUltimaPagina(response.data.ultimaPagina);
        }).catch((err) => {

            if (err.response) {

                //Type e message são oriundas do retorno da API quando apresenta o erro 0
                setStatus({
                    type: err.response.data.status,
                    message: err.response.data.message
                })

            } else {
                //entra aqui se API estiver offline
                setStatus({
                    type: 'error',
                    message: "Erro tente mais tarde!"
                })
            }
        })

}
useEffect(() => {
    getDadosDashboard();
    
}, []);
    
    
    return (
        <div className='container_dashboard' >
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <Sidebar handleLogout={handleLogout} sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} perfil={perfilUsuarioLogado} />
        <Main 
          sinaisPendentes={data.sinaisPendentes}
          sinaisTotais={data.sinaisTotais}
          verbos={data.verbos}
          adjetivo={data.adjetivo}
          substantivo={data.substantivo}
          numeral={data.numeral}
          contribuicoes={data.contribuicoes}
          nomeUsuario={data.nomeUsuario}


           />
    </div>
    );
}


