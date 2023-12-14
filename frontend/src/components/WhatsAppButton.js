import React from 'react';

const WhatsAppButton = () => {
  return (
    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 100
    }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="50" height="50" />
    </a>
  );
};

export default WhatsAppButton;