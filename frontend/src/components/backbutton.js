import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("");
  };

  return <button onClick={handleClick}>Back</button>;
};

export default BackButton;
