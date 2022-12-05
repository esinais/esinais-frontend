import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Context } from '../../../Context/AuthContext';
import api from '../../../config/configApi';
import Sidebar from '../../../Components/Sidebar';
import Navbar from '../../../Components/Navbar';
import EditUsuario from "../../../Components/Edit-usuarios";
import ModalSucesso from "../../../Components/Modal-success";

//props é uma p´ropriedade para receber a informação da URL
export const EditarUsuario = (props) => {
    
    const perfilUsuarioLogado = localStorage.getItem('perfilUsuario');
    const history = useHistory(); // navegar entre as páginas
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { authenticated, handleLogout } = useContext(Context);
    const [mostrarModalSucesso, setMostrarModalSucesso]= useState(false);
    const openSidebar = () => {
        setSidebarOpen(true);
        
    }
    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    //constantes referentes a cada campo do formulário
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [perfil, setPerfil] = useState('');
    const [statusUsuario, setStatusUsuario] = useState('');
    const [sexo, setSexo] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [fotoPerfilTemp, setFotoPerfilTemp] = useState('');
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    //recebendo a ID vinda da URL
    const [id] = useState(props.match.params.id)

    const token = localStorage.getItem('token');

    const editarUsuario = async e => {
        e.preventDefault();
        console.log(nome);

        const headers = {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " +localStorage.getItem('token')
            }
        }
        console.log("fotoPerfil");
        console.log(sexo);
        const dados = new FormData();
        dados.append('cpf', cpf);
        dados.append('nome', nome);
        dados.append('email', email);
        dados.append('endereco', endereco);
        dados.append('telefone', telefone);
        dados.append('senha', senha);
        dados.append('perfil', perfil);
        dados.append('statusUsuario', statusUsuario);
        dados.append('sexo', sexo);
        dados.append('fotoPerfil', fotoPerfil);

        //enviar os dados para API das constantes que recebeu os valors do formulário
        await api.put('/usuarios/'+id, dados, headers)
        .then((response) =>{
            setStatus({
                type:1,
                message: response.data.message
            });
            setMostrarModalSucesso(true); 
            console.log(response.data.message);
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
    const deletarUsuario = async e => {
        //e.preventDefault();
        const headers = {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " +localStorage.getItem('token')
            }
        }
        ///sinais/:id_sinal
        await api.delete('/usuarios/'+id, headers)
        .then((response) =>{
            setStatus({
                type:1,
                message: response.data.message
            });
            //exibicaotela2();
            //setTeste(true);
            //redirecionarTela();
           // console.log(teste);
            //console.log(response.data.message);
            return history.push('/dashboard/');
            
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

    //executar somente quando o ID for atualizado
    useEffect(()=> {
        const getUsuario = async () => {
            const headers = {
                'headers': {
                    'Authorization': `Bearer ${(token)}`
                }
            }

            /*Essa rota funciona com parâmentro 1 - ID 2 - nome etc*/
            await api.get("/usuarios/"+1+"/"+id, headers)
            .then ((response) => {
                //Apresentar o retorno da API e setar em setData
                //setData(response.data.usuario);
                //pegandos as informações vinda do DOM e enviando para a variáveis para exibição no formulário
                //console.log(response.data.usuario[0].nome)
                setCpf(response.data.usuario[0].cpf);
                setNome(response.data.usuario[0].nome);
                setEmail(response.data.usuario[0].email);
                setEndereco(response.data.usuario[0].endereco);
                setTelefone(response.data.usuario[0].telefone);
                setSenha(response.data.usuario[0].senha);
                setPerfil(response.data.usuario[0].perfil);
                setStatusUsuario(response.data.usuario[0].statusUsuario);
                setSexo(response.data.usuario[0].sexo);
                setFotoPerfilTemp(response.data.usuario[0].fotoPerfil);
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
        getUsuario();
    },[id])
    return(
        <div className='container_dashboard'>
            {/*<Link to="/dashboard">Dashboard</Link><br />
            <Link to="/usuarios">Usuarios</Link><br />

     

            <h1>Editar Usuário</h1>
            
            {status.type === 1 ? <p>{status.message}</p>:""}
            {status.type === 0 ? 
            <Redirect to={{
                pathname: '/usuarios',
                state: {
                    type: status.type,
                    message: status.message
                }
            }}/> : ""}
            {status.type === 'error' ? 
            <Redirect to={{
                pathname: '/usuarios',
                state: {
                    type: status.type,
                    message: status.message
                }
            }}/> : ""}
            {/*data.map(usuarios => (
                <div key={usuarios.id}>
                    <span>{usuarios.id}</span><br />
                    <span>{usuarios.nome}</span><br />
                    <span>{usuarios.email}</span><br />
                </div>
            ))}
            <form onSubmit={editarUsuario}>
                <label>CPF: </label>
                <input type="text" name="cpf" placeholder="digite o cpf" value={cpf} onChange={/*esse comando permite a edição do campotext => setCpf(text.target.value)} /><br />

                <label>Nome: </label>
                <input type="text" name="nome" placeholder="digite o nome completo" value={nome} onChange={text => setNome(text.target.value)} /><br />

                <label>E-mail: </label>
                <input type="email" name="email" placeholder="digite o email" value={email} onChange={text => setEmail(text.target.value)} /><br />

                <label>Endereço: </label>
                <input type="text" name="endereco" placeholder="digite o endereco" value={endereco} onChange={text => setEndereco(text.target.value)} /><br />

                <label>Telefone: </label>
                <input type="text" name="telefone" placeholder="digite o telefone" value={telefone} onChange={text => setTelefone(text.target.value)} /><br />

                <label>Senha: </label>
                <input type="password" name="senha" placeholder="digite sua senha" value={senha} autoComplete="on" onChange={text => setSenha(text.target.value)} /><br />

                <label>Perfil: </label>
                <input type="text" name="perfil" placeholder="digite o seu perfil" value={perfil} onChange={text => setPerfil(text.target.value)} /><br />

                <label>Status Usuário: </label>
                <input type="text" name="statusUsuario" placeholder="digite o status" value={statusUsuario} onChange={text => setStatusUsuario(text.target.value)} /><br />
                
                <button type="submit">Salvar</button>
            </form>
            */}
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
            <EditUsuario 
                editarUsuario={editarUsuario}
                deletarUsuario={deletarUsuario}
                cpf={cpf}
                nome={nome}
                email={email}
                endereco={endereco}
                telefone={telefone}
                senha={senha}
                perfil={perfil}
                statusUsuario={statusUsuario}
                sexo={sexo}
                fotoPerfilTemp={fotoPerfilTemp}
                setCpf={setCpf}
                setNome={setNome}
                setEmail={setEmail}
                setEndereco={setEndereco}
                setTelefone={setTelefone}
                setSenha={setSenha}
                setPerfil={setPerfil}
                setStatusUsuario={setStatusUsuario}
                setSexo={setSexo}
                setFotoPerfil={setFotoPerfil}
                perfilUsuarioLogado={perfilUsuarioLogado}
            />
            {mostrarModalSucesso ? (
                <ModalSucesso 
                    mostrarModalSucesso={mostrarModalSucesso}
                    setMostrarModalSucesso={setMostrarModalSucesso}
                    message={status.message}
                    controller={'editar'}
                    parametro={id}
                    enderecoPagina={'editarUsuario'}
                />
            ): ""}
                
        </div>
    )
}