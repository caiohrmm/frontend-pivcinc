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
      async function getAllPosts() {
        try {
          const response = await api.get(`/posts/`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });
          const postsForCurrentUser = response.data.posts.filter(
            (post) => post.userId !== user._id
          );
          if (postsForCurrentUser.every((post) => post.userId !== user._id)) {
            setPosts(postsForCurrentUser);
          }
          console.log(response.data.posts[0].userId);
          console.log(user._id);
        } catch (err) {
          console.log(err);
        }
      }

      if (token) {
        getAllPosts();
      }
    }, [token, user._id]);
  }

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
                O Pivcinc ainda não possui nenhuma postagem!
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
              type={"dashboard"}
            ></RecipeCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
