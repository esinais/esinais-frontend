import React from "react";


import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import imgPrimeiroLugar from './imagens/Homem.png';
import imgSegundoLugar from './imagens/Ruiva.png';
import imgTerceiroLugar from './imagens/Morena.png';

//import './estiloCards.css';




function Cards(props) {
    
    var primeiro = "";
    var primeiro_colaboracoes = "";
    var primeiro_foto_perfil = "";
    var segundo = "";
    var segundo_colaboracoes = "";
    var segundo_foto_perfil = "";
    var terceiro = "";
    var terceiro_colaboracoes = "";
    var terceiro_foto_perfil = "";
    if(props.usuarios == ""){
        primeiro = "e-sinais";
        primeiro_colaboracoes = "0";
        primeiro_foto_perfil = imgPrimeiroLugar;
        segundo = "e-sinais";
        segundo_colaboracoes = "0";
        segundo_foto_perfil = imgSegundoLugar;
        terceiro = "e-sinais";
        terceiro_colaboracoes = "0";
        terceiro_foto_perfil = imgTerceiroLugar;
    }else if (props.usuarios == null){
        primeiro = "e-sinais";
        primeiro_colaboracoes = "0";
        primeiro_foto_perfil = imgPrimeiroLugar;
        segundo = "e-sinais";
        segundo_colaboracoes = "0";
        segundo_foto_perfil = imgSegundoLugar;
        terceiro = "e-sinais";
        terceiro_colaboracoes = "0";
        terceiro_foto_perfil = imgTerceiroLugar;
    }else{
        primeiro = props.usuarios[0].nome;
        primeiro_colaboracoes = props.usuarios[0].quantidadeSinais;
        primeiro_foto_perfil = props.usuarios[0].fotoPerfil;
        segundo = props.usuarios[1].nome;
        segundo_colaboracoes = props.usuarios[1].quantidadeSinais;
        segundo_foto_perfil = props.usuarios[1].fotoPerfil;
        terceiro = props.usuarios[2].nome;
        terceiro_colaboracoes = props.usuarios[2].quantidadeSinais;
        terceiro_foto_perfil = props.usuarios[2].fotoPerfil;
        
    }
    return (
        
        <Container fluid="xl" className="bg-white" style={{ marginBottom: "20%" }}>
            <Row>
                <style>
                    {`  
                        .texto-titulo-ranking{
                            font-size: 30px;
                            font-weight: Bold;
                            @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@100;500&family=Fredoka+One&family=Montserrat:wght@700&display=swap');

                        }
                        .texto-subtitulo-ranking{
                            @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@100;500&family=Fredoka+One&family=Montserrat:wght@700&display=swap');
                        }
                        .circulo{
                            width: 140px !important;
                            height: 180px !important; 
                            padding-top: 24px !important;
                        }
                        .centralizar{
                            margin: 0 auto !important;
                            float: none !important;
                        }
                    
                    `}
                </style>
                <Form.Label className="display-4 mt-5 texto-titulo-ranking text-center">Ranking</Form.Label>
                <p className="text-center texto-subtitulo-ranking pb-4">Usuários que mais colaboram com o projeto</p>
            </Row>
            <Row>
                <Col className="md-4 text-center">
                    <img className="rounded-circle circulo centralizar" alt="logo" src={"http://localhost:8080/files/fotosPerfilUsuarios/" + primeiro_foto_perfil}/>
                    <h2 className="mt-4 mb-4">{primeiro}</h2>
                    <p>{primeiro_colaboracoes+ " "} colaborações</p>
                </Col>
                <Col className="md-4 text-center">
                    <img className="rounded-circle circulo centralizar" alt="logo" src={"http://localhost:8080/files/fotosPerfilUsuarios/" + segundo_foto_perfil}/>
                    <h2 className="mt-4 mb-4">{segundo}</h2>
                    <p>{segundo_colaboracoes+ " "} colaborações</p>    
                </Col>
                <Col className="md-4 text-center">
                    <img className="rounded-circle circulo centralizar" alt="logo" src={"http://localhost:8080/files/fotosPerfilUsuarios/" + terceiro_foto_perfil}/>
                    <h2 className="mt-4 mb-4">{terceiro}</h2>
                    <p>{terceiro_colaboracoes+ " "} colaborações</p>
                </Col>
            </Row>
            {
               /* <CardGroup>

                <Card className="border border-white">
                    <Card.Img variant="top" src={imgPrimeiroLugar} className="rounded-circle" />
                    <Card.Body>
                        <Card.Title className="text-center" >Fulano Beltrano</Card.Title>
                        <Card.Text className="text-center">
                            50 colaborações
                        </Card.Text>
                    </Card.Body>

                </Card>
                <Card className="border border-white">
                    <Card.Img variant="top" src={imgSegundoLugar} className="rounded-circle" />
                    <Card.Body>
                        <Card.Title className="text-center">Ciclano Santos</Card.Title>
                        <Card.Text className="text-center">
                            20 colaborações
                        </Card.Text>
                    </Card.Body>

                </Card>
                <Card className="border border-white">
                    <Card.Img variant="top" src={imgTerceiroLugar} className="rounded-circle" />
                    <Card.Body>
                        <Card.Title className="text-center">Beltrano Almeida</Card.Title>
                        <Card.Text className="text-center">
                            10 colaborações
                        </Card.Text>
                    </Card.Body>

                </Card>
            </CardGroup>*/
            }
        </Container>
    );
}

export default Cards;
