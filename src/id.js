const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const ID_LENGTH = 20;


export default () => {
  let newID = '';

  for (var i = 0; i < ID_LENGTH; ++i) {
    newID += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }

  return newID;
}
