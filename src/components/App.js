import { authService } from "fBase";
import { useEffect, useState } from "react";
import AppRouter from "./Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // get the user who login
      if (user) {
        setIsLoggedIn(true);
        setUserObject({
          displayName: user.displayName,
          uid: user.uid,
          avatar: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
        // put the user into state
      } else {
        setIsLoggedIn(false);
        setUserObject(null);
      }
      setInit(true);
    });
  }, []);
  const refreashUser = () => {
    const user = authService.currentUser;
    console.log(user);
    setUserObject({
      displayName: user.displayName,
      uid: user.uid,
      avatar: user.photoURL,
      updateProfile: (args) => user.updateProfile(args),
    });
    // setUserObject(Object.assign({}, user));
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreashUser={refreashUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializeing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
