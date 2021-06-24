import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fBase";
import React, { useState } from "react";

const Auth = () => {
  const onSocailClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div>
      <AuthForm />
      <div className="">
        <button onClick={onSocailClick} name="google">
          Continue with Goggle
        </button>
        <button onClick={onSocailClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
