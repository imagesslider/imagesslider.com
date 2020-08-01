import { Store, StoreSlider, StoreSearch } from "../Store/Store";

export type AppType = {
  appState: Store;
};

//SliderType
export type SliderType = {
  slider: StoreSlider;
};

//SearchType
export type SearchType = {
  search: StoreSearch;
};
