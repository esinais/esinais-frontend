import React, { useState } from 'react';
import './modal-excluir.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Excluir({ mostrarModalExcluir, setMostrarModalExcluir, setConfirmarExcluir  }) {
    
    const handleFechar = () => setMostrarModalExcluir(false);
    //const handleMostrar = () => setMostrarModalExcluir(true);
    const handleConfirmacao = () => {
        setMostrarModalExcluir(false)
        setConfirmarExcluir(true)
    }

    return (
        <div className="">
            <div className="">
                <Modal show={mostrarModalExcluir} onHide={handleFechar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Atenção!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja realmente excluir este registro?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" onClick={handleConfirmacao}>
                            SIM
                        </Button>
                        <Button variant="secondary" onClick={handleFechar}>
                            NÃO
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

           

        </div>
    );

    
}
export default Excluir