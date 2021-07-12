import React, { FC, useEffect, useState } from "react";
import "../UserDashboard/UserDashboard.css";
import { firestore } from "../../Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setUserAction,
  setCollectionsPrivate,
  isImageAction,
  setIndexTabAction,
} from "../../Actions/actionsApp";
import { AppType } from "../../Type/Type";
import { CollectionsPrivateType } from "../../Store/Store";
import UserInfo from "../UI/UserInfo/UserInfo";
import Spinner from "../UI/Spinner/Spinner";
import Tabs from "../UI/Tabs/Tabs";
import Tab from "../UI/Tab/Tab";
import NewCollectionFormPrivate from "../NewCollectionFormPrivate/NewCollectionFormPrivate";
import UserPro from "../UI/UserPro/UserPro";
import DeleteButton from "../UI/DeleteButton/DeleteButton";
import EditModalCollectionPrivate from "../Modals/EditModalCollectionPrivate/EditModalCollectionPrivate";
import ImagesPrivate from "../ImagesPrivate/ImagesPrivate";

type UserDashboardType = {
  match: any;
};

const UserDashboard: FC<UserDashboardType> = ({ match }) => {
  //state
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  const selectIndexTab = (state: AppType) => state.appState.indexTab;
  const indexTab = useSelector(selectIndexTab);

  //actions redux
  const dispatch = useDispatch();

  //history
  const history = useHistory();

  //onClickBtn
  const onClickBtn = (index: number) => {
    dispatch(setIndexTabAction(index));
  };

  //onMouseDownLink
  const onMouseDownLink = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpLink
  const onMouseUpLink = (event: any, userCollectionId: any) => {
    event.stopPropagation();
    history.push(
      `/users/${match?.params?.userID}/collection_private/${userCollectionId}`
    );
  };

  //onMouseDownDelete
  const onMouseDownDelete = (event: any) => {
    event.stopPropagation();
  };

  //onMouseUpDelete
  const onMouseUpDelete = async (event: any, userCollectionId: any) => {
    event.stopPropagation();
    var r = window.confirm("Really delete?");
    if (r === true) {
      await firestore
        .collection("collections_private")
        .doc(match?.params?.userID)
        .collection("collections_private")
        .doc(userCollectionId)
        .delete();
    }
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
        <Tab label="Images Private">
          {match?.params?.userID === currentUser?.uid &&
          userIsLogged?.user_pro ? (
            <ImagesPrivate user_id={match?.params?.userID} />
          ) : (
            <>
              <h2 style={{ color: "#ffc107", textAlign: "center" }}>
                Private Images is a <UserPro /> feature.
              </h2>
              <h2 style={{ color: "#ffc107", textAlign: "center" }}>
                Contact us: contact@imagesslider.com
              </h2>
            </>
          )}
        </Tab>
        <Tab label="Collections Private">
          <div className="collections_private">
            {match?.params?.userID === currentUser?.uid &&
            userIsLogged?.user_pro ? (
              <>
                <NewCollectionFormPrivate userId={match?.params?.userID} />
                {collectionsPrivate.map(
                  (userCollection: CollectionsPrivateType) => {
                    return (
                      <div
                        onMouseUp={(event) =>
                          onMouseUpLink(event, userCollection.id)
                        }
                        onMouseDown={onMouseDownLink}
                        key={userCollection.id}
                        className="collections_private_link"
                      >
                        <div className="collections_private_content">
                          <h2 className="collections_private_title">
                            {userCollection?.title}
                          </h2>
                          <h4 className="collections_private_images_length">
                            {userCollection?.images_length === 1
                              ? `${userCollection?.images_length} Image`
                              : `${
                                  userCollection?.images_length === undefined
                                    ? 0
                                    : userCollection?.images_length
                                } Images`}
                          </h4>
                        </div>
                        <div className="collections_private_edit_modal">
                          <EditModalCollectionPrivate
                            title={userCollection?.title}
                            userID={match?.params?.userID}
                            userCollectionId={userCollection.id}
                          />
                        </div>
                        {(userCollection?.images_length === 0 ||
                          userCollection?.images_length === undefined) && (
                          <div className="collections_private_delete_button">
                            <DeleteButton
                              title="Delete collection"
                              onMouseDown={onMouseDownDelete}
                              onMouseUp={(event: any) =>
                                onMouseUpDelete(event, userCollection.id)
                              }
                            />
                          </div>
                        )}
                      </div>
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
