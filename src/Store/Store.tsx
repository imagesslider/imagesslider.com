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
  description?: string | undefined | null;
  user?: string;
  userLink?: string | undefined;
  url?: string | undefined;
};

export type UserType = {
  created_at?: any;
  user_image?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  email?: string | undefined;
  user_pro?: boolean | undefined;
  user_id?: string;
};

export type CollectionsPrivateType = {
  id?: string | number;
  title?: string;
  coverPhoto?: string;
  totalPhotos?: number;
  images?: Array<ImageType>;
};

export type CollectionPrivateType = {
  id?: string | number;
  title?: string;
  coverPhoto?: string;
  totalPhotos?: number;
  images?: Array<ImageType>;
};

export type DefaultAlbumType = {
  id?: string;
  name?: string;
  images?: any;
};

export type DefaultVideoType = {
  id?: string;
  name?: string;
  images?: any;
  videoImage?: string;
};

export type Store = {
  login: {
    isLogged: boolean;
    provider: string | null;
    token: string | null;
  };
  user: UserType;
  albums: Array<AlbumType>;
  defaultAlbums: Array<DefaultAlbumType>;
  defaultVideos: Array<DefaultVideoType>;
  selelctedAlbumId: string | null;
  images: Array<ImageType>;
  isLoading: boolean;
  redirect: boolean;
  totalPages: number;
  noContent: string;
  collectionsPrivate: Array<CollectionsPrivateType>;
  collectionPrivate: any;
  totalPagesCollections: number;
  indexTab: number;
  nextPageToken: string;
  fullscreen: boolean;
  fetchAllImages: boolean;
  showDropDown: boolean;
  theme: string;
  signInAndOut: boolean | null;
  currentUser: any;
  inImage: boolean;
  userIsLogged: any;
};

export const initalStore: Store = {
  login: {
    isLogged: false,
    provider: null,
    token: null,
  },
  user: {
    user_image: "",
    first_name: "",
    last_name: "",
    email: "",
    user_pro: false,
    created_at: "",
    user_id: "",
  },
  albums: [],
  defaultAlbums: [],
  defaultVideos: [],
  selelctedAlbumId: null,
  images: [],
  isLoading: false,
  redirect: false,
  totalPages: 0,
  noContent: "",
  collectionsPrivate: [],
  collectionPrivate: [],
  totalPagesCollections: 0,
  indexTab: 0,
  nextPageToken: "",
  fullscreen: false,
  fetchAllImages: true,
  showDropDown: false,
  theme: "dark",
  signInAndOut: null,
  currentUser: null,
  inImage: false,
  userIsLogged: null,
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

//SpeechRecognition
export type StoreSpeechRecognition = {
  recognition: any;
  inImages: boolean;
  isListening: boolean;
  backToHome: boolean;
  nextImage: boolean;
  previousImage: boolean;
  pauseAutoSlider: boolean;
  playAutoSlider: boolean;
};

export const initalStoreSpeechRecognition: StoreSpeechRecognition = {
  recognition: null,
  inImages: false,
  isListening: false,
  backToHome: false,
  nextImage: false,
  previousImage: false,
  pauseAutoSlider: false,
  playAutoSlider: false,
};
