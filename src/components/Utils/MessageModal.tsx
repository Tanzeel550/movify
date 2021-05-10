import React from 'react';
import Modal from 'react-modal';

type props = {
  message: string;
  clearMessage: (params: any) => {};
  title: string;
};

const MessageModal = ({ message, clearMessage, title }: props) => (
  <Modal
    isOpen={!!message}
    onRequestClose={clearMessage}
    contentLabel="Modal"
    className="messageModal jumbotron"
    ariaHideApp={false}
  >
    <h3 className="messageModal__title">{title}</h3>
    <p className="messageModal__body">{message}</p>
    <button className="btn btn-light btn-lg" onClick={clearMessage}>
      Okay
    </button>
  </Modal>
);

export default MessageModal;
