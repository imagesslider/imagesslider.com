import React, { FC, useEffect, useState } from "react";
import "../UserDashboard/UserDashboard.css";
import { firestore } from "../../Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setUserAction,
  setCollectionsPrivate,
  isImageAction,
} from "../../Actions/actionsApp";
import { AppType } from "../../Type/Type";
import { CollectionsPrivateType } from "../../Store/Store";
import UserInfo from "../UI/UserInfo/UserInfo";
import Spinner from "../UI/Spinner/Spinner";
import Tabs from "../UI/Tabs/Tabs";
import Tab from "../UI/Tab/Tab";
import NewCollectionFormPrivate from "../NewCollectionFormPrivate/NewCollectionFormPrivate";
import UserPro from "../UI/UserPro/UserPro";

type UserDashboardType = {
  match: any;
};

const UserDashboard: FC<UserDashboardType> = ({ match }) => {
  //state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [indexTab, setIndexTab] = useState<number>(0);

  //state redux
  const selectCurrentUser = (state: AppType) => state.appState.currentUser;
  const currentUser = useSelector(selectCurrentUser);
  const selectCollectionsPrivate = (state: AppType) =>
    state.appState.collectionsPrivate;
  const collectionsPrivate = useSelector(selectCollectionsPrivate);
  const selectUser = (state: AppType) => state.appState.user;
  const user = useSelector(selectUser);
  const selectUserIsLogged = (state: AppType) => state.appState.userIsLogged;
  const userIsLogged = useSelector(selectUserIsLogged);

  //actions redux
  const dispatch = useDispatch();

  //onClickBtn
  const onClickBtn = (index: number) => {
    setIndexTab(index);
  };

  useEffect(() => {
    dispatch(isImageAction(false));
    const unmount = firestore
      .collection("users")
      .doc(match?.params?.userID)
      .onSnapshot((snapshot) => {
        dispatch(setUserAction(snapshot.data()));
        setIsLoading(false);
      });
    return unmount;
  }, [dispatch, match]);

  useEffect(() => {
    if (match?.params?.userID === currentUser?.uid) {
      const unmount = firestore
        .collection("collections_private")
        .doc(match?.params?.userID)
        .collection("collections_private")
        .onSnapshot((snapshot) => {
          let userCollections = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          dispatch(setCollectionsPrivate(userCollections));
          setIsLoading(false);
        });
      return unmount;
    }
  }, [dispatch, match, currentUser]);

  //isLoading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="user_dashboard">
      <UserInfo
        user_image={user?.user_image}
        first_name={user?.first_name}
        last_name={user?.last_name}
        user_pro={user?.user_pro}
      />
      <Tabs activeIndex={indexTab} onClick={onClickBtn}>
        <Tab label="Collections Private">
          <div className="collections_private">
            {match?.params?.userID === currentUser?.uid &&
            userIsLogged?.user_pro ? (
              <>
                <NewCollectionFormPrivate userId={match?.params?.userID} />
                {collectionsPrivate.map(
                  (userCollection: CollectionsPrivateType) => {
                    return (
                      <Link
                        to={`/users/${match?.params?.userID}/collection_private/${userCollection.id}`}
                        key={userCollection.id}
                        className="collections_private_link"
                      >
                        <div className="collections_private_content">
                          <h2 className="collections_private_title">
                            {userCollection?.title}
                          </h2>
                        </div>
                      </Link>
                    );
                  }
                )}
              </>
            ) : (
              <>
                <h2 style={{ color: "#ffc107", textAlign: "center" }}>
                  Private Collection is a <UserPro /> feature.
                </h2>
                <h2 style={{ color: "#ffc107", textAlign: "center" }}>
                  Contact us: contact@imagesslider.com
                </h2>
              </>
            )}
          </div>
        </Tab>
        <Tab label="Images Public">
          <h2 style={{ color: "#ffc107" }}>Images Public</h2>
        </Tab>
        <Tab label="Collections Public">
          <h2 style={{ color: "#ffc107" }}>Collections Public</h2>
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
