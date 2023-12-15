import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../styles/Modal.css"; 

const Modal = ({ onClose, paymentSuccess }) => {
  // State to manage the modal container element
  const [modalContainer] = useState(() => {
    const container = document.createElement("div");
    container.classList.add("modal-container");
    document.body.appendChild(container);
    return container;
  });

  /**
   * Renders a modal overlay with dynamic content.
   * @component
   * @param {function} onClose - A function to handle the modal closure.
   * @param {boolean} paymentSuccess - Indicates whether the payment was successful.
   * @return {JSX.Element} - The rendered component.
   */
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {/* Dynamic content based on payment success status */}
        {paymentSuccess ? (
          <>
            <h2>Payment successfully</h2>
            <p>Thanks for your payment!</p>
          </>
        ) : (
          <>
            <h2>Payment denied</h2>
            <p>Try again!</p>
          </>
        )}
      </div>
    </div>,
    modalContainer
  );
};

// Export:
// - Exports the Modal component as the default export.
export default Modal;
