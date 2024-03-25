import bus from "../../../utils/bus";

import Alert from "@mui/material/Alert";

import { useState, useEffect } from "react";

const FlashMessage = () => {
  // Estado que manipula se a mensagem é de sucesso ou de erro
  const [type, setType] = useState("");

  // Estado que manipula se a flash message vai estar visivel ou nao
  const [visibility, setVisibility] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 8000);
    });
  }, []);
  return (
    visibility && (
      <Alert className="flash-message" severity={type}>
        {message}
      </Alert>
    )
  );
};

export default FlashMessage;
