import React, { useState } from 'react';
//import './modal-excluir.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NaoEncontrado({ mostrarModalNaoEncontrado, setMostrarModalNaoEncontrado, message }) {
    //const [mostrar, setMostrar] = useState(true);
    const handleFechar = () => setMostrarModalNaoEncontrado(false);
    //const handleMostrar = () => setMostrarModalExcluir(true);
  

    return (
        <div className="">
            <div className="">
                <Modal show={mostrarModalNaoEncontrado} onHide={handleFechar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Atenção!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{message}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleFechar}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

           

        </div>
    );

    
}
export default NaoEncontrado;