import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Logo from "../../assets/logo_grafitte.svg";
import { IoMdSearch } from "react-icons/io";
import Api from "../../services/Api";
import mask from "../../utils/mask";
import ContentLoader from "react-content-loader";

function Home() {
  const [pedido, setPedido] = useState("");
  const [dados, setDados] = useState("");
  const [load, setLoad] = useState(false);
  const [header, setHeader] = useState(false);

  function handlerSubmit(e) {
    setLoad(true);
    setHeader(true);
    e.preventDefault();
    Api.post("/pedido", { pedido }).then((r) => {
      setDados(r.data);
      setLoad(false);
    });
  }

  const loaderTwoRow = () => (
    <ContentLoader viewBox="-30 10 450 70">
      <rect x="0" y="17" rx="4" ry="4" width="70" height="13" />
      <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />

      <rect x="0" y="35" rx="4" ry="4" width="70" height="13" />
      <rect x="80" y="35" rx="4" ry="4" width="300" height="13" />
    </ContentLoader>
  );

  const loaderThreeRow = () => (
    <ContentLoader viewBox="-30 10 450 70">
      <rect x="0" y="17" rx="4" ry="4" width="70" height="13" />
      <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />

      <rect x="0" y="35" rx="4" ry="4" width="70" height="13" />
      <rect x="80" y="35" rx="4" ry="4" width="300" height="13" />

      <rect x="0" y="53" rx="4" ry="4" width="70" height="13" />
      <rect x="80" y="53" rx="4" ry="4" width="300" height="13" />
    </ContentLoader>
  );

  const loaderForRow = () => (
    <ContentLoader viewBox="-30 10 450 85">
      <rect x="0" y="17" rx="4" ry="4" width="70" height="13" />
      <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />

      <rect x="0" y="35" rx="4" ry="4" width="70" height="13" />
      <rect x="80" y="35" rx="4" ry="4" width="300" height="13" />

      <rect x="0" y="53" rx="4" ry="4" width="70" height="13" />
      <rect x="80" y="53" rx="4" ry="4" width="300" height="13" />

      <rect x="0" y="71" rx="4" ry="4" width="70" height="13" />
      <rect x="80" y="71" rx="4" ry="4" width="300" height="13" />
    </ContentLoader>
  );

  return (
    <>
      <nav className="container--menu">
        <div className="menu--pai">
          <div className="logo--pai">
            <Link to="/">
              <img src={Logo} alt={Logo} />
            </Link>
          </div>
          <div className="pesquisa--id">
            <form onSubmit={(e) => handlerSubmit(e)}>
              <input
                placeholder="Pesquisar pelo ID do pedido"
                autoFocus={true}
                type="text"
                value={pedido}
                onChange={(e) => setPedido(e.target.value)}
              />

              <button title="Pesquisar">
                <IoMdSearch />
              </button>
            </form>
          </div>
        </div>
      </nav>

      {header ? (
        <>
          <section>
            <div className="container--cb">
              <div className="title">
                <h2>Tipo de Entrega</h2>
              </div>

              <div className="btn whats">
                <a
                  href={`https://wa.me/55${
                    dados.client ? dados.client.celular : null
                  }`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>
                    <span
                      className="iconify"
                      data-icon="fa-brands:whatsapp"
                      data-inline="false"
                    ></span>
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
                <span
                  className="iconify"
                  data-icon="carbon:delivery-parcel"
                ></span>
                <h3>Detalhes da Entregas</h3>
              </div>

              {load ? (
                loaderTwoRow()
              ) : (
                <>
                  <div className="info--de">
                    <span>Enviar pedido via:</span>
                    <p>
                      {dados.pedido
                        ? dados.pedido.enviado === "ELG"
                          ? "Entrega - Lojas Grafitte - ELG"
                          : dados.pedido.enviado === "RLGV"
                          ? "Retirar - Loja Várzea Grande - RLGV"
                          : dados.pedido.enviado === "RLGC"
                          ? "Retirar - Loja Cuiabá Coxipó - RLGC"
                          : dados.pedido.enviado === "Correios SEDEX"
                          ? "Transportadora Correios - SEDEX"
                          : dados.pedido.enviado === "Correios PAC"
                          ? "Transportadora Correios - PAC"
                          : dados.pedido.enviado ===
                            "Jadlog Package - Transportadora "
                          ? "Transportadora - Jadlog Package"
                          : dados.pedido.enviado === 
                            "Jadlog Expresso - Transportadora"
                          ? "Transportadora - Jadlog Expresso"
                          : null
                        : "Sem Registro!"}
                    </p>
                  </div>

                  <div className="info--de">
                    <span>Número do pedido:</span>
                    <p>
                      <strong>
                        #
                        {dados.pedido
                          ? dados.pedido.codigoPedido
                          : "Sem registro"}
                      </strong>
                    </p>
                  </div>
                </>
              )}
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

              {load ? (
                loaderForRow()
              ) : (
                <>
                  <div className="info--de">
                    <span>Nome:</span>
                    <p>{dados.pedido ? dados.client.nome : "Sem registro"}</p>
                  </div>

                  <div className="info--de">
                    <span>CPF:</span>
                    <p>
                      {dados.pedido
                        ? mask.cpfMask(dados.client.cpf)
                        : "Sem registro"}
                    </p>
                  </div>

                  <div className="info--de">
                    <span>E-mail:</span>
                    <p>{dados.pedido ? dados.client.email : "Sem registro"}</p>
                  </div>

                  <div className="info--de">
                    <span>Celular:</span>
                    <p>
                      {dados.pedido
                        ? mask.celularMask(dados.client.celular)
                        : "Sem registro"}
                    </p>
                  </div>
                </>
              )}

              <div className="dados">
                <span
                  className="iconify"
                  data-icon="feather:map-pin"
                  data-inline="false"
                ></span>
                <h3>Endereço de Entrega</h3>
              </div>

              {load ? (
                loaderThreeRow()
              ) : (
                <>
                  <div className="info--de">
                    <span>CEP:</span>
                    <p>
                      {dados.pedido
                        ? mask.cepMask(dados.entrega.cep)
                        : "Sem registro"}
                    </p>
                    <span>Endereço:</span>
                    <p>
                      {dados.pedido ? dados.entrega.endereco : "Sem registro"}
                    </p>
                  </div>

                  <div className="info--de">
                    <span>Número:</span>
                    <p>
                      {dados.entrega
                        ? dados.entrega.numero < 10
                          ? `0${dados.entrega.numero}`
                          : dados.entrega.numero
                        : "Sem Registro"}
                    </p>
                    <span>Bairro:</span>
                    <p>
                      {dados.pedido ? dados.entrega.bairro : "Sem registro"}
                    </p>
                  </div>

                  <div className="info--de">
                    <span>Cidade:</span>
                    <p>
                      {dados.pedido ? dados.entrega.cidade : "Sem registro"}
                    </p>
                    <span>Estado:</span>
                    <p>
                      {dados.pedido ? dados.entrega.estado : "Sem registro"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>
        </>
      ) : (
        <div className="container--bemvindo">
          <div className="bemvindo">
            <h1>🤩 Seja bem vindo, Mestre! 🤝</h1>
            <p>Etiqueta de qual cliente deseja gerar mestre?</p>
            <p>
              Por gentileza insira o ID do pedido na barra de pesquisa para que
              possamos buscar as informações do cliente e gerar a etiqueta.
            </p>
            <p>Desde já agradeço pela visita, volte sempre! 😍</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
