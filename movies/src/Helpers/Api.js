import swal from "sweetalert";

const baseURL = "https://api-movies-production-ee7b.up.railway.app/api";

function validate(title, text) {
  swal({
    title: title,
    text: text,
    icon: "warning",
    timer: 5000,
  });
}

export const Api = {
  create: async (el) => {
    try {
      const response = await fetch(baseURL + "/create", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(el),
      });
      const newCard = await response.json();
      return newCard;
    } catch {
      validate("Erro ao Cadastrar Filme!", "Tente novamente em alguns minutos");
    }
  },

  getAll: async () => {
    try {
      const response = await fetch(baseURL + "/");
      const cards = response.json();
      return cards;
    } catch {
      validate("Erro no servidor!", "Tente novamente em alguns minutos");
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(baseURL + "/findById/" + id, {
        method: "GET",
        headers: new Headers({ "content-type": "application/json" }),
      });
      const idMovie = response.json();
      return idMovie;
    } catch {
      validate(
        "Filme não encontrado!",
        "Nenhum filme com esse ID foi encontrado"
      );
    }
  },

  update: async (el) => {
    try {
      const response = await fetch(baseURL + "/update/" + el.id, {
        method: "PUT",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(el),
      });
      const cardEdtd = response.json();
      return cardEdtd;
    } catch {
      validate("Erro ao atualizar filme!", "Ocorreu um erro ao atualizar filme, tente novamente em alguns minutos");
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(baseURL + "/delete/" + id, {
        method: "DELETE",
        headers: new Headers({ "content-type": "application/json" }),
      });
      const cardDelit = response.json();
      return cardDelit;
    } catch {
      validate(
        "Erro ao deletar Filme!",
        "Ocorreu um erro ao tentar deletar filme, tente novamente em alguns minutos"
      );
    }
  },
};
