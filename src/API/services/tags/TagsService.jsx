import axios from "axios";
import {_APIKEY} from '../../../config';

export default class TagsService {
  static async getTagssList(limit, page) {
    const response = await axios.get(`https://api.rawg.io/api/tags?key=${_APIKEY}`, {
      params: {
        page_size: limit,
        page: page,
      }
    });
    return response;
  }

  static async getGamesByTagSlug(slug, limit, page, platform) {
    const response = await axios.get(`https://api.rawg.io/api/games?tags=${slug}&key=${_APIKEY}`,{
      params: {
        page_size: limit,
        platforms: platform,
        page: page,
      }
    });
    return response;
  }

  static async getTagBySlug(slug) {
    const response = await axios.get(`https://api.rawg.io/api/tags/${slug}?key=${_APIKEY}`);
    return response;
  }
}