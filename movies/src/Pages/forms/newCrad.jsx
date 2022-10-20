import "./newCard.css";
import { Api } from "../../Helpers/Api.js";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MovieContext } from "../../context/context";

export function NewCards() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { disabled, setDisabled } = useContext(MovieContext);
  const [card, setCard] = useState([]);
  const [data, setData] = useState(true);

  async function getMoviId() {
    if (id) {
      const result = await Api.getById(id);
      setCard(result);
    }
  }

  useEffect(() => {
    getMoviId();
  }, []);

  async function createCard(event) {
    event.preventDefault();

    

    const renameImage = (img) => img.split("\\").pop();
    const { image, title, evaluation, details, url } = card;
    const movie = {
      image: `assets/images/${renameImage(image)}`,
      title,
      evaluation,
      details,
      url,
    };  
    
    if (id) {
      const movieById = { ...movie, id: id };
      const result = await Api.update(movieById);
      if (result) {
        navigate("/");
      }
    } else {
      const result = await Api.create(movie);
      if (result) {
        navigate("/");
      }
    }

  /*   function formData() {
      const response = !Boolean(
          card.title.length &&
          card.evaluation.length &&
          card.details.length  &&
          card.url.length &&
          card.image.length
      );
      setDisabled(response);
    }

    useEffect(() => {
      formData();
    });  */
    

     
  }

  return (
    <div className={`div_form ${id && "div_form-update"}`}>
      <form
        autoComplete="off"
        onSubmit={createCard}
        className={`form_card ${id && "form_update"}`}
      >
        <h2>{id ? "Atualizar Filme" : "Cadastrar Filme"}</h2>

        <h4 className="titulo_card">
          Titulo:
          <input
            type="text"
            name="title"
            /* required */
            defaultValue={card?.title}
            onChange={(event) => {
              setCard({ ...card, title: String(event.target.value) });
            }}
          />
        </h4>
        <h4 className="avaliacao_card">
          Avaliação:
          <input
            type="text"
            name="evaluation"
           /*  required */
            defaultValue={card?.evaluation}
            onChange={(event) => {
              setCard({ ...card, evaluation: Number(event.target.value) });
            }}
          />
        </h4>

        <h4 className="details_url">
          URL do trailer:
          <input
            type="text"
            name="url"
           /*  required */
            defaultValue={card?.url}
            onChange={(event) => {
              setCard({ ...card, url: String(event.target.value) });
            }}
          />
        </h4>
        <h4 className="details_sobre">
          Sobre o filme:
          <input
            type="text"
            name="details"
           /*  required */
            defaultValue={card?.details}
            onChange={(event) => {
              setCard({ ...card, details: String(event.target.value) });
            }}
          />
        </h4>

        <h4 className="image_card">
          Selecione uma Imagem
          <input
            className="image_card"
            name="image"
            type="file"
            /* required */
            defaultValue={card?.image}
            onChange={(event) => {
              setCard({ ...card, image: String(event.target.value) });
            }}
          />
        </h4>

        <div className="div_button-submit">
          <button
          /* disabled={card.title && card.evaluation && card.url && card.details && card.image ? disabled : !disabled} */
         
            type="submit"
            className="button_card"
            onClick={() => {
              {
                id ? setDisabled(!disabled) : setDisabled(disabled);
              }
            }}
          >
            Enviar
          </button>
          <button
            className="button_disabled"
            onClick={() => {
              navigate("/");
              {
                id ? setDisabled(!disabled) : setDisabled(disabled);
              }
              /*  setData(data) */
            }}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}
