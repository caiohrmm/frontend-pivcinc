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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalComponent from "./modal/ModalComponent";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import api from "../../../utils/api";
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCard({ user, post, type, deletePost }) {
  const [expanded, setExpanded] = React.useState(false);
  const [token] = React.useState(localStorage.getItem("token") || "");
  const [postAuthor, setPostAuthor] = React.useState({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [isOpen, setIsOpen] = React.useState(false);

  function formatarData(dataString) {
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    const hora = ("0" + data.getHours()).slice(-2);
    const minuto = ("0" + data.getMinutes()).slice(-2);

    return `${dia} de ${mes} de ${ano} às ${hora}:${minuto}`;
  }

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/users/${post.userId}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        setPostAuthor(response.data.user);
      } catch (err) {
        console.log(err);
      }
    }

    if (token) {
      fetchData();
    }
  }, [token]);
  return (
    <Card sx={{ width: 500, padding: 1, marginBottom: 4 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: green[500] }}
            aria-label="recipe"
            src={`http://localhost:4000/images/user/${postAuthor.image}`}
          ></Avatar>
        }
        title={postAuthor.name}
        subheader={formatarData(post.createdAt)}
      />
      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:4000/images/post/${post.images[0]}`}
        alt="Imagem"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {type === "myposts" && (
          <>
            <Link to={`/posts/edit/${post._id}`}>
              <IconButton aria-label="edit post">
                <EditIcon />
              </IconButton>
            </Link>

            <IconButton
              aria-label="delete post"
              onClick={() => setIsOpen(true)}
            >
              <DeleteIcon />
            </IconButton>
            <ModalComponent
              isOpen={isOpen}
              handleModal={setIsOpen}
              title={"Você deseja deletar essa postagem ?"}
              buttonConfirm={"Sim"}
              action={() => deletePost(post._id)}
            />
          </>
        )}
        {type === "dashboard" && (
          <>
            <IconButton aria-label="add to favorites">
              <FavoriteBorderIcon />
            </IconButton>
          </>
        )}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{post.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
