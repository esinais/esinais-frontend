import React, { useState, useContext } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import api from '../../../config/configApi';
import { Context } from '../../../Context/AuthContext';
import * as yup from 'yup';
import AdicionarUsuarios from '../../../Components/Add-users';
import Sidebar from '../../../Components/Sidebar';
import Navbar from '../../../Components/Navbar';
import ModalSucesso from '../../../Components/Modal-success';
import ModalNaoEncontrado from '../../../Components/Modal-NaoEncontrado';

export const CadastrarUsuario = () =>{

    const perfilUsuarioLogado = localStorage.getItem('perfilUsuario');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { authenticated, handleLogout } = useContext(Context);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
    const [mostrarModalNaoEncontrado, setMostrarModalNaoEncontrado] = useState(false);
    const [idUsuario, setIdUsuario] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const history = useHistory(); // navegar entre as páginas
    const openSidebar = () => {
        setSidebarOpen(true);
        
    }
    const closeSidebar = () => {
        setSidebarOpen(false);
    }


    const [user, setUser] = useState({
        cpf: '',
        nome: '',
        email: '',
        endereco: '',
        telefone: '',
        senha: '',
        perfil: '',
        statusUsuario:'ativo',
        sexo: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    //receber os valores do formulário
    const valueInput = e => setUser({...user, [e.target.name]: e.target.value});

    const cadastrarUsuario = async e => {
        e.preventDefault();
        //console.log(user)
        //if responsável por fazer a validação dos campos no back-end
        console.log("olha aqui")
        console.log("olha aqui")
        
        if (!(await validate())) return;
        const dados = new FormData();
        dados.append('cpf', (user.cpf));
        dados.append('nome', (user.nome));
        dados.append('email', (user.email));
        dados.append('endereco', (user.endereco));
        dados.append('telefone', (user.telefone));
        dados.append('senha', (user.senha));
        dados.append('perfil', (user.perfil));
        dados.append('statusUsuario', (user.statusUsuario));
        dados.append('sexo', (user.sexo));
        dados.append('fotoPerfil', (fotoPerfil));
        
        const headers = {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " +localStorage.getItem('token')
            }
        }
        
        //enviar os dados para API do objeto user que recebeu os valors do formulário
        await api.post('/usuarios', dados, headers)
        .then((response) =>{
               
            setStatus({
                type:1,
                message: response.data.message
            });
            setIdUsuario(response.data.usuario.id);
            setMostrarModalSucesso(true);
            //return history.push("/editarUsuario/"+response.data.usuario.id+"");
            //console.log(response.data.message);
        }).catch((err) =>{
            
            if(err.response){
                //console.log(err.response);
                setStatus({
                    type:err.response.data.status,
                    message: err.response.data.message
                });
                console.log(status.message);
            }else{
                console.log("Erro tente mais tarde");
            }   
        })
    }
    //função responsável por usar a dependência YUP para fazer a validação dos campos
    async function validate() {
        let schema = yup.object().shape({
            //statusUsuario: yup.string("Error*: Necessário preencher o campo Status Usuario").required("Error: Necessário preencher o campo Status Usuario"),
            perfil: yup.string("Error: Necessário preencher o campo perfil").required("Error: Necessário preencher o campo perfil"),
            senha: yup.string("Error: Necessário preencher o campo senha").required("Error: Necessário preencher o campo senha")
            .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),
            email: yup.string("Error: Necessário preencher o campo e-mail").required("Error: Necessário preencher o campo email"),
            nome: yup.string("Error: Necessário preencher o campo Nome").required("Error: Necessário preencher o campo Nome"),
            cpf: yup.string("Error*: Necessário preencher o campo CPF").required("Error*: Necessário preencher o campo CPF")
        
        });

        try {
            await schema.validate({
                cpf: user.cpf,
                nome: user.nome,
                email: user.email,
                senha: user.senha,
                perfil: user.perfil,
                //statusUsuario: user.statusUsuario
                
            });
            return true;
        } catch (err) {
            setStatus({
                type: 'errorFormulario',
                message: err.errors
            });
            setMostrarModalNaoEncontrado(true);
            return false;
        }
    }

    return(
        <div className='container_dashboard'>
            {/*<Link to="/dashboard">Dashboard</Link><br />
            <Link to="/usuarios">Usuarios</Link><br />
            <Link to="/cadastrarUsuario">Cadastrar</Link><br />
            <h1>Cadastrar Usuarios</h1>

            {status.type === 0 ? <p>{status.message}</p>:""}
            {status.type === 'error' ? <p>{status.message}</p>:""}
            {status.type === 1 ? 
            <Redirect to={{
                pathname: '/usuarios',
                state: {
                    type: 1,
                    message: status.message
                }
            }} />
            :""}

            <form onSubmit={cadastrarUsuario}>
                <label>CPF: </label>
                <input type="text" name="cpf" placeholder="digite o cpf" onChange={valueInput} /><br />

                <label>Nome: </label>
                <input type="text" name="nome" placeholder="digite o nome completo" onChange={valueInput} /><br />

                <label>E-mail: </label>
                <input type="email" name="email" placeholder="digite o email" onChange={valueInput} /><br />

                <label>Endereço: </label>
                <input type="text" name="endereco" placeholder="digite o endereco" onChange={valueInput} /><br />

                <label>Telefone: </label>
                <input type="text" name="telefone" placeholder="digite o telefone" onChange={valueInput} /><br />

                <label>Senha: </label>
                <input type="password" name="senha" placeholder="digite sua senha" autoComplete="on" onChange={valueInput} /><br />

                <label>Perfil: </label>
                <input type="text" name="perfil" placeholder="digite o seu perfil" onChange={valueInput} /><br />

                <label>Status Usuário: </label>
                <input type="text" name="statusUsuario" placeholder="digite o status" onChange={valueInput} /><br />
                
                <button type="submit">Cadastrar</button>
            </form>

            */
            

            }
            
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
            <AdicionarUsuarios 
                cadastrarUsuario={cadastrarUsuario} 
                valueInput={valueInput}
                setFotoPerfil={setFotoPerfil}
            />
            
            {mostrarModalSucesso ? (
                <ModalSucesso 
                    mostrarModalSucesso={mostrarModalSucesso}
                    setMostrarModalSucesso={setMostrarModalSucesso}
                    message={status.message}
                    controller={'editar'}
                    parametro={idUsuario}
                    enderecoPagina={'editarUsuario'}
                />
            ): ""}
            {mostrarModalNaoEncontrado  ? (
                <ModalNaoEncontrado 
                    mostrarModalNaoEncontrado={true}
                    setMostrarModalNaoEncontrado={setMostrarModalNaoEncontrado}
                    message={status.message}
                />
            ):""}


        </div>
    )
}