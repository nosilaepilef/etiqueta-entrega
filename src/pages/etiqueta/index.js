import React, { useEffect, useState } from "react";
import "./index.css";
import Logo from "../../assets/logo_grafitte.svg";
import { useParams } from "react-router-dom";
import Api from "../../services/Api"
import mask from "../../utils/mask";

function Etiqueta({ match }) {
  const id = useParams();

  const pedido = id.pedido;
  const [etiqueta, setEtiqueta] = useState("");

  useEffect(() => {
    Api.post("/pedido", { pedido }).then(r => setEtiqueta(r.data))
  }, [pedido])

  console.log(etiqueta.pedido)
  console.log(pedido)
  
  return (
    <div className="container--pai">
      <div className="container--corte">
        <div className="traco--corte">
          <div className="corte rb"></div>
          <div className="corte lb"></div>
        </div>

        <div className="container--linha">
          <div className="container--etiqueta">
            <div className="remetente">
              <div className="logo--g">
                <img src={Logo} alt={Logo} />
              </div>

              <div className="dados--remetente">
                <h3>Loja Várzea Grande</h3>
                <p>
                  Av. Couto Magalhães, 1889, Centro-Norte, Várzea Grande - CEP:
                  78110400
                </p>
              </div>
            </div>

            <div className="linha--h">
              <div className="titles de">
                <span className="iconify" data-icon="carbon:delivery-parcel"></span>
                <h3>Detalhes da Entregas</h3>
              </div>
            </div>

            <div className="dados--destinatario">
              <div className="dados--de">
                <span>Enviar pedido via:</span>
                <p>
                  <strong>{
                    etiqueta.pedido ? 
                    etiqueta.pedido.enviado === 'ELG' ? 
                    'Entrega - Lojas Grafitte - ELG' :
                    etiqueta.pedido.enviado === 'RLGV' ? 
                    'Retirar - Loja Várzea Grande - RLGV' :
                    etiqueta.pedido.enviado === 'RLGC' ? 
                    'Retirar - Loja Cuiabá Coxipó - RLGC' : null: 'Sem Registro!'
                  }</strong>
                </p>
              </div>

              <div className="dados--de">
                <span>NP - (Número de pedido):</span>
                <p>
                  <strong className="red">#{etiqueta.pedido ? etiqueta.pedido.codigoPedido : 'Sem registro!'}</strong>
                </p>
              </div>
            </div>

            <div className="linha--h">
              <div className="titles de">
                <span
                  className="iconify"
                  data-icon="bx:bx-user-circle"
                  data-inline="false"
                ></span>
                <h3>Dados do Cliente</h3>
              </div>
            </div>

            <div className="dados--destinatario">
              <div className="dados--de">
                <span>Nome:</span>
                <p><strong>{etiqueta.client ? etiqueta.client.nome : "Sem Registro"}</strong></p>
              </div>

              <div className="dados--de">
                <span>CPF:</span>
                <p><strong>{etiqueta.client ? mask.cpfMask(etiqueta.client.cpf) : "Sem Registro"}</strong></p>
              </div>

              <div className="dados--de">
                <span>E-mail:</span>
                <p><strong>{etiqueta.client ? etiqueta.client.email : "Sem Registro"}</strong></p>
              </div>

              <div className="dados--de">
                <span>Celular:</span>
                <p><strong>{etiqueta.client ? mask.celularMask(etiqueta.client.celular) : "Sem Registro"}</strong></p>
              </div>
            </div>

            <div className="linha--h">
              <div className="titles">
                <span
                  className="iconify"
                  data-icon="feather:map-pin"
                  data-inline="false"
                ></span>
                <h3>Endereço de Entrega</h3>
              </div>
            </div>

            <div className="dados--destinatario">
              <div className="dados--de">
                <span>Endereço:</span>
                <p><strong>{etiqueta.entrega ? etiqueta.entrega.endereco : "Sem Registro"}</strong></p>
              </div>

              <div className="dados--de">
                <span>Número:</span>
                <p><strong>{etiqueta.entrega ? etiqueta.entrega.numero < 10 ? `0${etiqueta.entrega.numero}` : etiqueta.entrega.numero: "Sem Registro"}</strong></p>
                <span>Bairro:</span>
                <p><strong>{etiqueta.entrega ? etiqueta.entrega.bairro : "Sem Registro"}</strong></p>
              </div>

              <div className="dados--de">
                <span>Cidade:</span>
                <p><strong>{etiqueta.entrega ? etiqueta.entrega.cidade : "Sem Registro"}</strong></p>
                <span>Estado:</span>
                <p><strong>{etiqueta.entrega ? etiqueta.entrega.estado : "Sem Registro"}</strong></p>
              </div>

              <div className="dados--de">
                <span>CEP:</span>
                <p><strong>{etiqueta.entrega ? mask.cepMask(etiqueta.entrega.cep) : "Sem Registro"}</strong></p>
              </div>

              <div className="dados--de">
                
                <p className="cto">Complemento: <strong>{etiqueta.entrega ? etiqueta.entrega.complemento : "Sem Registro"}</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="traco--corte">
          <div className="corte rt"></div>
          <div className="corte lt"></div>
        </div>
      </div>
    </div>
  );
}

export default Etiqueta;
