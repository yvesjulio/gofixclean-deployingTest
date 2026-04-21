import React from "react";
import whatsappImg from "/images/whatsapp.png";

const WhatsAppButton: React.FC = () => {
  return (
    <>
      <a
        href="https://wa.me/250780816439"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 50,
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: "forwardBackward 1.5s ease-in-out infinite",
        }}
      >
        <img src={whatsappImg} alt="WhatsApp" className="h-10 w-10" />
      </a>

      <style>
        {`
          @keyframes forwardBackward {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
          }
        `}
      </style>
    </>
  );
};

export default WhatsAppButton;