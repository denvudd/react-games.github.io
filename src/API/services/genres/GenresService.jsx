import axios from "axios";
import {_APIKEY} from '../../../config';

export default class GenresService {
  static async getGenresList(limit, page) {
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${_APIKEY}`, {
      params: {
        page_size: limit,
        page: page,
      }
    });
    return response;
  }

  static async getGamesByGenreSlug(slug, limit, page, platform) {
    const response = await axios.get(`https://api.rawg.io/api/games?genres=${slug}&key=${_APIKEY}`, {
      params: {
        page_size: limit,
        platforms: platform,
        page: page,
      }
    });
    return response;
  }

  static async getGenreBySlug(slug) {
    const response = await axios.get(`https://api.rawg.io/api/genres/${slug}?key=${_APIKEY}`);
    return response;
  }
}