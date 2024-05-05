import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import api from "../../../utils/api";
import useFlashMessage from "../../../hooks/useFlashMessage";
import RecipeCard from "../layout/Card";
import FollowingMessage from "./FollowingMessage";

const Followers = () => {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const [posts, setPosts] = useState([]);

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

  const likePost = async (id) => {
    let msgType = "success";
    const data = await api
      .post(`/posts/likepost/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
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

  const unlikePost = async (id) => {
    let msgType = "success";
    try {
      const response = await api.delete(`/posts/unlikepost/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      setFlashMessage(response.data.message, msgType);
    } catch (error) {
      msgType = "error";
      console.error("Erro ao descurtir o post:", error);
      setFlashMessage(error.response.data.message, msgType);
    }
  };

  useEffect(() => {
    async function getFollowingPosts() {
      try {
        const response = await api.get(`/users/posts/following`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        // Filtrando os posts para excluir aqueles com o mesmo userId do usuário logado

        setPosts(response.data);
        console.log(posts);
      } catch (err) {
        console.log(err);
      }
    }

    if (token && user && user._id) {
      getFollowingPosts();
    }
  }, [token, user]);

  // Função para contar os posts das pessoas que você está seguindo
  const countFollowingPosts = () => {
    try {
      // Inicializa um conjunto para armazenar os IDs únicos de usuários
      const uniqueUserIds = new Set();

      // Adiciona os IDs de usuários únicos com base nos posts
      posts.forEach((post) => {
        uniqueUserIds.add(post.userId);
      });

      // Retorna o número de IDs de usuários únicos, que corresponde ao número de pessoas que você está seguindo
      return uniqueUserIds.size;
    } catch (error) {
      console.error(
        "Erro ao contar os posts das pessoas que você está seguindo:",
        error
      );
      // Em caso de erro, retorna 0 ou trata de outra forma
      return 0;
    }
  };

  const followUser = async (id) => {
    let msgType = "success";
    const data = await api
      .post(`/users/follow/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
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

  const unfollowUser = async (id) => {
    let msgType = "success";
    const data = await api
      .post(`/users/unfollow/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
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

  const checkIfFollowing = async (id) => {
    try {
      const response = await api.get(`/users/checkiffollowing/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      return response.data; // Retorna os dados da resposta da API
    } catch (error) {
      console.error("Erro ao verificar se está seguindo:", error);
      throw error; // Lança o erro para que possa ser tratado na chamada da função
    }
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
        Seguindo
      </Typography>
      <div>
        <FollowingMessage
          user={user}
          countFollowingPosts={countFollowingPosts}
        />
        <div className="cards-container gap-5">
          {posts.map((post, index) => (
            <div className="w-100">
              <RecipeCard
                key={index}
                post={post}
                type={"dashboard"}
                likePost={likePost}
                unlikePost={unlikePost}
                user={user}
                followUser={followUser}
                unfollowUser={unfollowUser}
                checkIfFollowing={checkIfFollowing}
              ></RecipeCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Followers;
