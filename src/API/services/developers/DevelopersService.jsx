import axios from "axios";
import {_APIKEY} from '../../../config';

export default class DevelopersService {
  static async getDevelopersList(limit, page) {
    const response = await axios.get(`https://api.rawg.io/api/developers?key=${_APIKEY}`, {
      params: {
        page_size: limit,
        page: page,
      }
    });
    return response;
  }

  static async getGamesByDeveloperId(id) {
    const response = await axios.get(`https://api.rawg.io/api/games?developers=${id}&key=${_APIKEY}`);
    return response;
  }

  static async getDevelopersGameById(slug) {
    const response = await axios.get(`https://api.rawg.io/api/games/${slug}/development-team?key=${_APIKEY}`);
    return response;
  }

  static async getDeveloperById(slug) {
    const response = await axios.get(`https://api.rawg.io/api/developers/${slug}?key=${_APIKEY}`);
    return response;
  }
}