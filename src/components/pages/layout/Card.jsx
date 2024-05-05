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
import Button from "@mui/material/Button";

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

export default function RecipeCard({
  post,
  type,
  deletePost,
  likePost,
  unlikePost,
  followUser,
  unfollowUser,
  checkIfFollowing,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [token] = React.useState(localStorage.getItem("token") || "");
  const [postAuthor, setPostAuthor] = React.useState({});
  const [liked, setLiked] = React.useState(false);
  const [postLikes, setPostLikes] = React.useState(post.likes.length);
  const [following, setFollowing] = React.useState(false);
  const [user, setUser] = React.useState({})

  React.useEffect(() => {
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

    if (post && token) {
      fetchData();
    }
  }, [post, token]);

  React.useEffect(() => {
    if (post.likes.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    setPostLikes(post.likes.length);
  }, [post.likes, user._id]);

  React.useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const isFollowing = await checkIfFollowing(post.userId);
        setFollowing(isFollowing);
      } catch (error) {
        console.error("Erro ao verificar status de seguimento:", error);
      }
    };
    checkFollowingStatus();
  }, [post.userId]);

  const handleLikeClick = async () => {
    liked ? await unlikePost(post._id) : await likePost(post._id);
    setLiked(!liked);
    setPostLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
  };

  const handleFollowClick = async () => {
    try {
      if (following) {
        await unfollowUser(post.userId);
        setFollowing(false); // Se o usuário deixar de seguir, atualize o estado de seguimento para false
      } else {
        await followUser(post.userId);
        setFollowing(true); // Se o usuário seguir, atualize o estado de seguimento para true
      }
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir usuário:", error);
    }
  };

  return (
    <Card sx={{ width: 500, padding: 1, marginBottom: 4 }}>
      {type === "dashboard" ? (
        <div className="flex justify-between header-follow">
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
            about="Seguir"
          />
          <div className="mr-2">
            <Button
              variant="contained"
              onClick={handleFollowClick}
              color={following ? "success" : "info"}
            >
              {following ? "Deixar de Seguir" : "Seguir"}
            </Button>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
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
          <div className="icons">
            <div>
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
            </div>
            <div>
              <FavoriteIcon style={{ color: "red" }} />
              <span style={{ fontSize: "15px", marginLeft: "4px" }}>
                {post.likes.length}
              </span>
            </div>
          </div>
        )}
        {type === "dashboard" && (
          <>
            <IconButton aria-label="likePost" onClick={handleLikeClick}>
              {liked ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon style={{ color: "black" }} />
              )}
            </IconButton>
            <span>{postLikes}</span>
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
