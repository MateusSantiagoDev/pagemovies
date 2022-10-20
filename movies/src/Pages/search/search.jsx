import "./search.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import estrela from "../../assets/icons/estrela.png";
import { MovieContext } from "../../context/context";
import swal from "sweetalert";

const customStyle = {
  overlay: {
    background: "rgba(0, 0, 0, 9.9)",
  },
};

Modal.setAppElement("#root");

function validate(title, text) {
  swal({
    title: title,
    text: text,
    icon: "warning",
    timer: 5000,
  });
}

export function Search() {
  const navigate = useNavigate();
  const { movieSearch, valueSearch } = useContext(MovieContext);
  const [modal, setModal] = useState(false);
  const [cardMovie, setCardMovie] = useState([]);

  function closeModal() {
    setModal(!modal);
  }
  function searchMovie() {
    movieSearch.map((el) => {
      if (el.title === valueSearch) {
        setCardMovie(el);         
      }/* else{
         validate("Erro ao Buscar Filme!", "Nenhum filme com esse titulo foi encontrado");         
         navigate("/")
      } */
    });
  }

  useEffect(() => {
    searchMovie();
  }, []);

  return (
    <div className="div_geral-search">
      <div className="div_search">
        <img src={cardMovie.image} />
        <div className="title">{cardMovie.title}</div>
        <div className="div_evaluation">
          <img src={estrela} />
          {cardMovie.evaluation}
        </div>
        <div className="div_button_card-search">
          <button
            onClick={() => {
              closeModal();
            }}
          >
            Detalhes
          </button>
        </div>
        <Modal
          className="modal"
          isOpen={modal}
          onRequestClose={closeModal}
          contentLabel="modal_search"
          style={customStyle}
        >
          <div className="details_modal">
            <h3>Trailer</h3>
            <iframe
              width="560"
              height="350"
              src={cardMovie.url}
              title="trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="div_information">
              <h3>{cardMovie.details}</h3>
            </div>
            <div className="button_modal-search">
              <button
                onClick={() => {
                  closeModal();
                }}
              >
                Voltar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
