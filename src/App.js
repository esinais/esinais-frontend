import React from 'react';
import { Router } from 'react-router-dom';
import Rotas from './routes/routesAdm';
import history from './services/history';


 
import { AuthProvider } from './Context/AuthContext';
 
function App() {
    return (
        <div>
            
            <AuthProvider>
                <Router history={history}>
                <Rotas />
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;