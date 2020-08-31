export type AlbumType = {
  id?: string;
  title?: string;
  productUrl?: string;
  mediaItemsCount?: string | number;
  coverPhotoBaseUrl?: string;
  coverPhotoMediaItemId?: string;
};

export type ImageType = {
  id?: string;
  src?: string;
  alt?: string;
  videoType?: string;
  srcVideo?: string;
  description?: string;
};

export type UserType = {
  image?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type DefaultCollectionType = {
  id?: string | number;
  title?: string;
  coverPhoto?: string;
  totalPhotos?: number;
};

export type Store = {
  login: {
    isLogged: boolean;
    provider: string | null;
    token: string | null;
    user: UserType;
  };
  albums: Array<AlbumType>;
  selelctedAlbumId: string | null;
  images: Array<ImageType>;
  isLoading: boolean;
  redirect: boolean;
  totalPages: number;
  noContent: string;
  defaultCollections: Array<DefaultCollectionType>;
  totalPagesCollections: number;
  indexTab: number;
  nextPageToken: string;
  fullscreen: boolean;
  fetchAllImages: boolean;
};

export const initalStore: Store = {
  login: {
    isLogged: false,
    provider: null,
    token: null,
    user: {
      image: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  },
  albums: [],
  selelctedAlbumId: null,
  images: [],
  isLoading: false,
  redirect: false,
  totalPages: 0,
  noContent: "",
  defaultCollections: [],
  totalPagesCollections: 0,
  indexTab: 0,
  nextPageToken: "",
  fullscreen: false,
  fetchAllImages: false,
};

//slider store
export type StoreSlider = {
  autoSlider: boolean;
  intervalTime: number;
};

export const initalStoreSlider: StoreSlider = {
  autoSlider: true,
  intervalTime: 20000,
};

//slider search
export type StoreSearch = {
  search: string;
  query: string;
  providerSearch: string;
};

export const initalStoreSearch: StoreSearch = {
  search: "",
  query: "",
  providerSearch: "",
};
