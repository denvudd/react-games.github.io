import axios from "axios";
import {_APIKEY} from '../../../config';

export default class PlatformsService {
  static async getPlatformsList(limit, page) {
    const response = await axios.get(`https://api.rawg.io/api/platforms?key=${_APIKEY}`, {
      params: {
        page_size: limit,
        page: page,
      }
    });
    return response;
  }

  static async getGamesByPlatformId(id, limit, page) {
    const response = await axios.get(`https://api.rawg.io/api/games?platforms=${id}&key=${_APIKEY}`,{
      params: {
        page_size: limit,
        page: page,
      }
    });
    return response;
  }

  static async getPlatformById(id) {
    const response = await axios.get(`https://api.rawg.io/api/platforms/${id}?key=${_APIKEY}`);
    return response;
  }
}