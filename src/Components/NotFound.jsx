import React from "react";
import { Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <>
      <style>
        {`
          /* Make the entire viewport fill and show a blue gradient */
          .error-page {
            min-height: 100vh;
            background: linear-gradient(45deg, #E8343F 0%, #E8343F 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }

          /* Restrict the width & center the text */
          .error-container {
            max-width: 600px;
            text-align: center;
          }

          /* Large pulsating “404” text with gradient fill effect */
          .error-code {
            font-size: 12rem;
            font-weight: 900;
            background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0.5));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: pulse 2s infinite;
            margin: 0;
            line-height: 1;
          }

          /* Slightly faded white color for the message */
          .error-message {
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 2rem;
          }

          /* Pulse animation keyframes */
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }

          /* Transparent “glass” button style */
          .btn-glass {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            transition: all 0.3s ease;
          }

          .btn-glass:hover {
            background: rgba(255, 255, 255, 0.3);
            color: white;
          }
        `}
      </style>

      <div className="error-page">
        <div className="error-container">
          <h1 className="error-code">404</h1>
          <h4 className="error-message">Page Not Found</h4>
          <p className="error-message">
            Oops! We can’t find the page you’re looking for.
          </p>
          <Button
            href="/"
            variant="light"
            className="btn-glass"
            style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}
          >
            Go Back Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
