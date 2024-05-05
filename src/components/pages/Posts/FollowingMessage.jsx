import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const FollowingMessage = ({ user, countFollowingPosts }) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifica se a propriedade user e a propriedade followers estão definidas antes de acessar o length
        if (user && user.followers) {
          setFollowersCount(user.followers.length);
        } else {
          setFollowersCount(0);
        }

        // Chama countFollowingPosts e aguarda sua execução
        if (countFollowingPosts) {
          const count = await countFollowingPosts();
          setFollowingCount(count);
        } else {
          setFollowingCount(0);
        }
      } catch (error) {
        console.error(
          "Erro ao obter o número de pessoas que você está seguindo:",
          error
        );
        setFollowingCount(0);
      }
    };

    fetchData();
  }, [user, countFollowingPosts]);

  const shouldDisplayMessage = followersCount > 0 || followingCount > 0;

  return (
    shouldDisplayMessage && (
      <div className="flex justify-center">
        <Typography
          variant="h7"
          color="white"
          sx={{
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
          textAlign="center"
        >
          Você tem {followersCount} seguidores e está seguindo {followingCount}{" "}
          pessoas.
        </Typography>
      </div>
    )
  );
};

export default FollowingMessage;
