import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");

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
          const response = await api.get(`/posts/myposts/${user._id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });
          setPosts(response.data);
        } catch (err) {
          console.log(err);
        }
      }

      if (user) {
        getAllPostsByUser();
      }
    }, [user]);
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
        Meus posts
      </Typography>
      <div>
        {posts.length > 0 && <p>Aqui estão todos os seus posts.</p>}
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
      
      
    </section>
  );
};

export default MyPosts;
