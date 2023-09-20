import React, { useState, useEffect } from "react";
import './AddUserStart.css';
import api from '../../config/configApi';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function CadastroUsuarioTelaInicial(props) {
  const [verificadorDeCpf, setVerificadorDeCpf] = useState(true);
  const [verificadorDeNome, setVerificadorDeNome] = useState(true);
  const [verificadorDeEmail, setVerificadorDeEmail] = useState(true);
  const [verificadorDeSexo, setVerificadorDeSexo] = useState(true);
  const [verificadorDeSenha, setVerificadorDeSenha] = useState(true);
  const [verificadorDeSenhaConfirmada, setVerificadorDeSenhaConfirmada] = useState(false);
  const [validarFormulario, setValidarFormulario] = useState(false);
  var verificadorDeFormulario = 0;
  
  const verificarCpf = async e =>{
    let cpf = document.getElementById('cpf').value;
    if(cpf === ""){
      console.log("entreeeeeee");
      setVerificadorDeCpf(true);
      if(verificadorDeFormulario != 0){
        verificadorDeFormulario = verificadorDeFormulario - 1;
      }
      
    } else{
      console.log("entreeeeee11111e");
      setVerificadorDeCpf(false);
      verificadorDeFormulario = verificadorDeFormulario + 1;
      setValidarFormulario(true);

    }
  }
  const verificarNome = async e =>{
    let nome = document.getElementById('nome').value;
    if(nome === ""){
      setVerificadorDeNome(true);
      if(verificadorDeFormulario != 0){
        verificadorDeFormulario = verificadorDeFormulario - 1;
      }
    } else{
      setVerificadorDeNome(false);
      verificadorDeFormulario = verificadorDeFormulario + 1;
      setValidarFormulario(true);
      
    }
  }
  const verificarEmail = async e =>{
    let email = document.getElementById('email').value;
    if(email === ""){
      setVerificadorDeEmail(true);
      if(verificadorDeFormulario != 0){
        verificadorDeFormulario = verificadorDeFormulario - 1;
      }
    } else{
      setVerificadorDeEmail(false);
      verificadorDeFormulario = verificadorDeFormulario + 1;
      setValidarFormulario(true);
      
    }
  }
  const verificarSexo = async e =>{
    let sexo = document.querySelector('input[name=sexo]:checked').value;
    
    if(!(sexo !== "")){
      setVerificadorDeSexo(true);
      if(verificadorDeFormulario != 0){
        verificadorDeFormulario = verificadorDeFormulario - 1;
      }
    } else{
      setVerificadorDeSexo(false);
      verificadorDeFormulario = verificadorDeFormulario + 1;
      setValidarFormulario(true);
    }
  }
  const verificarSenha = async e =>{
    let senha = document.getElementById('senha').value;
    if(senha === ""){
      setVerificadorDeSenha(true);
      if(verificadorDeFormulario != 0){
        verificadorDeFormulario = verificadorDeFormulario - 1;
      }
    } else{
      setVerificadorDeSenha(false);
      verificadorDeFormulario = verificadorDeFormulario + 1;
      setValidarFormulario(true);
    }
  }

  const verificarSenhaConfirmacao = async e =>{
    let senha = document.getElementById('senha').value;
    let senhaConfirmacao = document.getElementById('senhaConfirmada').value;
    if(senha !== senhaConfirmacao){
      setVerificadorDeSenhaConfirmada(true);
      if(verificadorDeFormulario != 0){
        verificadorDeFormulario = verificadorDeFormulario - 1;
      }
    } else{
      setVerificadorDeSenhaConfirmada(false);
      verificadorDeFormulario = verificadorDeFormulario + 1;
      setValidarFormulario(true);
    } 
  }
  const verificarValidacaoFormulario = () =>{
    if(!((verificadorDeCpf) && (verificadorDeNome) && (verificadorDeEmail) && (verificadorDeSexo) && (verificadorDeSenha))){
      console.log(verificadorDeNome);
    } else{
      console.log("nao");
      console.log("verificador: ");
    }
  }
 
  //const valueInput = e => setUser({...user, [e.target.name]: e.target.value});
  const verificarCamposObrigatorios = async e =>{
    console.log("entrei aqui1");
  }
  const teste = async e =>{
    verificarCpf();
    verificarNome();
    verificarEmail();
    verificarSexo();
    verificarSenha();
    verificarSenhaConfirmacao();
    verificarValidacaoFormulario();
  }
  const teste2 = async e =>{
    console.log("entrei aqui2");
  } 
  
    return (props.trigger) ? (

        <div className="createUser">

            <div className="createUser-inner">



                <Container fluid="xxl" className="bg-ligth">
                    <Row>
                        <Col>
                            <h5 className="text-center texto-titulo-createUser text-uppercase">Criar conta</h5>
                        </Col>
                        <Col xs={2}>
                            <button className="close-btn btn btn-danger" onClick={() => props.setTrigger(false)}>Fechar</button>

                        </Col>


                        {/*titulo-poup texto-titulo-poup*/}
                    </Row>
                    <Row>
                        <Col xs={3} className="mt-2">
                          <p className='text-primaryyUs-p'>CPF</p>
                          <input className='inputCpf' type="text" id="cpf" name="cpf" placeholder="Digite o cpf" onChange={teste} />
                          {(verificadorDeCpf)?(<p className="texto-cor-poup texto-senha-nao-confere">Campo Obrigatório</p>):""}
                        </Col>
                        <Col className="mt-2">
                          <p className='text-primaryyUs-p'>NOME</p>
                          <input className='inputNome' type="text" id="nome" name="nome" placeholder="Digite o nome completo" onChange={teste} /><br />
                          {(verificadorDeNome)?(<p className="texto-cor-poup texto-senha-nao-confere">Campo Obrigatório</p>):""}
                         </Col> 
                        
                    </Row>
                    <Row>
                      <Col className="mt-2">
                        <p className='text-primaryyUs-p'>E-MAIL</p>
                        <input className='inputEmail' type="email" id="email" name="email" placeholder="Digite o email" onChange={teste}/><br />
                        {(verificadorDeEmail)?(<p className="texto-cor-poup texto-senha-nao-confere">Campo Obrigatório</p>):""}
                      </Col>
                      <Col className="mt-2">
                        <p className='text-primaryyUs-p'>SEXO</p>
                        <input type="radio" id="masculino" name="sexo" value="masculino" onChange={teste} />
                        <label for="masculino">MASCULINO </label>
                        <input type="radio" id="feminino" name="sexo"  value="feminino" onChange={teste} />
                        <label for="feminino">FEMININO </label>
                        {(verificadorDeSexo)?(<p className="texto-cor-poup texto-senha-nao-confere">Campo Obrigatório</p>):""}
                      </Col> 
                    </Row>
                    <br />
                    <Row>
                    
                      <Col>
                        <p className='text-primaryyUs-p'>SENHA</p>
                        <input className='inputUps' type="password" id="senha" name="senha" placeholder="Digite sua senha" autoComplete="on" onChange={teste} /><br />
                        {(verificadorDeSenha)?(<p className="texto-cor-poup texto-senha-nao-confere">Campo Obrigatório</p>):""}
                      </Col>
                      <Col>
                          <span>
                            {(verificadorDeSenhaConfirmada)?(<p className='text-primaryyUs-p texto-cor-poup'>CONFIRME SUA SENHA</p>):(<p className='text-primaryyUs-p'>CONFIRME SUA SENHA</p>)}
                            <input className='inputUps' type="password" id="senhaConfirmada" name="senhaConfirmada" placeholder="Digite sua senha" autoComplete="on" onChange={teste} /><br />
                            {(verificadorDeSenhaConfirmada)?(<p className="texto-cor-poup texto-senha-nao-confere">Senhas não confere</p>):""}
                          </span>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                        <br />
                        <Col xs={4}>

                        </Col>
                        <Col>
                          
                            <button className="send-btn btn btn-success" onClick={() => props.setTrigger(false)}>Cadastrar</button>
                        </Col>
                        <Col xs={5}>

                        </Col>
                  
                    </Row>
                    
                </Container>

                {props.children}

            </div>

        </div>
    ) : ""
}
export default CadastroUsuarioTelaInicial;