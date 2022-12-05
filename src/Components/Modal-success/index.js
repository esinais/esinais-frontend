import React, { useState } from 'react';
//import './modal-excluir.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Sucesso({ mostrarModalSucesso, setMostrarModalSucesso, message, controller, parametro, enderecoPagina }) {
    //const [mostrar, setMostrar] = useState(true);
    const handleFechar = () => setMostrarModalSucesso(false);
    //const handleMostrar = () => setMostrarModalExcluir(true);
   
    console.log("Estou recebendo no modal: " + controller);
    return (
        <div className="">
            <div className="">
                <Modal show={mostrarModalSucesso} onHide={handleFechar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Atenção!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{message}</Modal.Body>
                    <Modal.Footer>
                        
                        {controller === "editar" ? (
                            <a href={"/"+enderecoPagina+"/"+parametro} ><button className='buttonEditar' type="submit">OK</button></a>
                        ):(
                            <a href={"/"+enderecoPagina+"/"} ><button className='buttonEditar' type="submit">OK</button></a>    
                        )}
                        
                        
                    </Modal.Footer>
                </Modal>
            </div>

           

        </div>
    );

    
}
export default Sucesso;