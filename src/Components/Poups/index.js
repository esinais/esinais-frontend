import React from "react";
import './Poups.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function Popups(props) {
    
    return (props.trigger) ? (

        <div className="popup">

            <div className="popup-inner">



                <Container fluid="xxl" className="bg-ligth">
                    <Row>
                        <Col>
                            <h5 className="text-center texto-titulo-poup text-uppercase">{props.titulo}</h5>
                        </Col>
                        <Col xs={2}>
                            <button className="close-btn btn btn-danger" onClick={() => props.setTrigger(false)}>Fechar</button>

                        </Col>


                        {/*titulo-poup texto-titulo-poup*/}
                    </Row>
                    <Row>
                        {(props.corFontPoup) ? (<h7 className="texto-cor-poup texto-nomeSinal-popup text-uppercase">Nome do Sinal: {props.nomeSinalPoup}</h7>): (<h7 className="texto-nomeSinal-popup text-uppercase">Nome do Sinal: {props.nomeSinalPoup}</h7>)}
                    </Row>
                    <Row className="texto-detalhesSinal-poup mt-5">
                        <Col className="mt-2">
                            <h6 className="texto-detalhesSinalTitulo-poup">Classificação gramatical:</h6>
                            {(props.corFontPoup)? (<h7 className="texto-cor-poup">{props.classificacaoGramaticalPopup}</h7>):(<h7 className="">{props.classificacaoGramaticalPopup}</h7>)}
                        </Col>
                        <Col className="mt-2">
                            <h6 className="texto-detalhesSinalTitulo-poup">Regionalidade:</h6>
                            <span className="container-tradutor">
                                <img className="container-tradutor-poup"
                                    src={"http://localhost:8080/files/bandeiras/"+props.bandeira+".png"}
                                    width="50px"
                                    height="30px"

                                />
                                {(props.corFontPoup) ? (<p className="texto-cor-poup">{props.regionalidadePoup}</p>):(<p className="">{props.regionalidadePoup}</p>)}
                            </span>
                        </Col>
                        <Col className="mt-2">
                            {(props.corFontPoup) ? (<h6 className="texto-cor-poup " >Imagem Associativa: </h6>):(<h6 className="texto-detalhesSinalTitulo-poup">Imagem Associativa: </h6>)}
                            <img className="container-tradutor-poup mt-3 mb-3"
                                src={"http://localhost:8080/files/imgAssociativa/" + props.imgAssociativaPoup} width="50px" height="30px" />
                        </Col>
                    </Row>
                    <Row className="texto-sinal-popup">

                    </Row>
                </Container>

                {props.children}

            </div>

        </div>
    ) : ""
}
export default Popups