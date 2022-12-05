import { useState } from 'react';
import hello from '../assets/esinais.png';
import './edit-sinais.css';
import ModalExcluir from '../Modal-Excluir';








const EditSinal = ( { editarSinal, deletarSinal, nomeSinal, classificacaoGramatical, 
                        regiao, statusSinal, situacao, setEnderecoSinal, setButtonPopups,
                        enderecoImgAssociativaTemp, enderecoSinalTemp,
                        setNomeSinal, setClassificacaoGramatical, setRegiao, setEnderecoImgAssociativa,
                        setStatusSinal, setSituacao, perfil
                    } ) => {
    //console.log(enderecoSinalTemp);
    const [mostrarCampoGravar, setMostrarCampoGravar] = useState(false);
    const [mostrarCampoUpload, setMostrarCampoUpload] = useState(false);
    const [mostrarCampoUploadaGravar, setMostrarCampoUploadaGravar] = useState(false);
    const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
    const [confirmarExcluir, setConfirmarExcluir] = useState(false);

    const ocultarCampos1 = () => {
        setMostrarCampoGravar(true);
        setMostrarCampoUpload(false);
    }
    const ocultarCampos2 = () => {
        setMostrarCampoGravar(false);
        setMostrarCampoUpload(true);
    }
    const exibicaoModalExcluir = () => {
        return (
            <ModalExcluir
                mostrarModalExcluir={mostrarModalExcluir}
                setMostrarModalExcluir={setMostrarModalExcluir}
                setConfirmarExcluir={setConfirmarExcluir}         

             />
        )
    }
    
    
    return (

        <main className='EditSinal'>
            <div className='EditSinal__container'>
                <div className='EditSinal__title'>
                    <img src={hello} alt="hello"/>
                    <div className='EditSinal_greeting'>
                        <h1>Editar Sinal</h1>
                        <p>* informações obrigatórias</p>
                    </div>
                </div>
                <form onSubmit={editarSinal}>
                    <div className='cardEditSinal'>
                        <div className='alinharE'>
                            <p className='text-primaryyE-p'>Nome Sinal</p>
                            <input className='inputE' id="nomeSinal" type="text" name="nomeSinal" value={nomeSinal}  placeholder="digite o nome do Sinal" onChange={text => setNomeSinal(text.target.value)} />
                        </div>
                        <div className='alinharE'>
                            <p className='text-primaryyE-p'>Classificação Gramatical</p>
                            <select className='selectE' value={classificacaoGramatical} onChange={text => setClassificacaoGramatical(text.target.value)} name="classificacaoGramatical" id="classificacaoGramatical">
                                <option value="adjetivo">Adjetivo</option>
                                <option value="numeral">Numeral</option>
                                <option value="substantivo" >Substantivo</option>
                                <option value="verbo">Verbo</option>
                            </select>
                        </div>
                        <div className='alinharE'>
                            <p className='text-primaryyE-p'>Região</p>
                            <select className='selectE' value={regiao} onChange={text => setRegiao(text.target.value)} name="regiao" id="regiao">
                            
                                <option value="acre">Acre (AC)</option>
                                <option value="alagoas" >Alagoas (AL)</option>
                                <option value="amapá">Amapá (AP)</option>
                                <option value="amazonas">Amazonas (AM)</option>
                                <option value="bahia" >Bahia (BA)</option>
                                <option value="ceara">Ceará (CE)</option>
                                <option value="distrito Federal">Distrito Federal (DF)</option>
                                <option value="espirito Santo" >Espírito Santo (ES)</option>
                                <option value="goias">Goiás (GO)</option>
                                <option value="maranhao">Maranhão (MA)</option>
                                <option value="mato grosso" >Mato Grosso (MT)</option>
                                <option value="mato grosso do sul">Mato Grosso do Sul (MS)</option>
                                <option value="minas gerais">Minas Gerais (MG)</option>
                                <option value="para" >Pará (PA)</option>
                                <option value="paraiba">Paraíba (PB)</option>
                                <option value="parana">Paraná (PR)</option>
                                <option value="pernambuco" >Pernambuco (PE)</option>
                                <option value="piaui">Piauí (PI)</option>
                                <option value="rio de janeiro">Rio de Janeiro (RJ)</option>
                                <option value="rio grande do norte" >Rio Grande do Norte (RN)</option>
                                <option value="rio grande do sul">Rio Grande do Sul (RS)</option>
                                <option value="rondonia">Rondônia (RO)</option>
                                <option value="roraima">Roraima (RR)</option>
                                <option value="santa catarina">Santa Catarina (SC)</option>
                                <option value="sao paulo">São Paulo (SP)</option>
                                <option value="sergipe">Sergipe (SE)</option>
                                <option value="tocantins">Tocantins (TO)</option>
                                <option value="nacional">Nacional (BR)</option>
                            </select>
                        </div>
                        <div className='alinharE'>
                            <p className='text-primaryyE-p'>Status Sinal</p>
                            {perfil === "administrador" ? (
                                <select className='selectE' value={statusSinal} onChange={text => setStatusSinal(text.target.value)} name="statusSinal" id="statusSinal">
                                    <option value="ativado">Ativado</option>
                                    <option value="desativado">Desativado </option>
                                </select>
                          
                            ):(
                                <select className='selectE' value={statusSinal} onChange={text => setStatusSinal(text.target.value)} name="statusSinal" id="statusSinal" disabled>
                                    <option value="ativado">Ativado</option>
                                    <option value="desativado">Desativado </option>
                                </select>
                            )}
                            </div>
                        <div className='alinharE'>
                            <p className='text-primaryyE-p'>Situação</p>
                            {perfil === "administrador" ? (
                                <select className='selectE' value={situacao} onChange={text => setSituacao(text.target.value)} name="situacao" id="situacao">
                                    <option value="aprovado">Aprovado</option>
                                    <option value="pendente">Pendente </option>
                                    <option value="reprovado">Reprovado </option>
                                </select>
                            ):(
                                <select className='selectE' value={situacao} onChange={text => setSituacao(text.target.value)} name="situacao" id="situacao" disabled>
                                    <option value="aprovado">Aprovado</option>
                                    <option value="pendente">Pendente </option>
                                    <option value="reprovado">Reprovado </option>
                                </select>
                            )}

                        </div>
                        <div className='alinharEimg'>
                            <p className='text-primaryyE-p'>Sinal</p>
                            <img src={"http://localhost:8080/files/sinais/" + enderecoSinalTemp} alt="sinal" height={200} width={180}/>
                            <br />
                            <button className='buttonCadastrarE' type="button" onClick={()=> setMostrarCampoUploadaGravar(true)}>Alterar</button>
                        </div>
                        <div className='alinharEimg'>
                            <p className='text-primaryyE-p'>Imagem Associativa</p>
                            <img src={"http://localhost:8080/files/imgAssociativa/" + enderecoImgAssociativaTemp} alt="imagem Associativa" height={200} width={180}/>
                            <br />
                            <label for="enderecoImgAssociativa" className='buttonAlterarLabel'>Alterar</label>
                            <input id="enderecoImgAssociativa" className='esconder' type="file" name="enderecoImgAssociativa" accept="image/png, image/jpeg, image/gif" onChange={e => setEnderecoImgAssociativa(e.target.files[0])} ></input>
                        </div>

                        <div className='input-box'>

                        </div>
                        {mostrarCampoUploadaGravar ? (
                            <div className='alinharE'>
                            <p className='text-primaryyE-p'>Marque a opção para editar o sinal</p>
                            <input type="radio" id="Gravar" name="gender" onClick={ocultarCampos1} />
                            <label for="Gravar">Gravar sinal</label>
                            <input type="radio" id="Upload" name="gender"  onClick={ocultarCampos2}/>
                            <label for="Upload">Upload do sinal</label>
                        </div>  
                        ): ""}
                        
                        
                        {mostrarCampoGravar ? (
                            
                            <div className='alinharE'>
                            
                                <p className='text-primaryyE-p'>Gravar Vídeo</p>
                                <button className='buttonGravar' type="button" onClick={() => setButtonPopups(true)}><i className='fa fa-video'></i>Gravar</button>
                            </div>
                        ) : ""}
                        {mostrarCampoUpload ? (

                            <div className='alinharE'>
                            
                                <p className='text-primaryyE-p'>Upload do Sinal (somente .gif)</p>
                                <input id="imagemSinal" type="file" name="enderecoSinal" accept="image/png, image/jpeg, image/gif, video/mp4" onChange={e => setEnderecoSinal(e.target.files[0])}></input>
                            </div>
                        ) : ""}
                      
                        <div className=''>
                            <button className='buttonCadastrarE' type="submit">Salvar</button>
                            {perfil === "administrador" ? (
                                <button className='buttonExcluirE' type="button" onClick={()=> setMostrarModalExcluir(true)}>Excluir</button>
                            ):""}
                        </div>
                        {mostrarModalExcluir ? (exibicaoModalExcluir()):"" }
                        {confirmarExcluir ? (deletarSinal()): ""}
                    </div>
                    

                    

                </form>

            </div>
        </main>

    );
}
export default EditSinal;