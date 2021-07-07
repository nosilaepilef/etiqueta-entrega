import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import EtiquetaCpf from "./pages/etiquetacpf";
import { CompareProvider } from "./context/ComparaContext";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <CompareProvider>
          <Route path="/" exact component={Home} />
          <Route path="/etiqueta/:pedido" component={EtiquetaCpf} />
        </CompareProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
