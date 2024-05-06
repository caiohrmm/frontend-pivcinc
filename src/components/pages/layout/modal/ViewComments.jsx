import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessage";
import CardComment from "./CardComment";

export function ViewComments({ isOpen, handleModal, post }) {
  const [token] = useState(localStorage.getItem("token") || "");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/posts/comments/${post._id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        setComments(response.data.postComments);
        console.log(comments);
      } catch (err) {
        console.log(err);
      }
    }

    if (post._id, isOpen) {
      fetchData();
    }
  }, [post._id, isOpen]); // Adicionei 'token' como uma dependência do useEffect

  return (
    <>
      <Modal show={isOpen} size="xl" popup onClose={() => handleModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="flex-col justify-center gap-2">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center mb-2">
              Todos comentários!
            </h3>

            {comments &&
              comments.length > 0 && ( // Verifica se 'comments' é uma matriz e se tem pelo menos um comentário
                <>
                  {comments.map((comment, index) => (
                    <div className="mb-4">
                      <CardComment key={index} comment={comment}></CardComment>
                    </div>
                  ))}
                </>
              )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
