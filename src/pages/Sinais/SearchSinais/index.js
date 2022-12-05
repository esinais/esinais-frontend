import React, { useEffect, useState, useContext } from "react";
import { Context } from '../../../Context/AuthContext';
import api from '../../../config/configApi';
import Sidebar from '../../../Components/Sidebar';
import Navbar from '../../../Components/Navbar';
import SearchSinais from '../../../Components/Search-sinais';
import { useLocation } from 'react-router-dom';
import ModalSucesso from "../../../Components/Modal-success";
import ModalNaoEncontrado from "../../../Components/Modal-NaoEncontrado";

export const BuscarSinal = () => {
    const token = localStorage.getItem('token');
    const perfilUsuarioLogado = localStorage.getItem('perfilUsuario');
    const id_usuario = localStorage.getItem('idUsuario');
    const [data, setData] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { authenticated, handleLogout } = useContext(Context);
    const [deletarSinalId, setDeletarSinalId] = useState(0);
    const { state } = useLocation();
    //const [tipo, setTipo] = useState('');
    //const [valor, setValor] = useState('');
    const [sinal, setSinal] = useState({
        tipo: '',
        valor: '',
    });
    


    //receber os valores do formulário
    const valueInput = e => setSinal({ ...sinal, [e.target.name]: e.target.value });


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
    const exibirbandeira = (regiao) =>{
        console.log(regiao);
        let termoCompleto = '';
        let termo = regiao.split(' ');
        
        if(termo == ''){
            termoCompleto = regiao;
        }else{
            for (let i = 0; i < termo.length; i++) {
                termoCompleto = termoCompleto + termo[i];
                
            }
        }
        setNomeBandeira(termoCompleto);
    }
    const [nomeBandeira, setNomeBandeira] = useState('');
    const [mostrar, setMostrar] = useState(false);
    const [mostrarModalNaoEncontrado, setMostrarModalNaoEncontrado] = useState(false);
    const getSinais = async e =>{
        if(perfilUsuarioLogado === "administrador" || perfilUsuarioLogado === "autorizador" ){
            e.preventDefault();
        }
        const headers = {
            'headers': {
                
                'Authorization': `Bearer ${(token)}`,
                'Content-Type': 'application/json'
            }
        }
        ///sinais/:id_tipo/:paginacao
        if(perfilUsuarioLogado === 'padrao'){
            //fazendo requisição para rota de listar sinais do back-end
            await api.post("/sinais/"+2+"/"+id_usuario+"/"+1,headers)
            .then ((response) => {
                console.log(response);
                //Apresentar o retorno da API e setar em setData
                setData(response.data);
                console.log(response.data);
                exibirbandeira(response.data.sinais[0].regiao);
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
        }else{
             //fazendo requisição para rota de listar sinais do back-end
            await api.get("/sinais/"+sinal.tipo+"/"+sinal.valor+"/"+1, headers)
            .then ((response) => {
                console.log(response);
                //Apresentar o retorno da API e setar em setData
                setData(response.data.sinais);
                exibirbandeira(response.data.sinais[0].regiao);
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
       //alert(sinal.tipo + "  " + sinal.valor);
       
    }
    useEffect(() => {
        getSinais();
    }, []);
    //console.log("estou recebendo" + status.type);
    const deletaridSinal = () => {

    }
    const deletarSinal = async (idSinal) => {
        
        const headers = {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " +localStorage.getItem('token')
            }
        }
        ///sinais/:id_sinal
        await api.delete('/sinais/'+idSinal, headers)
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
                <SearchSinais 
                    valueInput={valueInput}
                    getSinais={getSinais}
                    data={data}
                    deletarSinal={deletarSinal}
                    perfil={perfilUsuarioLogado}
                    bandeira={nomeBandeira}
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