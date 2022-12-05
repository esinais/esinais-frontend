import React from "react";
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Figure from 'react-bootstrap/Figure';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import imgCientifico from './imagens/cientifico.jpg';
import imgColaborativo from './imagens/colaborativo.jpg';
import imgManual from './imagens/manual.jpg';
//import './estiloCards.css';




function Cards() {
    return (

        <Container fluid="xl" className="bg-white">

            <Row>
                <style>
                    {` .texto-titulo-projeto{
                            margin-top: 5%;
                            margin-bottom: 5%;
                            font-weight: Bold;
                            font-size: 30px; 
                            @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@100;500&family=Fredoka+One&family=Montserrat:wght@700&display=swap');
                        }
                        
                    `}
                </style>
                <Form.Label  className="texto-titulo-projeto text-center">Projeto e-sinais</Form.Label>
                
                </Row>
            <CardGroup>
                <Card >
                    <Card.Img variant="top" src={imgCientifico} />
                    <Card.Body>
                        <Card.Title>Conheça a página do projeto Libras IFBA Conquista</Card.Title>
                        <Card.Text>
                            Clique para acessar a página com informções relacionadas ao projeto.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src={imgColaborativo} />
                    <Card.Body>
                        <Card.Title>Colabore com o projeto</Card.Title>
                        <Card.Text>
                            o e-sinais é um sistema colaborativo, onde é permitido que você participe gravando sinais em LIBRAS, aumentando assim o repositório de sinais.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src={imgManual} />
                    <Card.Body>
                        <Card.Title>Manual de Instruções</Card.Title>
                        <Card.Text>
                            Conheça mais sobre o sistema acessando manual de instruções.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </Container>
    );
}

export default Cards;
