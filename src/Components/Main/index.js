import hello from '../assets/esinais.png';
import Chart from '../assets/esinais.png';
import './main.css';

const Main = (props) =>{
    return (
        <main>
            <div className='main__container'>
                <div className='main__title'>
                    <img src={hello} alt="hello"/>
                    <div className='main_greeting'>
                        <h1 className='main__greeting_h1'>Olá, {props.nomeUsuario}!</h1>
                        <p className='main__greeting_p'>Bem vindo ao seu painel</p>
                    </div>
                </div>
                <div className='main__cardsM'>
                    <div className='cardM'>
                        <i className='fa fa-file-text fa-2x text-lightblue'></i>
                        <div className='cardM_inner'>
                            <p className='text-primary-p'>Sinais pendentes de autorização</p>
                            <span className='font-bold text-title'>{props.sinaisPendentes}</span>
                        </div>
                    </div>
                    <div className='cardM'>
                        <i className='fa fa-database fa-2x text-red'></i>
                        <div className='cardM_inner'>
                            <p className='text-primary-p'>Total geral de Sinais cadastrados</p>
                            <span className='font-bold text-title'>{props.sinaisTotais}</span>
                        </div>
                    </div>
                    <div className='cardM'>
                        <i className='fa fa-archive fa-2x text-yellow'></i>
                        <div className='cardM_inner'>
                            <p className='text-primary-p'>Contribuições</p>
                            <span className='font-bold text-title'>{props.contribuicoes}</span>
                        </div>
                    </div>
                    <div className='cardM'>
                        <i className='fa fa-bars fa-2x text-green'></i>
                        <div className='cardM_inner'>
                            <p className='text-primary-p'>Colocação</p>
                            <span className='font-bold text-title'>40</span>
                        </div>
                    </div>
                </div>

                <div className='charts'>
                    <div className='charts__left'>
                        <div className='charts__left__title'>
                            <div>
                                <h1>Quantidade de Sinais cadastrados</h1>
                                <p>Mensal</p>
                            </div>
                            <i className='fa fa-usd'></i>
                        </div>
                        
                    </div>

                    <div className='charts__right'>
                        <div className='charts__right__title'>
                            <div>
                                <h1 className='charts__right__title_div_h1'>Classificações gramaticais</h1>
                                <p className='charts__right__title_div_p'>Quantidade de sinais cadastradas no sistemas</p>
                            </div>
                            <i className='fa fa-area-chart'></i>
                        </div>
                        
                        <div className='charts__right__cardsM'>
                            <div className='cardM1'>
                                <h1 className='charts__right__title_div_h1_card1'>Verbos</h1>
                                <p className='charts__right__title_div_p'>{props.verbos}</p>
                            </div>
                            <div className='cardM2'>
                                <h1 className='charts__right__title_div_h1_card2'>Substantivos</h1>
                                <p className='charts__right__title_div_p'>{props.substantivo}</p>
                            </div>
                            <div className='cardM3'>
                                <h1 className='charts__right__title_div_h1_card3'>Numeral</h1>
                                <p className='charts__right__title_div_p'>{props.numeral}</p>
                            </div>
                            <div className='cardM4'>
                                <h1 className='charts__right__title_div_h1_card4'>Adjetivos</h1>
                                <p className='charts__right__title_div_p'>{props.adjetivo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Main;

