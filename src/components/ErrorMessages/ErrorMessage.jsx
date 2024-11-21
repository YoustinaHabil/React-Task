import React from "react";
import './ErrorMessage.css'

const ErrorMessage = ({ message }) => (
  <div className="error">
    <p>{message}</p>
  </div>
);



export default ErrorMessage;
