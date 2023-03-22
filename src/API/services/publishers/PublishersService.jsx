import axios from "axios";
import {_APIKEY} from '../../../config';

export default class PublishersService {
  static async getPublishersList(limit, page) {
    const response = await axios.get(`https://api.rawg.io/api/publishers?key=${_APIKEY}`, {
      params: {
        page_size: limit,
        page: page,
      }
    });
    return response;
  }

  static async getGamesByPublisherSlug(slug, limit, page, platform) {
    const response = await axios.get(`https://api.rawg.io/api/games?publishers=${slug}&key=${_APIKEY}`,{
      params: {
        page_size: limit,
        platforms: platform,
        page: page,
      }
    });
    return response;
  }

  static async getPublisherBySlug(slug) {
    const response = await axios.get(`https://api.rawg.io/api/publishers/${slug}?key=${_APIKEY}`);
    return response;
  }
}