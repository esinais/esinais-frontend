import './sidebar.css';
import logo from '../assets/esinais.png';
import { Link } from 'react-router-dom';

const Sidebar = ({ handleLogout, sidebarOpen, closeSidebar, perfil, idUsuario }) => {
    const idUsuarioLogado = localStorage.getItem('idUsuario');
    return (perfil === "administrador") ? (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className='sidebar__title'>
                <div className='side__img'>
                    <img src={logo} alt="logo"/>
                    <h1>Sinais</h1>
                </div>

                <i onClick={()=> closeSidebar()}
                   className="fa fa-times"
                   id="sidebarIcon"
                   aria-hidden="true"
                ></i>
            </div>
            <div className='sidebar__menu'>
                <div className="sidebar__link active_menu_link">
                    <i classeName="fa fa-minus-square"></i>
                    <a href="/dashboard">Home</a>
                </div>
                <h2>Sinal</h2>
                <div className="sidebar__link">
                    <i className='fa fa-check'></i>
                    <a href="/autorizarSinal">Autorizar Sinal</a>
                </div>
                <div className="sidebar__link">
                    <i className='fa fa-plus'></i>
                    <a href="/cadastrarSinal">Cadastrar Sinal</a>
                </div>
                <div className="sidebar__link">
                    <i className='fa fa-search'></i>
                    <a href="/buscarSinal">Buscar/Editar Sinal</a>
                </div>

                
                <h2>Pessoas</h2>
                <div className="sidebar__link">
                    <i className='fa fa-user'></i>
                    <a href="/cadastrarUsuario">Cadastrar Usuário</a>
                </div>
                <div className="sidebar__link">
                    <i className='fa fa-search'></i>
                    <a href="/buscarUsuario">Buscas/Editar Usuários</a>
                </div>


                <div className="sidebar__link">
                    <i className='fa fa-file-text'></i>
                    <a href="#">Política e privacidade</a>
                </div>
                <div className="sidebar__logout">
                    <i className='fa fa-power-off'></i>
                    <button type='button' onClick={handleLogout}>Sair</button>
                </div>

            </div>
        </div>
    ) : (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
        <div className='sidebar__title'>
            <div className='side__img'>
                <img src={logo} alt="logo"/>
                <h1>Sinais</h1>
            </div>

            <i onClick={()=> closeSidebar()}
               className="fa fa-times"
               id="sidebarIcon"
               aria-hidden="true"
            ></i>
        </div>
        <div className='sidebar__menu'>
            <div className="sidebar__link active_menu_link">
                <i classeName="fa fa-minus-square"></i>
                <a href="/dashboard">Home</a>
            </div>
            <h2>Sinal</h2>
            <div className="sidebar__link">
                <i className='fa fa-plus'></i>
                <a href="/cadastrarSinal">Cadastrar Sinal</a>
            </div>
            <div className="sidebar__link">
                <i className='fa fa-search'></i>
                <a href="/buscarSinal">Buscar/Editar Sinal</a>
            </div>

            
            <h2>Dados Pessoais</h2>
            <div className="sidebar__link">
                <i className='fa fa-user'></i>
                <a href={"/editarUsuario/"+ idUsuarioLogado}>Alterar dados</a>
            </div>
            <div className="sidebar__link">
                <i className='fa fa-file-text'></i>
                <a href="#">Política e privacidade</a>
            </div>
            <div className="sidebar__logout">
                <i className='fa fa-power-off'></i>
                <button type='button' onClick={handleLogout}>Sair</button>
            </div>

        </div>
    </div>
    )
}

export default Sidebar
