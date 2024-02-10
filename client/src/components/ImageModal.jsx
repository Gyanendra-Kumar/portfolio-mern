import React, { memo, useCallback } from "react";
import { Lightbox } from "react-modal-image";

const ImageModal = ({ isOpen, onClose, imageUrl, imageTitle }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <Lightbox medium={imageUrl} alt={imageTitle} onClose={handleClose} />
      )}
    </>
  );
};

export default memo(ImageModal);
