import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import Etiqueta from './pages/etiqueta';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/etiqueta/:pedido' component={Etiqueta}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;