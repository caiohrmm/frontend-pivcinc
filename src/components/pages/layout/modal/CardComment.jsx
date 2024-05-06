import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "../../../../utils/api";

export default function CardComment({ comment }) {
  const [token] = React.useState(localStorage.getItem("token") || "");
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/users/${comment.userId}`);
        setUser(response.data.user);
      } catch (err) {
        console.log(err);
      }
    }

    if (token) {
      fetchData();
    }
  }, [comment.userId]);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: green[500] }}
            aria-label="recipe"
            src={`http://localhost:4000/images/user/${user.image}`}
          ></Avatar>
        }
        title={comment.username}
        subheader={comment.text}
      />
    </Card>
  );
}
