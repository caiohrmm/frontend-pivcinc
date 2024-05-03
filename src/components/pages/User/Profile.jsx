"use client";
import { Container, Grid, Typography } from "@mui/material";
import { Button, Checkbox, Label, TextInput, FileInput } from "flowbite-react";
import { useEffect, useState } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";
import api from "../../../utils/api";
import RoundedImage from "../layout/RoundedImage";

const Profile = () => {
  const [preview, setPreview] = useState();

  const [user, setUser] = useState({});

  const { setFlashMessage } = useFlashMessage();

  // Pego o token do meu localStorage
  const [token] = useState(localStorage.getItem("token" || ""));

  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => setUser(response.data));
  }, [token]);

  const onFileChange = (e) => {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // Pega todos os dados do formulario e salva dentro do objeto user.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let msgType = "success";

    const formData = new FormData();

    // Me retorna um array com os dados do meu usuário
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  return (
    <Container>
      <Typography
        variant="h4"
        color={"white"}
        sx={{
          textTransform: "uppercase",
          marginTop: "1%",
          borderBottom: "2px solid white",
          padding: "4px",
        }}
        textAlign={"center"}
      >
        Editar Perfil
      </Typography>
      <Grid container spacing={2} p={2}>
        <form className="flex flex-col gap-4 form-grid" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block p-4">
              <Label htmlFor="file-upload" value="Imagem:" className="text-xl" />
              {/* Caso exista uma imagem de usuario ou um preview, ele renderiza esse JSX */}
              {(user.image || preview) && (
                <RoundedImage
                  src={
                    preview
                      ? URL.createObjectURL(preview)
                      : `http://localhost:4000/images/user/${user.image}`
                  }
                  alt={user.image}
                />
              )}
            </div>
            <FileInput
              id="file-upload"
              type="file"
              name="image"
              onChange={onFileChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="E-mail:" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="Digite seu novo e-mail"
              name="email"
              onChange={handleChange}
              value={user.email || ""}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Nome:" />
            </div>
            <TextInput
              id="name1"
              type="text"
              placeholder="Digite seu novo nome de perfil"
              name="name"
              onChange={handleChange}
              value={user.name || ""}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Telefone:" />
            </div>
            <TextInput
              id="phone1"
              type="text"
              placeholder="Digite seu novo telefone"
              onChange={handleChange}
              value={user.phone || ""}
              name="phone"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Senha:" />
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder="Digite sua nova senha"
              onChange={handleChange}
              name="password"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirm_password1" value="Confirmar Senha:" />
            </div>
            <TextInput
              id="confirm_password1"
              type="password"
              placeholder="Confirme sua nova senha"
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
          <Button
            type="submit"
            style={{ textTransform: "uppercase", marginTop: "16px" }}
          >
            Editar
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default Profile;
