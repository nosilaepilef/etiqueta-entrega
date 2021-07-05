import React, {createContext, useEffect, useState} from "react";
import { useParams } from "react-router";
import api from "../services/Api";

export const ComparaContext = createContext({});

export function CompareProvider({children}) {

  function pedidos (pedido) {
    return api.post("/pedido", { pedido }).then((r) => r.data);
  }

  return (
    <ComparaContext.Provider 
      value={{ pedidos }}
    >
    {children}
    </ComparaContext.Provider>
  )
}