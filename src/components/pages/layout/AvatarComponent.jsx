import Avatar from "@mui/material/Avatar";
import React, { useState, useEffect } from 'react';

const AvatarComponent = ({ user }) => {
  const [pathImage, setPathImage] = useState('');

  useEffect(() => {
    // Aqui você pode atualizar o pathImage com base nas alterações no usuário ou em qualquer outra condição
    if (user && user.image) {
      setPathImage(`http://localhost:4000/images/user/${user.image}`);
    } else {
      setPathImage(''); // Define um caminho de imagem padrão ou vazio, se necessário
    }
  }, [user]); // Dependência do useEffect - será disparado sempre que o usuário mudar

  return (
    <Avatar
      alt="Imagem de Perfil"
      src={pathImage}
      sx={{
        height: "50px",
        width: "50px",
        padding: "3px",
        borderRadius: "20px",
      }}
    />
  );
};

export default AvatarComponent;
