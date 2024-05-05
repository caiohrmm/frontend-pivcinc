import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import RecipeCard from "../layout/Card";
import useFlashMessage from "../../../hooks/useFlashMessage";

const MyPosts = () => {
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
      } catch (err) {
        console.log(err);
      }
    }

    if (token) {
      fetchData();
    }
  }, [token]);

  {
    useEffect(() => {
      async function getAllPostsByUser() {
        try {
          const response = await api.get(`/posts/myposts/`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });
          setPosts(response.data.posts);
        } catch (err) {
          console.log(err);
        }
      }

      if (token) {
        getAllPostsByUser();
      }
    }, [token]);
  }

  const deletePost = async (id) => {
    let msgType = "success";
    const data = await api
      .delete(`/posts/deletePostById/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPosts = posts.filter((post) => post._id !== id);
        setPosts(updatedPosts);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });
      setFlashMessage(data.message, msgType)
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
        Meus posts
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
              Aqui estão todos seus posts!
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
                Você ainda não publicou nada. Faça sua postagem clickando{" "}
                <Link to={"/posts/create"}>aqui</Link>!
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
              user={user}
              post={post}
              type={"myposts"}
              deletePost={deletePost}
            ></RecipeCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyPosts;
