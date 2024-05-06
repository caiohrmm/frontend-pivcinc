import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useRef, useState } from "react";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessage";

export function Comment({ isOpen, handleModal, post }) {
  const [comment, setComment] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const commentPost = async (postId) => {
    let msgType = "success";

    const data = await api
      .post(`/posts/comment/${postId}`, comment, {
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

  const handleSubmit = () => {
    commentPost(post._id)
    handleModal(false)
  }

  return (
    <>
      <Modal show={isOpen} size="xl" popup onClose={() => handleModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col justify-center gap-2">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
              Faça seu comentário!
            </h3>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block text-center">
                  <Label htmlFor="comment" value="Seu comentário" />
                </div>
                <Textarea
                  id="comment"
                  placeholder="Insira um comentário..."
                  required
                  onChange={handleChange}
                  name="text"
                />
              </div>
              <div className="flex items-end justify-center">
                <Button type="submit">Comentar</Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
