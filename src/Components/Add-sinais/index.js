import { useState } from 'react';
import hello from '../assets/esinais.png';
import './add-sinais.css';








const AddSinais = ( { cadastrarSinal, valueInput, setEnderecoSinal, setEnderecoImgAssociativa, setButtonPopups } ) => {

    const [mostrarCampo, setMostrarCampo] = useState(false);
    
    return (

        <main className='addSinais'>
            <div className='addSinais__container'>
                <div className='addSinais__title'>
                    <img src={hello} alt="hello"/>
                    <div className='addSinais_greeting'>
                        <h1>Cadastrar Sinais</h1>
                        <p>* informações obrigatórias</p>
                    </div>
                </div>
                <form onSubmit={cadastrarSinal}>
                    <div className='cardAddSinal'>
                        <div className='alinhar'>
                            <p className='text-primaryyA-p'>Nome Sinal</p>
                            <input className='inputA' id="nomeSinal" type="text" name="nomeSinal" placeholder="digite o nome do Sinal" onChange={valueInput} />
                        </div>
                        <div className='alinhar'>
                            <p className='text-primaryyA-p'>Classificação Gramatical</p>
                            <select className='selectA' onChange={valueInput} name="classificacaoGramatical" id="classificacaoGramatical">
                            <option value="" selected>Selecione:</option>
                                <option value="adjetivo">Adjetivo</option>
                                <option value="numeral">Numeral</option>
                                <option value="substantivo" >Substantivo</option>
                                <option value="verbo">Verbo</option>

                            </select>
                        </div>
                        <div className='alinhar'>
                            <p className='text-primaryyA-p'>Região</p>
                            <select className='selectA' onChange={valueInput} name="regiao" id="regiao">
                            <option value="" selected>Selecione:</option>
                                <option value="acre">Acre (AC)</option>
                                <option value="alagoas" >Alagoas (AL)</option>
                                <option value="amapá">Amapá (AP)</option>
                                <option value="amazonas">Amazonas (AM)</option>
                                <option value="bahia" >Bahia (BA)</option>
                                <option value="ceará">Ceará (CE)</option>
                                <option value="distrito federal">Distrito Federal (DF)</option>
                                <option value="espírito santo" >Espírito Santo (ES)</option>
                                <option value="goiás">Goiás (GO)</option>
                                <option value="maranhão">Maranhão (MA)</option>
                                <option value="mato grosso" >Mato Grosso (MT)</option>
                                <option value="mato grosso do Sul">Mato Grosso do Sul (MS)</option>
                                <option value="minas gerais">Minas Gerais (MG)</option>
                                <option value="pará" >Pará (PA)</option>
                                <option value="paraíba">Paraíba (PB)</option>
                                <option value="paraná">Paraná (PR)</option>
                                <option value="pernambuco" >Pernambuco (PE)</option>
                                <option value="piauí">Piauí (PI)</option>
                                <option value="rio de janeiro">Rio de Janeiro (RJ)</option>
                                <option value="rio grande do norte" >Rio Grande do Norte (RN)</option>
                                <option value="rio grande do sul">Rio Grande do Sul (RS)</option>
                                <option value="rondônia">Rondônia (RO)</option>
                                <option value="roraima">Roraima (RR)</option>
                                <option value="santa catarina">Santa Catarina (SC)</option>
                                <option value="são paulo">São Paulo (SP)</option>
                                <option value="sergipe">Sergipe (SE)</option>
                                <option value="tocantins">Tocantins (TO)</option>
                                <option value="nacional">Nacional (BR)</option>

                            </select>
                        </div>

                        <div className='input-box'>

                        </div>
                        <div className='alinhar'>
                            <p className='text-primaryyA-p'>Fazer Upload do SINAL</p>
                            <input type="radio" id="sim" name="gender" onClick={()=> setMostrarCampo(true)} />
                            <label for="sim">SIM</label>
                            <input type="radio" id="nao" name="gender"  onClick={() => setMostrarCampo(false)}/>
                            <label for="nao">NÃO</label>
                        </div>
                        
                        {mostrarCampo ? (
                            <div className='alinhar'>
                                <p className='text-primaryyA-p'>Upload do Sinal (somente .gif)</p>
                                <input id="imagemSinal" type="file" name="enderecoSinal" accept="image/gif" onChange={e => setEnderecoSinal(e.target.files[0])}></input>
                            </div>
                        ) : (
                            <div className='alinhar'>
                                <p className='text-primaryyA-p'>Gravar Vídeo</p>
                                <button className='buttonGravar' type="button" onClick={() => setButtonPopups(true)}><i className='fa fa-video'></i>Gravar</button>
                            </div>
                        )}
                        <div className='alinhar'>
                                <p className='text-primaryyA-p'>Imagem Associativa</p>
                                <input id="enderecoImgAssociativa" type="file" name="enderecoImgAssociativa" accept="image/png, image/jpeg, image/gif" onChange={e => setEnderecoImgAssociativa(e.target.files[0])} ></input>
                        </div>
                        <div className=''>
                            <button className='buttonCadastrar' type="submit">Cadastrar</button>
                            <button className='buttonLimpar' type="submit">Limpar</button>
                        </div>

                         
                    </div>
                    

                    

                </form>

            </div>
        </main>

    );
}
export default AddSinais;