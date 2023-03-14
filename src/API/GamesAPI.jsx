import axios from "axios";

export default class GamesAPI {
  static async getGamesList() {
      const response = await axios.get('https://api.rawg.io/api/games?key=2e30963c61f74dac97f2c89f3b62186e');
      return response;
  }

  static async getGameById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=2e30963c61f74dac97f2c89f3b62186e`);
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

  static async getDevelopersGameById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/development-team?key=2e30963c61f74dac97f2c89f3b62186e`);
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
}