import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import logo from './imagens/lg2.png'



function Home() {
    return (
        <Container fluid="xxxl" className="bg-litgh">
            <style>
                {`
                    
                    .texto-card-titulo{
                        color:rgb(0, 0, 0);
                        position: relative; 
                        top: 25%;
                        font-weight: bold;
                        font-size: clamp(1.75rem, 1em + 3vw, 2.3rem); 
                        @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@100;500&family=Fredoka+One&family=Montserrat:wght@700&display=swap');
                    }
                    .texto-card-subtitulo{
                        color:rgb(0, 0, 0);
                        position: relative;
                        @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@100;500&family=Fredoka+One&family=Montserrat:wght@700&display=swap');
                        top: 28%;
                        font-size: clamp(0.5rem, 0.5em + 2vw, 1.5rem);
                        
                    }
                    .button-card {
                        position: relative; 
                        top: 35%;
                        width: 15%;
                        white-space: normal !important;
                        @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@100;500&family=Fredoka+One&family=Montserrat:wght@700&display=swap');
                    }

                `}
            </style>
            {/*<Card fluid="xxl" className="text-center">
                <Card.Img src={logo} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title className="texto-card-titulo">e-sinais</Card.Title>
                    <Card.Text className="texto-card-subtitulo">
                        Tradutor de Língua Portuguesa para Língua Brasileira de Sinais - LIBRAS
                    </Card.Text>
                    <Button className="button-card">Tradutor</Button>
                </Card.ImgOverlay>
                mt-5 mb-5 pt-5
                text-center text-justify mt-5 mb-5 pt-5
                text-center mt-5
            </Card>*/}
            <Card className="bg-dark text-white fluid ">
                <Card.Img className="fluid" src={logo} alt="Card image" />
                    <Card.ImgOverlay className="">
                       
                        
                    </Card.ImgOverlay>
                </Card>
        </Container>
    );
}

export default Home;
