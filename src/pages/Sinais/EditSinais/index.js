import React, { useEffect, useState, useContext } from "react";
import { useHistory, Redirect } from 'react-router-dom';
import { Context } from '../../../Context/AuthContext';
import api from '../../../config/configApi';
import './editSinal.css';
import Gravar from '../../../Components/Gravar_Video/index';
import Editor from '../../../Components/Video_Editor/VideoEditor';
import Sidebar from '../../../Components/Sidebar';
import Navbar from '../../../Components/Navbar';
import EditSinal from "../../../Components/Edit-sinais";
import ModalSucesso from "../../../Components/Modal-success";


//props é uma p´ropriedade para receber a informação da URL
export const EditarSinal = (props) => {
    const perfilUsuarioLogado = localStorage.getItem('perfilUsuario');
    const history = useHistory(); // navegar entre as páginas
    const [enderecoSinal, setEnderecoSinal] = useState('');
    const [buttonPopups, setButtonPopups] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { authenticated, handleLogout } = useContext(Context);
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
    const [sinal, setSinal] = useState({
        nomeSinal: '',
        //enderecoSinal: '',
        //enderecoImgAssociatival: '',
        classificacaoGramatical: '',
        regiao: '',
        statusSinal: '',
        situacao: ''
    });
    
    //receber os valores do formulário
    const valueInput = e => setSinal({ ...sinal, [e.target.name]: e.target.value });
    
    const openSidebar = () => {
        setSidebarOpen(true);
        console.log("entrei aqwui")
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
                        console.log("nomeSinal");
                        console.log(nomeSinal);
                        let arquivo = new File([blob], nomeSinal+".webm", metadata);
                        setEnderecoSinal(arquivo);


                    };
                    let video = document.getElementsByClassName('app__videoFeed')[0];
                    if (video) {
                        video.srcObject = mediaStream;
                        //console.log(mediaStream)
                    }
                });
        } else{
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
                <div className="gravar__video__inputt">
                    {playing ? (
                        <button className='gravar__video__button' onClick={stopVideo}>Stop</button>
                    ) : (
                        <button className='gravar__video__button' onClick={startVideo}>Start</button>
                    )}
                    <button className='gravar__video__button__Fechar' onClick={() => setButtonPopups(false)}>Fechar</button>

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


    //constantes referentes a cada campo do formulário
    const [nomeSinal, setNomeSinal] = useState('');
    const [enderecoImgAssociativa, setEnderecoImgAssociativa] = useState('');
    const [classificacaoGramatical, setClassificacaoGramatical] = useState('');
    const [regiao, setRegiao] = useState('');
    const [statusSinal, setStatusSinal] = useState('');
    const [situacao, setSituacao] = useState('');
    const [enderecoSinalTemp, setEnderecoSinalTemp] = useState('');
    const [enderecoImgAssociativaTemp, setEnderecoImgAssociativaTemp] = useState('');
    const [teste, setTeste] = useState(false);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const redirecionarTela = () => {
        console.log("Entrei aqui");
        history.push("/buscarSinal");
    }

    

    //recebendo a ID vinda da URL
    const [id] = useState(props.match.params.id)

    const token = localStorage.getItem('token');
    
    const deletarSinal = async e => {
        console.log("aquiiii" + id);
        //e.preventDefault();
        e.preventDefault();
        const headers = {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " +localStorage.getItem('token')
            }
        }
        ///sinais/:id_sinal
        
        await api.delete('/sinais/'+id, headers)
        .then((response) =>{
            setStatus({
                type:1,
                message: response.data.message
            });
            console.log(response.data.message);
            setMostrarModalSucesso(true);
            
            
        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type:'error',
                    message: err.response.data.message
                });
            }else{
                console.log("Erro tente mais tarde");
            }   
        })
    }
    const editarSinal = async e => {
        e.preventDefault();
        console.log(enderecoImgAssociativa);

        let tempoInicial = localStorage.getItem('video_tempo_inicial');
        let tempoFinal = localStorage.getItem('video_tempo_final');
        console.log(tempoFinal);
        if((tempoInicial == null) && (tempoFinal == null)){
            tempoInicial = "00:00:00";
            tempoFinal = "00:00:00";
        }else{
            let tempo_inicial = tempoInicial.split('.');
            let tempo_final = tempoFinal.split('.');
            if(Number(tempo_inicial[0]) < 10){
                tempoInicial = "00:00:0"+tempo_inicial[0];
            } else{
                tempoInicial = "00:00:"+tempo_inicial[0];
            }
            if(Number(tempo_final[0]) < 10){
                tempoFinal = "00:00:0"+tempo_final[0];
            }else{
                tempoFinal = "00:00:"+tempo_final[0];
            }
        }
        
        const dados = new FormData();
        dados.append('nomeSinal', (nomeSinal).toLocaleLowerCase());
        dados.append('enderecoSinal', enderecoSinal);
        dados.append('enderecoImgAssociativa', enderecoImgAssociativa);
        dados.append('classificacaoGramatical', classificacaoGramatical);
        dados.append('regiao', regiao);
        dados.append('statusSinal', statusSinal);
        dados.append('situacao', situacao);
        dados.append('tempoInicial', tempoInicial);
        dados.append('tempoFinal', tempoFinal);

        const headers = {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " +localStorage.getItem('token')
            }
        }
        
        //enviar os dados para API das constantes que recebeu os valors do formulário
        await api.put('/sinais/'+2+"/"+id, dados, headers)
        .then((response) =>{
            setStatus({
                type:1,
                message: response.data.message
            });
            setMostrarModalSucesso(true);
            //console.log(response.data.message);
        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type:'error',
                    message: err.response.data.message
                });
            }else{
                console.log("Erro tente mais tarde");
            }   
        })
    }

    //executar somente quando o ID for atualizado
    useEffect(()=> {
        const getSinal = async () => {
            const headers = {
                'headers': {
                    'Authorization': `Bearer ${(token)}`
                }
            }

            /*Essa rota funciona com parâmentro 1 - ID 2 - nome etc - Verificar na API*/
            await api.get("/sinais/"+8+"/"+id+"/"+1, headers)
            .then ((response) => {
                //setantando as informações vindas a API
                setNomeSinal(response.data.sinais[0].nomeSinal);
                setEnderecoSinalTemp(response.data.sinais[0].enderecoSinal);
                setEnderecoImgAssociativaTemp(response.data.sinais[0].enderecoImgAssociativa);
                setClassificacaoGramatical(response.data.sinais[0].classificacaoGramatical);
                setRegiao(response.data.sinais[0].regiao);
                setStatusSinal(response.data.sinais[0].statusSinal);
                setSituacao(response.data.sinais[0].situacao);
            }).catch((err) =>{
                if(err.response){
                    //Type e message são oriundas do retorno da API quando apresenta o erro 0
                    setStatus({
                        type: err.response.data.status,
                        message: err.response.data.message
                    })
            
                } else{
                    //entra aqui se API estiver offline
                    setStatus({
                        type: 'error',
                        message: "Erro tente mais tarde!"
                    })
                }
            })
        }
        getSinal();
    },[id])

        {
            /*<Link to="/dashboard">Dashboard</Link><br />
            <Link to="/sinais">Usuarios</Link><br />

     

            <h1>Editar Sinal</h1>
            
            {status.type === 1 ? <p>{status.message}</p>:""}
            {status.type === 51 ? 
            <Redirect to={{
                pathname: '/sinais',
                state: {
                    type: status.type,
                    message: status.message
                }
            }}/> : ""}
            {status.type === 52 ? 
            <Redirect to={{
                pathname: '/sinais',
                state: {
                    type: status.type,
                    message: status.message
                }
            }}/> : ""}
            {/*data.map(usuarios => (
                <div key={usuarios.id}>
                    <span>{usuarios.id}</span><br />
                    <span>{usuarios.nome}</span><br />
                    <span>{usuarios.email}</span><br />
                </div>
            ))*/
            /*<form onSubmit={editarSinal}>
                
                <label>Nome: </label>
                <input type="text" name="nomeSinal" placeholder="" value={nomeSinal} onChange={text => setNomeSinal(text.target.value)} /><br />

                <img src={"http://localhost:8080/files/sinais/" + enderecoSinalTemp} alt="Imagem do sinal" width="150px" height="150px" /><br />
                <label>Alterar Sinal: </label>
                <input type="file" name="enderecoSinal" accept="image/png, image/jpeg, image/gif" onChange={e => setEnderecoSinal(e.target.files[0])} ></input><br /><br />
                <button type="button" onClick={() => setButtonPopups(true)}>Gravar Video</button>


                <img src={"http://localhost:8080/files/imgAssociativa/" + enderecoImgAssociativaTemp} alt="Imagem do sinal" width="150px" height="150px" /><br />
                <label>Alterar imagem Associativa: </label>
                <input type="file" name="enderecoImgAssociativa" accept="image/png, image/jpeg, image/gif" onChange={e => setEnderecoImgAssociativa(e.target.files[0])}></input><br /><br />
                
                <label>Classificacao Gramatical: </label>
                <input type="text" name="classificação Gramatical" placeholder="" value={classificacaoGramatical} onChange={text => setClassificacaoGramatical(text.target.value)} /><br />

                <label>Região: </label>
                <input type="text" name="regiao" placeholder="" value={regiao} onChange={text => setRegiao(text.target.value)} /><br />

                <label>Status Sinal: </label>
                <input type="text" name="statusSinal" placeholder="" value={statusSinal} onChange={text => setStatusSinal(text.target.value)} /><br />

                <label>Situação: </label>
                <input type="text" name="situacao" placeholder="" value={situacao} onChange={text => setSituacao(text.target.value)} /><br />
                
                <button type="submit">Salvar</button>
            </form>*/
        }
    
    return(

            
           
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
                <EditSinal 
                    nomeSinal={nomeSinal}
                    classificacaoGramatical={classificacaoGramatical}
                    regiao={regiao}
                    enderecoSinalTemp={enderecoSinalTemp}
                    enderecoImgAssociativaTemp={enderecoImgAssociativaTemp}
                    statusSinal={statusSinal}
                    situacao={situacao}
                    setClassificacaoGramatical={setClassificacaoGramatical}
                    setRegiao={setRegiao}
                    setNomeSinal={setNomeSinal}
                    editarSinal={editarSinal}
                    setEnderecoImgAssociativa={setEnderecoImgAssociativa}
                    setEnderecoSinal={setEnderecoSinal}
                    setButtonPopups={setButtonPopups}
                    setStatusSinal={setStatusSinal}
                    setSituacao={setSituacao}
                    deletarSinal={deletarSinal}
                    perfil={perfilUsuarioLogado}

                />
        
            {buttonPopups ? (exibicaotelaGravar()) : ""}
            {tst ? (exibicaotela()) : ""}
            
            {mostrarModalSucesso ? (
                <ModalSucesso 
                    mostrarModalSucesso={mostrarModalSucesso}
                    setMostrarModalSucesso={setMostrarModalSucesso}
                    message={status.message}
                    controller={'buscarSinal'}
                    parametro={"0"}
                    enderecoPagina={'buscarSinal'}
                />
            ): ""}

            </div>
            
    )
}