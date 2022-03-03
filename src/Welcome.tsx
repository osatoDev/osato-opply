import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div>
      <h3>Welcome to Opply</h3>

      <Link to="/signIn">
        <button>Sign in</button>
      </Link>
      <Link to="/signUp">
        <button>Sign up</button>
      </Link>
    </div>
  );
}

export default Welcome;
