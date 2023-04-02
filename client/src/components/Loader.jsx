import { Spinner } from "react-bootstrap";
import React from "react";

const Loader = () => {
  return (
    <div>
      <Spinner
        animation="border"
        role="slider"
        style={{
          width: "100px",
          margin: "auto",
          display: "block",
        }}
      >
        <span className="sr-only">Loading....</span>
      </Spinner>
    </div>
  );
};

export default Loader;
