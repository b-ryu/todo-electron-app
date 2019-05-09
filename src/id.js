const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const idLength = 20;

export default () => {
  var newID = '';
  for (var i = 0; i < idLength; ++i) {
    newID += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return newID;
}