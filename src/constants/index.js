import Unsplash from 'unsplash-js/native';

//MAKE CONSTANTS OF ACCESS KEY TO USE IT UNIVERSAL
export const ACCESS_KEY =
  'aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5';

//MAKE CONSTANTS OF SECRET KEY TO USE IT UNIVERSAL
export const SECRET_KEY =
  'a5ab4ed2efdc772dca8d5636a26c0d897907df38cd92baa9067e57093d9596b5';

export const unsplash = new Unsplash({
  applicationId: ACCESS_KEY,
  secret: SECRET_KEY,
});
