import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Album from "../Album/Album";
import Spinner from "../UI/Spinner/Spinner";
import "../Albums/Albums.css";
import AllImages from "../AllImages/AllImages";
import { AppType } from "../../Type/Type";
import { setIndexTabAction } from "../../Actions/actionsApp";
import DefaultAlbums from "../DefaultAlbums/DefaultAlbums";
import DefaultVidoes from "../DefaultVideos/DefaultVideos";
import Tabs from "../UI/Tabs/Tabs";
import Tab from "../UI/Tab/Tab";
import HowItWorks from "../HowItWorks/HowItWorks";
import Accordion from "../UI/Accordion/Accordion";

const Albums: FC = () => {
  const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false);

  //state redux
  const selectAlbums = (state: AppType) => state.appState.albums;
  const albums = useSelector(selectAlbums);
  const selectIsLoading = (state: AppType) => state.appState.isLoading;
  const isLoading = useSelector(selectIsLoading);
  // const selectProvider = (state: AppType) => state.appState.login.provider;
  // const provider = useSelector(selectProvider);
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

  //handleClickIsOpen
  const handleClickIsOpen = () => {
    setIsOpenAccordion(!isOpenAccordion);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="albums">
        <Accordion
          title="How it works"
          isOpen={isOpenAccordion}
          handleClick={handleClickIsOpen}
        >
          <HowItWorks />
        </Accordion>
        {/* <h2 className="albums_title">{provider} Albums</h2> */}
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
          <Tab label="Albums">
            <DefaultAlbums />
          </Tab>
          <Tab label="Videos">
            <DefaultVidoes />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Albums;
