import api from "../../../utils/api";
import { ùseState } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { Typography } from "@mui/material";

const CreatePost = () => {
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
    </section>
  );
};

export default CreatePost;
