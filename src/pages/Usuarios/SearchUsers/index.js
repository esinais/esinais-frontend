import React, { useEffect, useState, useContext } from "react";
import { Context } from '../../../Context/AuthContext';
import api from '../../../config/configApi';
import Sidebar from '../../../Components/Sidebar';
import Navbar from '../../../Components/Navbar';
import SearchUsuario from '../../../Components/Search-usuario';
import { useLocation } from 'react-router-dom';
import ModalSucesso from "../../../Components/Modal-success";
import ModalNaoEncontrado from "../../../Components/Modal-NaoEncontrado";

export const BuscarUsuario = () => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { authenticated, handleLogout } = useContext(Context);
    const { state } = useLocation();
    const perfilUsuarioLogado = localStorage.getItem('perfilUsuario');

    const [usuario, setUsuario] = useState({
        tipo: '',
        valor: '',
    });
    


    //receber os valores do formulário
    const valueInput = e => setUsuario({ ...usuario, [e.target.name]: e.target.value });


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
    const exibirModalSucesso = () => {
        setMostrar(true);
        
    }
    const exibirModalNaoEncontrado = () => {
        setMostrarModalNaoEncontrado(true);
    }
    const [mostrar, setMostrar] = useState(false);
    const [mostrarModalNaoEncontrado, setMostrarModalNaoEncontrado] = useState(false);
    const getUsuario = async e =>{
        console.log("estou recebendo" + usuario.tipo + " "+ usuario.valor);
        e.preventDefault();
        
        const headers = {
            'headers': {
                'Authorization': `Bearer ${(token)}`
            }
        }
        
       //alert(sinal.tipo + "  " + sinal.valor);
        //fazendo requisição para rota de listar sinais do back-end
        //usuarios/:id_tipo/:valor
        await api.get("/usuarios/"+usuario.tipo+"/"+usuario.valor, headers)
        .then ((response) => {
            console.log(response);
            //Apresentar o retorno da API e setar em setData
            setData(response.data.usuario);
            //setUltimaPagina(response.data.ultimaPagina);
        }).catch((err) =>{
            if(err.response){
                //Type e message são oriundas do retorno da API quando apresenta o erro 0
                
                setStatus({
                    type: err.response.data.status,
                    message: err.response.data.message
                })
                exibirModalNaoEncontrado();
                
                
            } else{
                //entra aqui se API estiver offline
                setStatus({
                    type: 'error',
                    message: "Erro tente mais tarde!"
                })
            }
        })
    }
    useEffect(() => {
        getUsuario();
    }, []);
    //console.log("estou recebendo" + status.type);

    const deletarUsuario = async (idUsuario) => {
        
        const headers = {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " +localStorage.getItem('token')
            }
        }
        ///usuarios/:user_id
        await api.delete('/usuarios/'+idUsuario, headers)
        .then((response) =>{
            setStatus({
                type:1,
                message: response.data.message
            });
            
            console.log(response.data.message);
            //return history.push('/dashboard');
            
        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type:'error',
                    message: err.response.data.message
                });
            }else{
                console.log("Erro tente mais tarde");
            }   
        })
    }
    return(
        <div>
            <div className='container_dashboard'>
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
                <SearchUsuario 
                    valueInput={valueInput}
                    getUsuario={getUsuario}
                    data={data}
                    deletarUsuario={deletarUsuario}
                />
                
                <ModalNaoEncontrado
                    mostrarModalNaoEncontrado={mostrarModalNaoEncontrado}
                    setMostrarModalNaoEncontrado={setMostrarModalNaoEncontrado}
                    message={status.message} 

                />
            
            </div>
            
        </div>
    );
}