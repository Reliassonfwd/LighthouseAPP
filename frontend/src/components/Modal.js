import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../styles/Modal.css"; 

const Modal = ({ onClose, paymentSuccess }) => {
  const [modalContainer] = useState(() => {
    const container = document.createElement("div");
    container.classList.add("modal-container");
    document.body.appendChild(container);
    return container;
  });

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {paymentSuccess ? (
          <>
            <h2>Pago Exitoso</h2>
            <p>¡Gracias por tu pago!</p>
          </>
        ) : (
          <>
            <h2>Pago Rechazado</h2>
            <p>¡Intenta otra vez!</p>
          </>
        )}
      </div>
    </div>,
    modalContainer
  );
};

export default Modal;
