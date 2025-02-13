import { useEffect, useState } from "react";
import api from "../utils/api";
import useFlashMessage from "./useFlashMessage";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const reloadPage = () => {
    window.location.reload(); // Esta linha irá recarregar a página
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    // Se der tudo certo, exibirá isso
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api
        .post("/users/register", user)
        .then((response) => response.data);

      await authUser(data);
      // Adiciona um atraso de 2 segundos antes de recarregar a página
      setTimeout(() => {
        reloadPage();
      }, 2000);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));
    navigate("/posts/dashboard");
  }

  const logout = () => {
    const msgText = "Logout realizado com sucesso!";
    const msgType = "success";

    localStorage.removeItem("token");
    setAuthenticated(false);

    api.defaults.headers.Authorization = undefined;

    navigate("/");

    setFlashMessage(msgText, msgType);
  };

  async function login(user) {
    // Se der tudo certo, exibirá isso
    let msgText = "Login realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api
        .post("/users/login", user)
        .then((response) => response.data);

      await authUser(data);
      setTimeout(() => {
        reloadPage();
      }, 2000);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  return { register, authenticated, logout, login };
}
