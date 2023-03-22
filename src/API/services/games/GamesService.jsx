import axios from "axios";
import {_APIKEY} from '../../../config';

export default class GamesService {
  static async getGamesList(limit = 20, page = 1, platform) {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${_APIKEY}`, {
      params: {
        platforms: platform,
        page_size: limit,
        page: page,
      }
    });
    return response;
  }

  static async getGamesListBySearch(query, limit, page) {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${_APIKEY}`, {
      params: {
        search: query,
        page_size: limit,
        page: page,
      }
    });
    return response;
  }

  static async getGamesListByParam(param, limit = 20, page = 1, platform) {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${_APIKEY}`, {
      params: {
        ordering: param,
        platforms: platform,
        page_size: limit,
        page: page,
      }
    });
    return response;
  }

  static async getGameBySlug(slug) {
    const response = await axios.get(`https://api.rawg.io/api/games/${slug}?key=${_APIKEY}`);
    return response;
  }

  static async getGameAchiviementsById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/achievements?key=${_APIKEY}`);
    return response;
  }

  static async getGameScreenshotsById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/screenshots?key=${_APIKEY}`);
    return response;
  }

  static async getStoreGameById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/stores?key=${_APIKEY}`);
    return response;
  }

  static async getRedditPostsById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/reddit?key=${_APIKEY}`);
    return response;
  }

  static async getGameAdditionsById(id) {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}/additions?key=${_APIKEY}`);
    return response;
  }
}