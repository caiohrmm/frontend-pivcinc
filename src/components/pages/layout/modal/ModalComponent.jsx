"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ModalComponent({
  isOpen,
  handleModal,
  title,
  buttonConfirm,
  action,
}) {
  return (
    <>
      <Modal show={isOpen} size="md" onClose={() => handleModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-20 w-20 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  action();
                  handleModal(false);
                }}
              >
                {buttonConfirm}
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  handleModal(false);
                }}
              >
                Não, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
