import './navbar.css';
import avatar from './../assets/avatar.jpg'

const Navbar = ({ sidebarOpen, openSidebar }) => {
    return (
        <nav className="navbarr">
            <div className="navv_icon" onClick={()=> openSidebar()}>
                <i className="fa fa-bars" aria-hidden="true"></i>
                
            </div>
            <div className="navbarr__left">
                <a href="#">Sinais</a>
                <a href="#">Usuários</a>
                <a href="#" className="active_link">Dashboard</a>
            </div>
            <div className="navbarr__right">
                <a href="#">
                    <i className="fa fa-search"></i>
                </a>

                <a href="#">
                    <img width={30} src={avatar} alt="avatar" />
                </a>
            </div>
        </nav>
    )
}

export default Navbar;