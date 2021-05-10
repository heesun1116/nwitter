import { authService } from "fBase";
import React from "react";
import { useHistory } from "react-router";

function Profile(props) {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
}

export default Profile;
