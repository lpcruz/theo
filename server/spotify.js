class Spotify {
  constructor(api) {
    this.api = api;
  }
  
  async getToken() {
    const res = await this.api.clientCredentialsGrant();
    return res.body['access_token'];
  }
  
  async setToken(token) {
    await this.api.setAccessToken(token);
  }

  async search(track, artist) {
    try {
      const res = await this.api.searchTracks(`track:${track} artist:${artist}`);
      console.log(res.body.tracks.items)
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  
  async searchPlaylists(query) {
    try {
      const token = await this.getToken();
      await this.setToken(token);
      const res = await this.api.searchPlaylists(query);
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

module.exports = Spotify;