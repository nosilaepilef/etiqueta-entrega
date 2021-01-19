import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Logo from "../../assets/logo_grafitte.svg";
import { IoMdSearch } from "react-icons/io";
import Api from "../../services/Api";
import mask from '../../utils/mask'

function Home() {
  const [pedido, setPedido] = useState("")
  const [dados, setDados] = useState('')
  function handlerSubmit(e){
    e.preventDefault()
    Api.post("/pedido", {pedido}).then(r => setDados(r.data))
  }

  return (
    <>
      <nav className="container--menu">
        <div className="menu--pai">
          <div className="logo--pai">
            <a href="https://www.lojasgrafitte.com.br/">
              <img src={Logo} alt={Logo} />
            </a>
          </div>
          <div className="pesquisa--id">
            <form onSubmit={e=> handlerSubmit(e)}>
              <input 
                placeholder="Pesquisar pelo ID do pedido"
                type="text"
                value={pedido}
                onChange={e => setPedido(e.target.value)}
              />

              <button title="Pesquisar">
                <IoMdSearch />
              </button>
            </form>
          </div>
        </div>
      </nav>
      <section>
        <div className="container--cb">
          <div className="title">
            <h2>Tipo de Entrega</h2>
          </div>

          <div className="btn whats">
            <a href={`https://wa.me/55${dados.client ? dados.client.celular : null}`} target="_blank" rel="noreferrer">
              <button>
                <span className="iconify" data-icon="fa-brands:whatsapp" data-inline="false"></span>
              </button>
              </a>
          </div>

          <div className="btn print">
            <Link to={`/etiqueta/${pedido}`}>
              <button>
                <span
                  className="iconify"
                  data-icon="ion:print-outline"
                  data-inline="false"
                ></span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="tipo--entrega">
          <div className="dados">
            <span className="iconify" data-icon="carbon:delivery-parcel"></span>
            <h3>Detalhes da Entregas</h3>
          </div>

          <div className="info--de">
            <span>Enviar pedido via:</span>
            <p>{
              dados.pedido ? 
              dados.pedido.enviado === 'ELG' ? 
              'Entrega - Lojas Grafitte - ELG' :
              dados.pedido.enviado === 'RLGV' ? 
              'Retirar - Loja Várzea Grande - RLGV' :
              dados.pedido.enviado === 'RLGC' ? 
              'Retirar - Loja Cuiabá Coxipó - RLGC' : null: 'Sem Registro!'
            }</p>
          </div>

          <div className="info--de">
            <span>Número do pedido:</span>
            <p>
              <strong>#{dados.pedido ? dados.pedido.codigoPedido : 'Sem registro'}</strong>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="title">
          <h2>Dados da Etiqueta</h2>
        </div>
      </section>

      <section>
        <div className="dados--etiqueta">
          <div className="dados">
            <span
              className="iconify"
              data-icon="bx:bx-user-circle"
              data-inline="false"
            ></span>
            <h3>Dados do Cliente</h3>
          </div>

          <div className="info--de">
            <span>Nome:</span>
            <p>{dados.pedido ? dados.client.nome : 'Sem registro'}</p>
          </div>

          <div className="info--de">
            <span>CPF:</span>
            <p>{dados.pedido ? mask.cpfMask(dados.client.cpf) : 'Sem registro'}</p>
          </div>

          <div className="info--de">
            <span>E-mail:</span>
            <p>{dados.pedido ? dados.client.email : 'Sem registro'}</p>
          </div>

          <div className="info--de">
            <span>Celular:</span>
            <p>{dados.pedido ? mask.celularMask(dados.client.celular) : 'Sem registro'}</p>
          </div>

          <div className="dados">
            <span
              className="iconify"
              data-icon="feather:map-pin"
              data-inline="false"
            ></span>
            <h3>Endereço de Entrega</h3>
          </div>

          <div className="info--de">
            <span>CEP:</span>
            <p>{dados.pedido ? mask.cepMask(dados.entrega.cep) : 'Sem registro'}</p>
            <span>Endereço:</span>
            <p>{dados.pedido ? dados.entrega.endereco : 'Sem registro'}</p>
          </div>

          <div className="info--de">
            <span>Número:</span>
            <p>{dados.entrega ? dados.entrega.numero < 10 ? `0${dados.entrega.numero}` : dados.entrega.numero: "Sem Registro"}</p>
            <span>Bairro:</span>
            <p>{dados.pedido ? dados.entrega.bairro : 'Sem registro'}</p>
          </div>

          <div className="info--de">
            <span>Cidade:</span>
            <p>{dados.pedido ? dados.entrega.cidade : 'Sem registro'}</p>
            <span>Estado:</span>
            <p>{dados.pedido ? dados.entrega.estado : 'Sem registro'}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
