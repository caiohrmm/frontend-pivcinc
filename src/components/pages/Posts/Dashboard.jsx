import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import RecipeCard from "../layout/Card";
import useFlashMessage from "../../../hooks/useFlashMessage";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState({});

  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/users/checkuser", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        setUser(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    async function getAllPosts() {
      try {
        const response = await api.get(`/posts/`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        // Filtrando os posts para excluir aqueles com o mesmo userId do usuário logado
        const filteredPosts = response.data.posts.filter(
          (post) => post.userId !== user._id
        );

        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }

    if (token && user && user._id) {
      getAllPosts();
    }
  }, [token, user]);

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
        }}
        textAlign={"center"}
      >
        Dashboard
      </Typography>
      <div>
        {posts.length > 0 && (
          <div className="description-posts">
            <Typography
              variant="h6"
              color={"white"}
              sx={{
                padding: "4px",
                textAlign: "center",
              }}
            >
              Todos os posts do Pivcinc!
            </Typography>
          </div>
        )}
        {posts.length === 0 && (
          <>
            <div className="description-posts">
              <Typography
                variant="h6"
                color={"white"}
                sx={{
                  marginTop: "1%",
                  padding: "4px",
                  textAlign: "center",
                }}
              >
                Eita... Ainda não tem nada aqui!
              </Typography>
            </div>
          </>
        )}
      </div>
      <div className="cards-container gap-5">
        {posts.map((post, index) => (
          <div className="w-100">
            <RecipeCard
              key={index}
              post={post}
              type={"dashboard"}
              likePost={likePost}
              unlikePost={unlikePost}
              followUser={followUser}
              unfollowUser={unfollowUser}
              checkIfFollowing={checkIfFollowing}
            ></RecipeCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
