import { useState } from 'react';
import hello from '../assets/esinais.png';
import './edit-usuarios.css';
import ModalExcluir from '../Modal-Excluir';

const EditUsuario = ( { editarUsuario, deletarUsuario, cpf, nome, email, endereco, telefone, senha,                        
                        perfil, statusUsuario, sexo, fotoPerfilTemp, setCpf, setNome, setEmail, setEndereco, setTelefone,
                        setSenha, setPerfil, setStatusUsuario, setSexo, setFotoPerfil, perfilUsuarioLogado
                    } ) => {
    
    const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
    const [confirmarExcluir, setConfirmarExcluir] = useState(false);

    const exibicaoModalExcluir = () => {
        return (
            <ModalExcluir
                mostrarModalExcluir={mostrarModalExcluir}
                setMostrarModalExcluir={setMostrarModalExcluir}
                setConfirmarExcluir={setConfirmarExcluir}         

             />
        )
    }
    
    return (

        <main className='editUsuario'>
            <div className='editUsuario__container'>
                <div className='editUsuario__title'>
                    <img src={hello} alt="hello"/>
                    <div className='editUsuario_greeting'>
                        <h1>Editar Usuário</h1>
                        <p>* informações obrigatórias</p>
                    </div>
                </div>
                <form onSubmit={editarUsuario}>
                    <div className='cardEditUsuario'>
                    <div className='alinharUs'>
                            <p className='text-primaryyEd-p'>CPF</p>
                            <input className='inputEd' type="text" name="cpf" value={cpf} onChange={text => setCpf(text.target.value)} /><br />
                            

                        </div>
                        <div className='alinharUs'>
                            <p className='text-primaryyEd-p'>NOME</p>
                            <input className='inputEd' type="text" name="nome" value={nome} onChange={text => setNome(text.target.value)} /><br />

                        </div>
                        <div className='alinharUs'>
                            <p className='text-primaryyEd-p'>E-MAIL</p>
                            <input className='inputEd' type="email" name="email" value={email} onChange={text => setEmail(text.target.value)} /><br />

                        </div>
                        <div className='alinharUs'>
                            <p className='text-primaryyEd-p'>ENDEREÇO</p>
                            <input className='inputEd' type="text" name="endereco" value={endereco} onChange={text => setEndereco(text.target.value)} /><br />

                        </div>
                        <div className='alinharUs'>
                            <p className='text-primaryyEd-p'>TELEFONE</p>
                            <input className='inputEd' type="text" name="telefone" value={telefone} onChange={text => setTelefone(text.target.value)} /><br />

                        </div>
                        
                            {sexo === 'masculino' ? (
                                <div className='alinharUs'>
                                    <p className='text-primaryyUs-p'>SEXO</p>
                                    <input type="radio" id="masculino" name="sexo" onChange={setSexo} checked/>
                                    <label for="masculino">MASCULINO</label>
                                    <input type="radio" id="feminino" name="sexo"  onChange={setSexo}/>
                                    <label for="feminino">FEMININO</label>
                                </div>

                            ): (
                                <div className='alinharUs'>
                                    <p className='text-primaryyUs-p'>SEXO</p>
                                    <input type="radio" id="masculino" name="sexo" onChange={setSexo} />
                                    <label for="masculino">MASCULINO</label>
                                    <input type="radio" id="feminino" name="sexo"  onChange={setSexo} checked/>
                                    <label for="feminino">FEMININO</label>
                                </div> 
                            )}

                        <div className='alinharUs'>
                            <p className='text-primaryyEd-p'>Foto de Perfil</p>
                            <img src={"http://localhost:8080/files/fotosPerfilUsuarios/" + fotoPerfilTemp} alt="foto de perfil" height={200} width={180}/>
                            <br />
                            <label for="fotoPerfil" className='buttonAlterarLabel'>Alterar</label>
                            <input id="fotoPerfil" className='esconder' type="file" name="fotoPerfil" accept="image/png, image/jpeg, image/gif" onChange={e => setFotoPerfil(e.target.files[0])} ></input>
                        </div>
                            
                        
                        <div className='alinharUs'>
                            <p className='text-primaryyEd-p'>SENHA</p>
                            <input className='inputEd' type="password" name="senha"  autoComplete="on" value={senha} onChange={text => setSenha(text.target.value)} /><br />

                        </div>
                        <div className='alinharUs'>
                            <p className='text-primaryyEd-p'>CONFIRME SUA SENHA</p>
                            <input className='inputEd' type="password" name="senhaConfirmada" autoComplete="on" value={senha} /><br />

                        </div>
                        <div className='alinharUs'>
                            <p className='text-primaryyEd-p'>PERFIL</p>
                            {perfilUsuarioLogado === "administrador" ? (
                                <select className='selectEd' value={perfil} onChange={text => setPerfil(text.target.value)} name="perfil" id="perfil">
                                    <option value="" selected>Selecione:</option>
                                    <option value="administrador">Administrador</option>
                                    <option value="autorizador">Autorizador</option>
                                    <option value="padrao" >Padrão</option>
                                </select>
                            ):(
                                <select className='selectEd' value={perfil} onChange={text => setPerfil(text.target.value)} name="perfil" id="perfil" disabled>
                                    <option value="" selected>Selecione:</option>
                                    <option value="administrador">Administrador</option>
                                    <option value="autorizador">Autorizador</option>
                                    <option value="padrao" >Padrão</option>
                                </select>
                            )}
                            
                        </div>
                        <div className='alinharUs'>
                            <p className='text-primaryyEd-p'>Status Usuário</p>
                            <select className='selectEd' value={statusUsuario} onChange={text => setStatusUsuario(text.target.value)} name="perfil" id="perfil">
                                <option value="" selected>Selecione:</option>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                                
                            </select>
                        </div>
                        <div className=''>
                            <button className='buttonCadastrarEd' type="submit">Salvar</button>
                            {perfilUsuarioLogado === "administrador" ? (
                                <button className='buttonExcluirEd' type="button" onClick={()=> setMostrarModalExcluir(true)}>Excluir</button>
                            ):""}
                        </div>
                        {mostrarModalExcluir ? (exibicaoModalExcluir()):"" }
                        {confirmarExcluir ? (deletarUsuario()): ""}
                    </div>
                    

                    

                </form>

            </div>
        </main>

    );
}
export default EditUsuario;