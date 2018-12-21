import SC from 'soundcloud';
const ID = 1137863;

export default {
  init() {

    console.debug('Initializing Soundcloud');

    var init = SC.initialize({
      client_id: 'dc225db7d84c207beaabdc54e60acdcd',
      redirect_uri: 'localhost:3000'
    });

    return this;

  },

  getPlaylists() {
    console.debug('Getting Playlists');
    this.init();
    return SC.get(`/users/${ID}/playlists`);
  }
};
