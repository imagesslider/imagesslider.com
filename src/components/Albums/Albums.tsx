import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import Album from "../Album/Album";
import Spinner from "../UI/Spinner/Spinner";
import "../Albums/Albums.css";
import AllImages from "../AllImages/AllImages";
import { AppType } from "../../Type/Type";
import { setIndexTabAction } from "../../Actions/actionsApp";
import DefaultAlbums from "../DefaultAlbums/DefaultAlbums";
import Tabs from "../UI/Tabs/Tabs";
import Tab from "../UI/Tab/Tab";
import DefaultCollections from "../DefaultCollections/DefaultCollections";

const Albums: FC = () => {
  //state redux
  const selectAlbums = (state: AppType) => state.appState.albums;
  const albums = useSelector(selectAlbums);
  const selectIsLoading = (state: AppType) => state.appState.isLoading;
  const isLoading = useSelector(selectIsLoading);
  const selectProvider = (state: AppType) => state.appState.login.provider;
  const provider = useSelector(selectProvider);
  const selectIndexTab = (state: AppType) => state.appState.indexTab;
  const indexTab = useSelector(selectIndexTab);
  const selectFetchAllImages = (state: AppType) =>
    state.appState.fetchAllImages;
  const fetchAllImages = useSelector(selectFetchAllImages);

  //actions redux
  const dispatch = useDispatch();

  //onClickBtn
  const onClickBtn = (index: number) => {
    dispatch(setIndexTabAction(index));
  };

  return (
    <div className="albums">
      {isLoading && <Spinner />}
      <h2 className="albums_title">{provider} Albums</h2>
      {fetchAllImages ? (
        <div className="albums_wrapper">
          <AllImages />
          {!!albums &&
            albums.map((album) => {
              return <Album key={album.id} {...album} />;
            })}
        </div>
      ) : (
        <p className="allimages">No content available.</p>
      )}
      <Tabs activeIndex={indexTab} onClick={onClickBtn}>
        <Tab label="Collections">
          <DefaultCollections />
        </Tab>
        <Tab label="Albums">
          <DefaultAlbums />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Albums;
