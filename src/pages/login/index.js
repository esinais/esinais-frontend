import React, { useContext, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom'; //fazer o redirecionamento de páginas
import api from '../../config/configApi';
import { Context } from "../../Context/AuthContext";
import Poups from "../../Components/Poups";
import Home from '../../Components/Home';
import AddUsers from '../../Components/Add-User-start';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './estilo.css';
import CardsProjeto from '../../Components/Cards-projeto';
import CardsRanking from '../../Components/Cards-Ranking';
import Footer from '../../Components/Footer';



export const Login = () => {

    const history = useHistory(); // navegar entre as páginas
    const { authenticated, signIn } = useContext(Context);

    //sconsole.log("Situação do usuário na página login: " + authenticated);

    const [usuario, setUsuario] = useState({
        email: '',
        senha: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: '',
        loading: false //verifica se a API está respondendo
    });

    const [data, setData] = useState([]);
    const [textoInput, setTextoInput] = useState(() => { return true });
    const [imgAssoEvento, setImgAssoEvento] = useState('');
    const [sinalEvento, setSinalEvento] = useState('');
    const [buttonPopups, setButtonPopups] = useState('');
    const [sinonimos, setSinonimos] = useState('');
    const [polissemia, setPolissemia] = useState('');
    const [titulo, setTitulo] = useState(false);
    const [imgAssociativaFlu, setImgAssociativaFlu] = useState(false);
    const [imgAssociativaPoup, setImgAssociativaPoup] = useState('');
    const [nomeSinalPoup, setNomeSinalPoup] = useState('');
    const [regionalidadePoup, setRegionalidadePoup] = useState('');
    const [classificacaoGramaticalPopup, setClassificacaoGramaticalPopup] = useState('');
    const [corFontPoup, setCorFontPoup] = useState(false);
    const [tituloPolissemia, setTituloPolissemia] = useState(true);
    const [tituloSinonimo, setTituloSinonimo] = useState(true);
    const [controle, setControle] = useState('');
    const [ranking, setRanking] = useState('');
    const [nomeBandeira, setNomeBandeira] = useState('');
    const [contador, setContador] = useState(0);
    const [cadastrarUsuario, setCadastrarUsuario] = useState(false);



    //recuperando os valores do formulário
    const valorInput = e => setUsuario({ ...usuario, [e.target.name]: e.target.value });
    const valorInputTexto = e => setTextoInput({ ...textoInput, [e.target.name]: (e.target.value).toLocaleLowerCase() })

    const informacoesDetalhadasSinal = (gramatical, regiao, imgSinonimo, nomeSinal) =>{
        setClassificacaoGramaticalPopup(gramatical);
        setRegionalidadePoup(regiao);
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
        setImgAssociativaPoup(imgSinonimo);
        setNomeSinalPoup(nomeSinal);
        setCorFontPoup(true);
    }
    const informacoesDetalhadasSinalLimpar = e => {
        setImgAssociativaPoup(data[e].img);
        setNomeSinalPoup(data[e].nomeSinal);
        setRegionalidadePoup(data[e].regiao);
        setClassificacaoGramaticalPopup(data[e].gramatical);
        setCorFontPoup(false);
        let termoCompleto = '';
        let termo = data[e].regiao.split(' ');
        if(termo == ''){
            termoCompleto = data[e].regiao;
        }else{
            for (let i = 0; i < termo.length; i++) {
                termoCompleto = termoCompleto + termo[i];
                    
            }
        }
        setNomeBandeira(termoCompleto);
        
    }
    
    const contadorPalavras = (valor) => {
        //console.log("entrei no contador: ");
        valor.replace(/(\r\n|\n|\r)/g," ").trim(); 
	    var cont = valor.split(/\s+/g).length - 1; 

	    if(cont == "1" || cont == "0"){ 
		    //document.getElementById("quantidade2").value = cont + " Palavra"; 
            setContador(cont);
	    }else{ 
		    //document.getElementById("quantidade2").value = cont + " Palavras"; 
            setContador(cont);
	    } 
    }

    const imgAssociativaEvento = e => {
        setImgAssociativaFlu(true);
        setImgAssociativaPoup(data[e].img);
        setNomeSinalPoup(data[e].nomeSinal);
        setRegionalidadePoup(data[e].regiao);
        setClassificacaoGramaticalPopup(data[e].gramatical);
        setImgAssoEvento(data[e].img);
        
        if((data[e].sinonimo == '') || (data[e].sinonimo == null)){
            setSinonimos(false);
            setTituloSinonimo(false);
        }else{
            setTituloSinonimo(true);
            setSinonimos(data[e].sinonimo);
        }
        if((data[e].polissemia == '') || (data[e].polissemia == null)){
            setTituloPolissemia(false);
            
        }else{
            setTituloSinonimo(true);
            setPolissemia(data[e].polissemia);
        }
        
        setControle(e);

        let termoCompleto = '';
        let termo = data[e].regiao.split(' ');
        if(termo == ''){
            termoCompleto = data[e].regiao;
        }else{
            for (let i = 0; i < termo.length; i++) {
                termoCompleto = termoCompleto + termo[i];
                    
            }
        }
        setNomeBandeira(termoCompleto);
        setSinalEvento(e);

    }
    const limparEvento = async e => {
        setImgAssoEvento('');
        setImgAssociativaFlu(false);
    }
    const trocarSinonimo = async (nameSinal, sinal) => {

        //data[sinalEvento].sinal = sinal;
        //var nova = ((textoInput.texto).replace(nomeSinal, nameSinal));
        var textoOld = '';
        data.map((elemento, index) => {
            if (index === sinalEvento) {
                textoOld = textoOld + " " + nameSinal;
            } else {
                textoOld = textoOld + " " + elemento.nomeSinal;
            }

        })
        setTextoInput(textoInput => ({ ...textoInput, "texto": textoOld }))
        setButtonPopups(false);



    }
    const trocarPolissemia = async (sinal, img, index) => {
        let enderecoSinalOld = data[sinalEvento].sinal;
        let enderecoImgAssoOld = data[sinalEvento].img;

        data[sinalEvento].sinal = sinal;
        data[sinalEvento].img = img;
        data[sinalEvento].polissemia[index].enderecoSinalPolissemico = enderecoSinalOld;
        data[sinalEvento].polissemia[index].imgPolissemia = enderecoImgAssoOld;
        setButtonPopups(false);
    }
    const modalCadastrarUsuario = async e => {
        setCadastrarUsuario(true);
    }

    const loginSubmit = async e => {
        //este comando evita que a página seja recarregada após o submit
        e.preventDefault();


        //verificando se API respondeu
        setStatus({
            loading: true
        });
        //Declarando o cabeçalho da API
        const headers = {
            'Content-Type': 'application/json'
        }
        //Acessando a rorta login do back-end e enviando as informações de usuário
        await api.post("usuarios/login", usuario, { headers })
            //caso a  rota seja acessada com sucesso
            .then((response) => {

                setStatus({
                    /*type: 'success',
                    mensagem: response.data.mensagem,*/
                    loading: false
                });
                //recuperando o token e vindo do back-end e salvando no localStorage do navegador
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('idUsuario', response.data.usuario.id);
                localStorage.setItem('perfilUsuario', response.data.usuario.perfil);

                //verificar se o status de logado ou não
                signIn(true);
                //redireciona para a página
                return history.push('/dashboard');

            }).catch((err) => {
                if (err.response) {

                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.message,
                        loading: false
                    });
                } else {

                    setStatus({
                        type: 'error',
                        mensagem: "Erro: tente mais tarde!",
                        loading: false
                    });
                }
            });
    }
    const getSinais = async e => {
        //e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }


        //fazendo requisição para rota de listar sinais do back-end
        ///sinais/:id_tipo/:paginacao
        //
        await api.post("/sinais/", textoInput, headers)
            .then((response) => {
                console.log(response.data.sinais_encontrados)
                //Apresentar o retorno da API e setar em setData
                setData(response.data.sinais_encontrados);
                setTitulo(true);
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
    const getRanking = async e => {
        //e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }


        //fazendo requisição para rota de listar sinais do back-end
        ///sinais/:id_tipo/:paginacao
        // api.defaults.baseURL/sinais/id_tipo/valor/paginacao
        ///sinais/:id_tipo/:valor/:paginacao
        //console.log("aqui")
        await api.get("/sinais/9/0/1", headers)
            .then((response) => {
                //console.log(response.data.sinais_encontrados.polissemia[0].nomeSinal)
                //Apresentar o retorno da API e setar em setData
               
                setRanking(response.data.usuarios);
                

            }).catch((err) => {

                if (err.response) {

                   
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
        getSinais();
        getRanking();
    }, [textoInput]);



    return (
        <div>
            {[false].map((expand) => (
                <Navbar fixed="top" key={expand} bg="white" expand={expand} className="mb-1">
                    <Container fluid>
                        <Navbar.Brand href="#" style={{ fontFamily: "'Fredoka One', cursive", fontWeight: "Bold", color: "blue" }}>e-sinais</Navbar.Brand>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    e-Sinais
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>

                                {status.type === 'error' ? <p>{status.mensagem}</p> : ""}
                                {status.type === 'success' ? <p>{status.mensagem}</p> : ""}
                                {status.loading ? <p>Validando...</p> : ""}
                                <Form onSubmit={loginSubmit}>
                                    <Form.Group className="col-md-12" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Digite o email" onChange={valorInput} />
                                        <Form.Text className="text-muted">

                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="col-md-12" controlId="formBasicPassword">
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control type="password" name="senha" placeholder="Digite a senha" onChange={valorInput} />
                                    </Form.Group>
                                    <Form.Group className="mb-1" controlId="formBasicCheckbox">
                                        <Nav.Link href="#action1">Esqueceu sua Senha?</Nav.Link>
                                    </Form.Group>

                                    {status.loading ? <Button variant="primary" type="submit" disabled>Acessando...</Button> : <Button variant="primary" type="submit">Entrar</Button>}
                                </Form>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>

                </Navbar>

            ))}
            <div style={{ marginTop: "5%"}} >
                <Home />
            </div>
            
            <Container fluid="xl" className="bg-white">

                <Row>
                    <Form.Label style={{ marginTop: "5%", marginBottom: "5%" }} className="texto-titulo text-center">Digite ou copie texto em Português</Form.Label>
                </Row>
                <Row>
                    <Col>
                        <form onSubmit={getSinais}>
                            <style>
                                {`
                                .textArea{
                                    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
                                }
                                .tradutor{
                                    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
                                }
                                .qtdPalavras{
                                    text-align: right;
                                }

                            `}
                            </style>
                            <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1">
                                <Form.Control className="textArea" as="textarea" name="texto" rows={6} onChange={valorInputTexto/*e=> setTextoInput(e.target.value)*/} onKeyUp={e => contadorPalavras(e.target.value)} />
                                <p className="qtdPalavras">{contador} Palavra(s)</p>
                            </Form.Group>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <style>
                        {`
                                .imgAssociativaFlutuante{
                                    width:100%;
                                    height: 84px;
                                    position: fixed;
                                    z-index: 9999999;
                                    right: 0rem;
                                    left: 85%;
                                    bottom: 75%;
                                }
                                .imgAssociativaLegenda{
                                    font-size: 15px;
                                    font-weight: bold; 
                                    font-family:'Barlow Semi Condensed', sans-serif;
                                    color: #F01300;
                                }
                    
                        `}

                    </style>
                    <Col xs={10}></Col>
                    {imgAssociativaFlu ? (
                        <Col className="imgAssociativaFlutuante">
                            <span className="imgAssociativaLegenda">
                                <img src={api.defaults.baseURL+"/files/imgAssociativa/" + imgAssoEvento} alt="Imagem Associativa" width="150px" height="150px" /><br />
                                <p>Imagem Associativa</p>
                            </span>
                        </Col>
                    ) : ""}

                </Row>

                {titulo ? (<h2 className="texto-titulo-tradutor mt-3 mb-3 text-center">Tradução para LIBRAS</h2>) : ""}
                <Container className="bg-ligth mb-4 tradutor" >
                    <style>
                        {`
                            .legenda{
                                position: relative;
                                top: 100%;
                                font-weight: bold;
                                font-size: 60px; 
                                font-family:'Barlow Semi Condensed', sans-serif;
                            }
                            .container-tradutor { position:relative; }
                            .container-tradutor img {
                                position:relative;
                                z-index:0;
                                cursor: pointer;
                            }
                            .overlay {
                                position:absolute;
                                top:82px;
                                left:35%;
                                z-index:1;
                                font-weight: bold;
                                font-size: 15px; 
                                font-family:'Barlow Semi Condensed', sans-serif;
                            }
                            
                            .container-tradutor-poup{
                                position:relative;
                                z-index:0;
                                cursor: pointer;
                            }

                            
                        `}
                    </style>

                    {data.map((sinais_encontrados, index) => (
                        <span className="container-tradutor">
                            {/*<img className="mt-3 mb-3" src={"http://localhost:8080/files/sinais/" + sinais_encontrados.sinal} alt="Imagem do sinal" width="150px" height="150px" onClick={() => setButtonPopups(true)} onMouseEnter={() => imgAssociativaEvento(index)} onMouseLeave={limparEvento} value="nada" />
                            */}
                            <img className="mt-3 mb-3" src={api.defaults.baseURL+"/files/sinais/" + sinais_encontrados.sinal} alt="Imagem do sinal" width="150px" height="150px" onClick={() => setButtonPopups(true)} onMouseEnter={() => imgAssociativaEvento(index)} onMouseLeave={limparEvento} value="nada" />
                            <span className="overlay">{sinais_encontrados.nomeSinal}</span>{"    "}
                        </span>
                    ))}
                    <Poups 
                        trigger={buttonPopups} setTrigger={setButtonPopups}
                        titulo={"Detalhes do sinal"}
                        nomeSinalPoup={nomeSinalPoup}
                        classificacaoGramaticalPopup={classificacaoGramaticalPopup}
                        bandeira={nomeBandeira}
                        regionalidadePoup={regionalidadePoup}
                        imgAssociativaPoup={imgAssociativaPoup}
                        corFontPoup={corFontPoup}


                    >
                        
                        {/*<h7 className="texto-detalhes-poup">Nome do Sinal: {nomeSinalPoup}</h7>*/}
                        <br />

                       
                        {(tituloPolissemia) ? (<h5>Homônimos/Polissemia</h5>) : ""}
                        <Container className="bg-ligth mb-5 tradutor" >
                            {(polissemia) ? (polissemia.map((pol, index) => (
                                <span className="container-tradutor">
                                    <img className="container-tradutor-poup mt-3 mb-3" src={api.defaults.baseURL+"/files/sinais/" + pol.enderecoSinalPolissemico}
                                        onClick={() => trocarPolissemia(pol.enderecoSinalPolissemico, pol.imgPolissemia, index)}
                                        onMouseEnter={() => informacoesDetalhadasSinal(pol.gramatical, pol.regiao, pol.imgPolissemia, pol.nomeSinal)}
                                        onMouseLeave={() => informacoesDetalhadasSinalLimpar(controle)}
                                        
                                        alt="Imagem do sinal" width="150px" height="150px" />
                                    <span className="overlay">{pol.nomeSinal}</span>{"    "}
                                </span>

                            ))) : ""}
                        </Container>
                        {(tituloSinonimo) ? (<h5>Sinônimos</h5>):""}
                        <Container className="bg-ligth mb-4 tradutor" >
                            {(sinonimos) ? (sinonimos.map((sin) => (
                                <span className="container-tradutor">
                                    <img className="container-tradutor-poup mt-3 mb-3" src={api.defaults.baseURL+"/files/sinais/" + sin.enderecoSinalSinonimo}
                                        onClick={() => trocarSinonimo(sin.nomeSinal, sin.enderecoSinalSinonimo)}
                                        onMouseEnter={() => informacoesDetalhadasSinal(sin.gramatical, sin.regiao, sin.imgSinonimo, sin.nomeSinal)}
                                        onMouseLeave={() => informacoesDetalhadasSinalLimpar(controle)}
                                        alt="Imagem do sinal" width="150px" height="150px" />
                                    <span className="overlay">{sin.nomeSinal}</span>{"    "}
                                </span>
                            ))) : ""}
                        </Container>
                    </Poups>
                </Container>
                <p className="qtdPalavras">{contador} Palavra(s) traduzidas</p>
                <div className="text-center">
                    <p className="texto-titulo-tradutor">Ainda não criou sua conta no e-Sinais?</p>
                    <Button className="text-center" variant="outline-success"
                        onClick={() => setCadastrarUsuario(true)}
                    >Cadastre-se</Button>
                </div>
                {(cadastrarUsuario) ? (
                    <AddUsers 
                        trigger={cadastrarUsuario} 
                        setTrigger={setCadastrarUsuario}
                        
                    />): ""}
                
                <CardsProjeto />
                <CardsRanking usuarios={ranking} />
                <Footer />
            </Container>
        </div>
    )
}