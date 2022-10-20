import "./Home.css";
import estrela from "../../assets/icons/estrela.png";
import { Api } from "../../Helpers/Api.js";
import { useState, useEffect, useContext } from "react";
import { Details } from "../details/details";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { MovieContext } from "../../context/context";

const customStyle = {
  overlay: {
    background: "rgba(0, 0, 0, 9.9)",
  },
};

Modal.setAppElement("#root");

export function Home() {
  const navigate = useNavigate();
  const { setMovieSearch, disabled, setDisabled } = useContext(MovieContext);

  const [cards, setCards] = useState([]);
  const [details, setDetails] = useState({});
  const [control, setControl] = useState(false);
  const [close, setClose] = useState(false);

  const [itensPage, setItensPage] = useState(8);
  const [correntPage, setCorrentPage] = useState(0);

  const page = Math.ceil(cards.length / itensPage);
  const start = correntPage * itensPage;
  const end = start + itensPage;
  const moviesPage = cards.slice(start, end);

  async function getAllCards() {
    const result = await Api.getAll();
    setCards(result);
    setMovieSearch(result);
  }

  async function deleteMovie(id) {
    swal({
      title: "Deletar Filme? ",
      text: " Tem certeza que deseja Deletar esse Filme? ",
      icon: "warning",
      perigoMode: true,
      buttons: {
        cancel: {
          text: "Cancelar",
          value: null,
          visible: true,
          closeModal: true,
          className: "button-cancelar",
        },
        confirm: {
          text: "Confirmar",
          value: true,
          visible: true,
          closeModal: true,
          className: "button-confirmar",
        },
      },
    }).then(async (res) => {
      if (res) {
        const result = await Api.delete(id);
        if (result) {
          state();
        }
        swal(" O filme foi deletado com sucesso! ", {
          icon: "success",
        });
      } else {
        swal(" O filme está seguro! ");
      }
    });
  }

  function state() {
    setControl(!control);
  }

  useEffect(() => {
    getAllCards();
  }, [control]);

  function closeModal() {
    setClose(!close);
  }

  return (
    <div className="div_geral_home">
      <div className="div_home">
        {moviesPage.map((el, index) => (
        
          <div className="card_movie-home" key={index}>
            <img className="img_card-home" src={el.image} />
            <div className="titulo_card-home">{el.title}</div>
            <div className="evaluation_card-home">
              <img src={estrela} /> {el.evaluation}
            </div>
            <div className="div_geral-button">
              <div className="details_card-home">
                <button
                  onClick={() => {
                    setDetails(el);
                    closeModal();
                  }}
                >
                  Detalhes
                </button>
              </div>

              <div className="button_update">
                <button
                  onClick={() => {
                    navigate("/update/" + el.id);
                    setDisabled(!disabled);
                  }}
                >
                  Atualizar
                </button>
              </div>
              <div className="button_delete">
                <button
                  onClick={() => {
                    deleteMovie(el.id);
                  }}
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="div_modal">
          <Modal
            className="modal"
            isOpen={close}
            onRequestClose={closeModal}
            contentLabol="details_modal"
            style={customStyle}
          >
            <Details
              url={details.url}
              details={details.details}
              closeModal={closeModal}
            />
          </Modal>
        </div>
      </div>
      <div className="button_pages">
        {Array.from(Array(page), (_, index) => (
          <button
            key={index}
            value={index}
            onClick={(event) => setCorrentPage(Number(event.target.value))}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
