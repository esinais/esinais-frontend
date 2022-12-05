import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';

import { Login } from '../pages/login';
import { Dashboard } from '../pages/Dashboard';
import { Usuarios } from '../pages/Usuarios/ViewAllusers';
import { CadastrarUsuario } from '../pages/Usuarios/AddUsers';
import { EditarUsuario } from '../pages/Usuarios/EditUsers';
import { BuscarUsuario } from '../pages/Usuarios/SearchUsers';
import { Sinais } from '../pages/Sinais/viewAllsinais';
import { CadastrarSinal } from '../pages/Sinais/AddSinais';
import { EditarSinal } from '../pages/Sinais/EditSinais';
import { AutorizarSinal } from '../pages/Sinais/EnableSinais';
import { BuscarSinal } from '../pages/Sinais/SearchSinais';




function CustomRoute({ isPrivate, ...rest }) {
    const { authenticated } = useContext(Context);
    //const navigate = useNavigate();
    
    if (isPrivate && !authenticated) {
        return <Redirect to="/login" />;
    }
    return <Route { ...rest} />
}

export default function RoutesAdm() {
    return (
        <Switch>
            <CustomRoute exact path="/login"  component={Login} />
            <CustomRoute exact isPrivate path="/dashboard" component={Dashboard} />
            <CustomRoute exact isPrivate path="/usuarios" component={Usuarios} />
            <CustomRoute exact isPrivate path="/cadastrarUsuario" component={CadastrarUsuario} />
            <CustomRoute exact isPrivate path="/editarUsuario/:id" component={EditarUsuario} />
            <CustomRoute exact isPrivate path="/buscarUsuario/" component={BuscarUsuario} />
            <CustomRoute exact isPrivate path="/sinais" component={Sinais} />
            <CustomRoute exact isPrivate path="/cadastrarSinal" component={CadastrarSinal} />
            <CustomRoute exact isPrivate path="/editarSinal/:id" component={EditarSinal} />
            <CustomRoute exact isPrivate path="/autorizarSinal/" component={AutorizarSinal} />
            <CustomRoute exact isPrivate path="/buscarSinal/" component={BuscarSinal} />
           
        </Switch>

       
    );
};