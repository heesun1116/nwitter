import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/" style={{ marginRight: 10 }}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <span style={{ marginTop: 10 }}>
            {userObj?.displayName
              ? `${userObj.displayName}의 Profile`
              : "Profile"}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
