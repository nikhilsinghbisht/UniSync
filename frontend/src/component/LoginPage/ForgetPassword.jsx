import React, { useState } from "react";
import "./ForgetPass.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Reset message state before submitting

    try {
      // Replace the URL below with your backend API endpoint
      const response = await fetch("http://localhost:5001/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("A reset link has been sent to your email address.");
      } else if (response.status === 404) {
        setMessage("Email not found. Please check and try again.");
      } else {
        setMessage(
          "There was an error processing your request. Please try again."
        );
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input type="submit" value="Send Reset Link" />
      </form>
      {message && (
        <div
          className={`message ${
            message.includes("error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
