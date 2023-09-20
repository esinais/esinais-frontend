import React, { useContext, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Context } from '../../../Context/AuthContext';
import api from '../../../config/configApi'
import * as yup from 'yup';
import './addSinais.css';
//import Gravar from '../../../Components/Gravar_Video/index';
import Editor from '../../../Components/Video_Editor/VideoEditor';
import AdicionarSinais from '../../../Components/Add-sinais';
import Sidebar from '../../../Components/Sidebar';
import Navbar from '../../../Components/Navbar';
import ModalSucesso from '../../../Components/Modal-success';






export const CadastrarSinal = () => {
    const perfilUsuarioLogado = localStorage.getItem('perfilUsuario');
    const [enderecoSinal, setEnderecoSinal] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [idSinalModal, setIdSinalModal] = useState('');
    const { authenticated, handleLogout } = useContext(Context);
    const history = useHistory(); // navegar entre as páginas

    const openSidebar = () => {
        setSidebarOpen(true);
        
    }
    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    ///parte do código destinada a gravação do vídeo
    const [playing, setPlaying] = useState(false);
    const [tst, setTst] = useState('');
    const HEIGHT = 500;
    const WIDTH = 500;
    //var video = document.getElementsByClassName('app__videoFeed')[0];

    const startVideo = () => {
        let nomeSinal = document.getElementById('nomeSinal').value;

        if (nomeSinal !== "") {

            setPlaying(true);
            navigator.mediaDevices.getUserMedia({ video: true, })
                .then((mediaStream) => {
                    let chunks = [];
                    // Create a new MediaRecorder instance
                    const mediaRecorder = new MediaRecorder(mediaStream);

                    //Make the mediaStream global
                    window.mediaStream = mediaStream;
                    //Make the mediaRecorder global
                    window.mediaRecorder = mediaRecorder;

                    mediaRecorder.start();

                    mediaRecorder.ondataavailable = (e) => {
                        chunks.push(e.data);
                    };
                    mediaRecorder.onstop = () => {
                        const blob = new Blob(chunks, { mimetype: "video/webm;codecs=vp9,opus" });
                        const recordedMedia = document.createElement("video");
                        recordedMedia.controls = true;
                        const recordedMediaURL = URL.createObjectURL(blob);
                        //let gravacao = document.getElementsByClassName('app__videoFeedRecorder')[0];
                        //if (gravacao) {
                        //gravacao.src = recordedMediaURL;

                        setTst(recordedMediaURL);

                        //}
                        let metadata = {
                            lastModified: new Date().getTime(),
                            type: 'video/webm;codecs=vp9,opus'
                        };
                        let arquivo = new File([blob], nomeSinal + ".webm", metadata);
                        setEnderecoSinal(arquivo);


                    };
                    let video = document.getElementsByClassName('app__videoFeed')[0];
                    if (video) {
                        video.srcObject = mediaStream;
                        //console.log(mediaStream)
                    }
                });
        } else {
            alert("Preencher o campo nome primeiro");
        }
    };

    const stopVideo = () => {
        setPlaying(false);
        let video = document.getElementsByClassName('app__videoFeed')[0];
        video.srcObject.getTracks()[0].stop();
        setButtonPopups(false);

        //props.setTrigger(false);
    };

    const exibicaotelaGravar = () => {
        
        return (
            <div className="gravar__video" >
                <div className="gravar__video__container">
                    <video height={HEIGHT} width={WIDTH} muted autoPlay className="app__videoFeed"></video>
                </div>
                <div className="gravar__video__input">
                    {playing ? (
                        <button className='gravar__video__button__Gravando fa fa-stop' onClick={stopVideo}>Gravando</button>
                    ) : (
                        <button className='gravar__video__button fa fa-video-camera' onClick={startVideo}></button>
                        
                    )}
                    <button className='gravar__video__button__Fechar fa fa-window-close' onClick={() => setButtonPopups(false)}></button>

                    {/*<video id="recorded-video" controls className="app__videoFeedRecorder">
                //Your browser doesn't support the video tag
              </video>*/}
                </div>

            </div>
        )

    }
    const exibicaotela = () => {

        return (
            <Editor videoUrl={tst} setVideoUrl={setTst} > </Editor>
        )
    }
    /////////////////////////////////////////////////////////////////

    const [sinal, setSinal] = useState({
        nomeSinal: '',
        //enderecoSinal: '',
        //enderecoImgAssociatival: '',
        classificacaoGramatical: '',
        regiao: '',
        statusSinal: 'ATIVO',
        situacao: 'PENDENTE'
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const [endereco_Img_Associativa, setEnderecoImgAssociativa] = useState('');
    const [buttonPopups, setButtonPopups] = useState(false);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);

    const exibirModalSucesso = () => {
        setMostrarModalSucesso(true);
        
    }
    //recuperando a ID do usuario que foi armazenada no login no localStorage
    const idUsuario = Number(localStorage.getItem('idUsuario'));

    //receber os valores do formulário
    const valueInput = e => setSinal({ ...sinal, [e.target.name]: e.target.value });


    const cadastrarSinal = async e => {
        
        //este comando serve para quando for submter o formulário o navegador não atualizar
        e.preventDefault();
   
        
        /*
         Observação
             - É necessário setar os arquivos direto do INPUT do formulário, não enviar para nenhuma função, pois será gerado um objeto
             - É necessário quando enviar arquivos usar objetos do TIPO FormData, que é o javascript informando que será enviado arquivos do tipo multipart/form-data
             sendo assim, não é necessário acrescentar no formulário
        */
        let tempoInicial = localStorage.getItem('video_tempo_inicial');
        let tempoFinal = localStorage.getItem('video_tempo_final');
        console.log("calc: " + tempoInicial)
        if ((tempoInicial === null) && (tempoFinal === null)) {
            
            tempoInicial = "00:00:00";
            tempoFinal = "00:00:00";
        } else {
            let tempo_inicial = tempoInicial.split('.');
            let tempo_final = tempoFinal.split('.');
            if (Number(tempo_inicial[0]) < 10) {
                tempoInicial = "00:00:0" + tempo_inicial[0];
            } else {
                tempoInicial = "00:00:" + tempo_inicial[0];
            }
            if (Number(tempo_final[0]) < 10) {
                tempoFinal = "00:00:0" + tempo_final[0];
            } else {
                tempoFinal = "00:00:" + tempo_final[0];
            }
        }
        
        if(sinal.regiao === ""){
            sinal.regiao = "nacional";
        }   
        //console.log(sinal.regiao);
        //console.log("Olha como ficou o formato dos cortes: " + tempoInicial + " tempo final: "+tempoFinal)
        const dados = new FormData();
        let classi = "nao-classificado";
        dados.append('nomeSinal', (sinal.nomeSinal).toLocaleLowerCase());
        dados.append('enderecoSinal', enderecoSinal);
        dados.append('enderecoImgAssociativa', endereco_Img_Associativa);
        dados.append('classificacaoGramatical', (classi).toLocaleLowerCase());
        dados.append('regiao', (sinal.regiao).toLocaleLowerCase());
        dados.append('statusSinal', (sinal.statusSinal).toLocaleLowerCase());
        dados.append('situacao', (sinal.situacao).toLocaleLowerCase());
        dados.append('tempoInicial', tempoInicial);
        dados.append('tempoFinal', tempoFinal);

        //if responsável por fazer a validação dos campos no back-end
        if (!(await validate())) return;
        //multipart/form-data
        //application/json
        const headers = {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        //enviar os dados para API do objeto sinal que recebeu os valors do formulário
        await api.post('/sinais/' + idUsuario, dados, headers)
            .then((response) => {

                setStatus({
                    type: 1,
                    message: response.data.message
                });
                console.log(response.data);
                setIdSinalModal(response.data.sinal.id);
                setMostrarModalSucesso(true);

            }).catch((err) => {

                if (err.response) {

                    setStatus({
                        type: err.response.data.status,
                        message: err.response.data.message
                    });
                } else {
                    console.log("Erro tente mais tarde");
                }
            })
    }
    //função responsável por usar a dependência YUP para fazer a validação dos campos
    async function validate() {
        let schema = yup.object().shape({
            situacao: yup.string("Error*: Necessário preencher o campo situação").required("Error: Necessário preencher o campo situação"),
            statusSinal: yup.string("Error: Necessário preencher o campo status Sinal").required("Error: Necessário preencher o campo status Sinal"),
            regiao: yup.string("Error: Necessário preencher o campo região").required("Error: Necessário preencher o campo região"),
            //classificacaoGramatical: yup.string("Error: Necessário preencher o campo Classificação gramatical").required("Error: Necessário preencher o campo Classificação gramatical"),
            //enderecoImgAssociativa: yup.string("Error: Necessário preencher o campo Imagem associativa").required("Error: Necessário preencher o campo Imagem associativa"),
            //enderecoSinal:  yup.object().shape({file: yup.mixed().required('File is required')}),
            nomeSinal: yup.string("Error*: Necessário preencher o campo Nome do Sinal").required("Error*: Necessário preencher o campo Nome do Sinal")

        });

        try {
            await schema.validate({
                nomeSinal: sinal.nomeSinal,
                //enderecoSinal: sinal.enderecoSinal,
                //enderecoImgAssociativa: sinal.enderecoImgAssociativa,
                //classificacaoGramatical: sinal.classificacaoGramatical,
                regiao: sinal.regiao,
                statusSinal: sinal.statusSinal,
                situacao: sinal.situacao

            });
            return true;
        } catch (err) {
            setStatus({
                type: 'error',
                message: err.errors
            });
            return false;
        }
    }
    const [verificador, setVerificador] = useState(2);
    const [rtl, setRtl] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [image, setImage] = useState(true);
    const [toggled, setToggled] = useState(false);
    const [locale, setLocale] = useState('en');

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleRtlChange = (checked) => {
        setRtl(checked);
        setLocale('en');
    };
    const handleImageChange = (checked) => {
        setImage(checked);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };
    {/* 
             <Link to="/dashboard">Dashboard</Link><br />
                <Link to="/usuarios">Usuarios</Link><br />
                <Link to="/cadastrarUsuario">Cadastrar</Link><br />
                <h1>Cadastrar SINAL {verificador}</h1>

                {status.type === 0 ? <p>{status.message}</p> : ""}
                {status.type === 'error' ? <p>{status.message}</p> : ""}
                {status.type === 1 ?
                    <Redirect to={{
                        pathname: '/sinais',
                        state: {
                            type: 1,
                            message: status.message
                        }
                    }} />
                    : ""}

                <form onSubmit={cadastrarSinal} >
                    <label>Nome: </label>
                    <input type="text" name="nomeSinal" id="nomeSinal" placeholder="digite o nome do Sinal" onChange={valueInput} /><br />

                    <label>Imagem do Sinal: </label>
                    <input type="file" name="enderecoSinal" id="enderecoSinal" accept="image/png, image/jpeg, image/gif, video/mp4" onChange={e => setEnderecoSinal(e.target.files[0])} ></input><br />
                    <button type="button" onClick={() => setButtonPopups(true)}>Gravar Video</button>

                    <label>Imagem Associativa: </label>
                    <input type="file" name="enderecoImgAssociativa" accept="image/png, image/jpeg, image/gif" onChange={e => setEnderecoImgAssociativa(e.target.files[0])}></input><br />

                    <label>Classificão Gramatical: </label>
                    <input type="text" name="classificacaoGramatical" placeholder="digite a classificação gramatical" onChange={valueInput} /><br />

                    <label>Região: </label>
                    <input type="text" name="regiao" placeholder="digite a região" onChange={valueInput} /><br />


                    <button type="submit">Cadastrar</button>
                </form>
                {/*<video id="recorded-video" controls className="app__videoFeedRecorder">
            //Your browser doesn't support the video tag
          //</video>}
          
    */}
    
    return (
                

          <div className='container_dashboard'>
            <Navbar 
                sidebarOpen={sidebarOpen} 
                openSidebar={openSidebar} 
            />
            <Sidebar 
                handleLogout={handleLogout} 
                sidebarOpen={sidebarOpen} 
                closeSidebar={closeSidebar} 
                perfil={perfilUsuarioLogado}    
                />
            <AdicionarSinais 
                cadastrarSinal={cadastrarSinal} 
                valueInput={valueInput}
                setEnderecoSinal={setEnderecoSinal}
                setEnderecoImgAssociativa={setEnderecoImgAssociativa} 
                setButtonPopups={setButtonPopups}   
            />
            
             {mostrarModalSucesso ? (
                <ModalSucesso 
                    mostrarModalSucesso={mostrarModalSucesso}
                    setMostrarModalSucesso={setMostrarModalSucesso}
                    message={status.message}
                    controller={'editar'}
                    parametro={idSinalModal}
                    enderecoPagina={'editarSinal'}
                />
            ): ""}
            {buttonPopups ? (exibicaotelaGravar()) : ""}
            {tst ? (exibicaotela()) : ""}


        </div>
    )
}