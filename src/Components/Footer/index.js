import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer, CDBBox } from 'cdbreact';
import logo from './imagens/esinais.png';
function Footer() {
    return (
        <CDBFooter className="shadow" color="black">
            <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }} color="black">
                <CDBBox display="flex" justifyContent="between" className="flex-wrap">
                    <CDBBox color="black">
                        <a href="/" className="d-flex align-items-center p-0 text-dark">
                            <img alt="logo" src={logo} width="30px" />
                            <span className="ml-3 h5 font-weight-bold">Sinais</span>
                        </a>
                        <p className="my-3" style={{ width: '250px' }}>
                            Software Educacional de tradução de Língua Portuguesa para a Língua Brasileira de Sinais - LIBRAS
                        </p>
                    </CDBBox>
                    <CDBBox>
                        <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                            e-sinais
                        </p>
                        <CDBBox flex="column" display="flex" style={{ cursor: 'pointer', padding: '0' }}>
                            <CDBFooterLink href="/">Políticas e Privacidade</CDBFooterLink>
                            <CDBFooterLink href="/">Sobre</CDBFooterLink>
                            <CDBFooterLink href="/">Contato</CDBFooterLink>
                            <CDBFooterLink href="/">Blog</CDBFooterLink>
                        </CDBBox>
                    </CDBBox>
                    <CDBBox>
                        <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                            Ajuda
                        </p>
                        <CDBBox display="flex" flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                            <CDBFooterLink href="/">Suporte</CDBFooterLink>
                            <CDBFooterLink href="/">Cadastro</CDBFooterLink>
                            <CDBFooterLink href="/">Login</CDBFooterLink>
                        </CDBBox>
                    </CDBBox>
                    <CDBBox>
                        <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                            Sugestões
                        </p>
                        <CDBBox display="flex" flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                            <CDBFooterLink href="/">Enviar sugestão</CDBFooterLink>
                            <CDBFooterLink href="/">Acompanhar</CDBFooterLink>
                            
                        </CDBBox>
                    </CDBBox>
                </CDBBox>
                <CDBBox
                    display="flex"
                    justifyContent="center"
                    style={{ width: '100%' }}
                    className="mx-auto mt-4"
                >
                    <CDBBtn flat color="dark" className="p-2">
                        <CDBIcon fab icon="facebook-f" />
                    </CDBBtn>
                    <CDBBtn flat color="dark" className="mx-3 p-2">
                        <CDBIcon fab icon="twitter" />
                    </CDBBtn>
                    <CDBBtn flat color="dark" className="p-2">
                        <CDBIcon fab icon="instagram" />
                    </CDBBtn>
                </CDBBox>
                <small className="text-center mt-5">&copy; e-sinais, 2022. All rights reserved.</small>
            </CDBBox>
        </CDBFooter>

    );
}

export default Footer;