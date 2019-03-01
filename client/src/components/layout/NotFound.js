import React from "react";
import { Link } from "react-router-dom";

const NotFound = props => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">SORRY</h1>
      <h1 className="display-1 text-danger">
        4 <i className="fas fa-smile-wink" /> 4
      </h1>

      <p>
        An error occurred in the Application and your page could not be served.
      </p>

      <Link to="/" className="btn btn-primary">
        <i className="fas fa-backward" /> Go back
      </Link>
    </div>
  );
};
export default NotFound;
