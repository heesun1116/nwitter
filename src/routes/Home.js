import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  // const getNweets = async () => {
  //   const dbNweets = await dbService.collection("nweets").get();
  //   dbNweets.forEach((document) => {
  //     const nweetObjcet = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setNweets((prev) => [nweetObjcet, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getNweets();
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div className="">
        {nweets.map((nweet) => (
          <Nweet
            nweetObj={nweet}
            key={nweet.id}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
