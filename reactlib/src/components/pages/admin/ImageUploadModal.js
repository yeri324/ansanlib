import React from 'react';
import Modal from 'react-modal';

const ImageUploadModal = ({ isOpen, onRequestClose, handleImageChange }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="이미지 업로드">
      <h2>이미지 업로드</h2>
      <input type="file" onChange={handleImageChange} multiple />
      <button type="button" class="btn btn-light" onClick={onRequestClose}>닫기</button>
    </Modal>
  );
};

export default ImageUploadModal;
