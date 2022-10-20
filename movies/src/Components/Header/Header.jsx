import "./Header.css";
import { Link } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/context";
import swal from "sweetalert";

export function Header() {
  const navigate = useNavigate();
  const { valueSearch, setValueSearch, disabled, setDisabled } = useContext(MovieContext);

  function validate(title, text) {
    swal({
      title: title,
      text: text,
      icon: "warning",
      timer: 5000,
    });
  }

  function canDisabled(){
       setDisabled(!disabled)
  }

  useEffect(() => {
    canDisabled()
  }, []) 

  function movieSearch(event) {
    event.preventDefault();

    if (valueSearch) {
      setValueSearch(valueSearch);
      navigate("/search");
    }/* else{
      validate("Erro ao Buscar Filme!", "Nenhum filme com esse titulo foi encontrado");         
      navigate("/")
    } */
  /*   useEffect(() => {
      setValueSearch("")
    }) */
  }

  

  return (
    <nav className="navbar_movies">
      <h2 className="h2_movies">
        <Link to={"/"}>
          <BiCameraMovie /> Movies
        </Link>
      </h2>
      <div className="div-create-search">
        <div className="div_form_search">
          <form className="form_search" onSubmit={movieSearch}>
            <input
              type="text"
              name="title"
              placeholder="Digite o titulo do filme:"
              required
              onChange={(event) => {
                setValueSearch(String(event.target.value));
              }}
            />
            <div>
              <button type="submit" className="button_form-search">
                <FcSearch />
              </button>
            </div>
          </form>
        </div>
        <div>
          <button
          disabled={disabled}
            className="newMovie"
            onClick={() => {
              navigate("/cards");
            }}
          >
            New Movie
          </button>
        </div>
      </div>
    </nav>
  );
}
