import "./details.css";

export function Details({ url, details, closeModal }) {

  return (
    <div className="div_geral-details">
      <div className="div_video">
        <h2>trailer</h2>
      </div>
        <div className="div_description-details">
          <iframe
            width="560"
            height="350"
            src={url}
            title="trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="div_information">
            <h3>{details}</h3>
          </div>
        </div>
      <div className="div_button-details">
        <button
          onClick={() => {
            closeModal()
          }}
        >
          voltar
        </button>
      </div>
    </div>
  );
}

