import { authService, dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { v4 as uuid4 } from "uuid";

function Profile({ userObj, refreashUser }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [attachment, setAttachment] = useState("null");
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuid4()}`); // file on the air , make the reference for file
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    console.log(attachmentUrl);

    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
        photoURL: attachmentUrl,
      });
    }
    refreashUser();
  };
  const getMynweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    // console.log(nweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMynweets();
  }, []);
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={newDisplayName}
          onChange={onChange}
          type="text"
          placeholder="Display Name"
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Update Profile" />
      </form>
      <img src={userObj.avatar} />
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
}

export default Profile;
