import axios from "axios";

export default class GamesAPI {
  static async getGamesList() {
      const response = await axios.get('https://api.rawg.io/api/games?key=2e30963c61f74dac97f2c89f3b62186e');
      return response;
  }

  static async getGamesByDeveloperId(id) {
    const response = await axios.get(`https://api.rawg.io/api/games?developers=${id}&key=2e30963c61f74dac97f2c89f3b62186e`);
    return response;
  }

  static async getGameById(slug) {
    const response = await axios.get(`https://api.rawg.io/api/games/${slug}?key=2e30963c61f74dac97f2c89f3b62186e`);
    return response;
  }

  static async getGameScreenshotsById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/screenshots?key=2e30963c61f74dac97f2c89f3b62186e`);
    return response;
  }

  static async getGameAchiviementsById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/achievements?key=2e30963c61f74dac97f2c89f3b62186e`);
    return response;
  }

  static async getStoreGameById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/stores?key=2e30963c61f74dac97f2c89f3b62186e`);
    return response;
  }

  static async getDevelopersGameById(slug) {
    const response = await axios.get(`https://api.rawg.io/api/games/${slug}/development-team?key=2e30963c61f74dac97f2c89f3b62186e`);
    return response;
  }

  static async getRedditPostsById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/reddit?key=2e30963c61f74dac97f2c89f3b62186e`);
    return response;
  }

  static async getGameAdditionsById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/additions?key=2e30963c61f74dac97f2c89f3b62186e`);
    return response;
  }

  static async getDevelopersList() {
    const response = await axios.get(`https://api.rawg.io/api/developers?key=2e30963c61f74dac97f2c89f3b62186e`);
    return response;
  }

  static async getDeveloperById(slug) {
    const response = await axios.get(`https://api.rawg.io/api/developers/${slug}?key=2e30963c61f74dac97f2c89f3b62186e`);
    return response;
  }

}