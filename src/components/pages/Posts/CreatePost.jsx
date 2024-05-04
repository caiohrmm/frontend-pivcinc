import api from "../../../utils/api";
import { useEffect, useState, ùseState } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { Typography } from "@mui/material";

import { FileInput, Textarea } from "flowbite-react";

import { Button } from "flowbite-react";

import { FloatingLabel } from "flowbite-react";

const CreatePost = () => {
  const [token] = useState(localStorage.getItem("token") || "");

  const [user, setUser] = useState({});
  const { setFlashMessage } = useFlashMessage();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/users/checkuser", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (token) {
      fetchData();
    }
  }, [token]);

  const [post, setPost] = useState({});
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const onFileChange = (e) => {
    setPost({ ...post, images: [...e.target.files] });
  };

  const registerPost = async (post) => {
    let msgType = "success";

    const formData = new FormData();

    await Object.keys(post).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < post[key].length; i++) {
          formData.append("images", post[key][i]);
        }
      } else {
        formData.append(key, post[key]);
      }
    });

    const data = await api
      .post(`/posts/newpost/${user._id}`, formData, {
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
    if (msgType !== "error") {
      navigate("/posts/myposts");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerPost(post);
  };
  return (
    <section>
      <Typography
        variant="h4"
        color={"white"}
        sx={{
          textTransform: "uppercase",
          marginTop: "1%",
          borderBottom: "2px solid white",
          padding: "4px",
          marginBottom: "10px",
        }}
        textAlign={"center"}
      >
        Criar post
      </Typography>
      <form onSubmit={handleSubmit}>
        <div
          className="form bg-white p-4 rounded-lg flex flex-col gap-2
      "
        >
          <FloatingLabel
            variant="outlined"
            label="Título da Postagem"
            onChange={handleChange}
            name="title"
          />

          <Textarea
            id="comment"
            placeholder="Seu relato aqui..."
            required
            rows={4}
            className="textarea"
            onChange={handleChange}
            name="description"
          />

          <div>
            <FileInput
              id="multiple-file-upload"
              multiple
              onChange={onFileChange}
            />
          </div>

          <Button
            outline
            gradientDuoTone="cyanToBlue"
            className="uppercase"
            type="submit"
          >
            Criar post
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
