import React from 'react';
import Modal from 'react-modal';

type Props = {
  message: string;
  title: string;
  clearMessage: (params: any) => {};
};

const MessageModal: React.FC<Props> = ({
  message,
  clearMessage,
  title,
}: Props) => (
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
