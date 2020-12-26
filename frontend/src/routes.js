import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon/Logon';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import NewIncident from './pages/NewIncident/NewIncident';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Logon}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/profile' component={Profile}></Route>
                <Route path='/incidents/new' component={NewIncident}></Route>
            </Switch>
        </BrowserRouter>
    )
}