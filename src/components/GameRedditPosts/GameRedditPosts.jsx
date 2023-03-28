import { useState, useEffect } from "react";
import { useFetching } from "../../hooks/useFetching";

import GamesService from "../../API/services/games/GamesService";

import Loader from "../UI/Loader/Loader";
import Error from "../UI/Error/Error";

import { formatDate } from '../../utils/formatDate';

import './gameRedditPosts.scss';

const GameRedditPosts = ({id}) => {
  const [posts, setPosts] = useState([]);
  const [getPosts, isLoading, error] = useFetching(async () => {
    const response = await GamesService.getRedditPostsById(id);
    setPosts(response.data.results);
  });

  useEffect(() => {
    getPosts();
  }, [id]);

  const postsContent = posts.length !== 0
    ? posts.map(post => {
      return <div key={post.id} className="game-reddit__post">
        <a href={post.url} className="game-reddit__post-head">
          {post.image === null 
            ? null 
            : <div className="game-reddit__post-photo">
              <img src={post.image} alt="reddit-post" />
            </div> 
          }
         <div className="game-reddit__post-name">{post.name}</div>
        </a>
        <div className="game-reddit__post-meta">
          <div className="game-reddit__post-date">{formatDate(post.created)}</div>
          <div className="game-reddit__post-separator">|</div>
          <a href={post.username_url} target="_blank" rel="noreferrer" className="game-reddit__post-username">{post.username}</a>
        </div>
      </div>
    })
    : <div>There is no Reddit posts</div>
  
  return (
    <div className="game-reddit__inner">
      {isLoading
            ? <Loader/>
            : postsContent
      }
      {error && <Error/>}
    </div>
  );
};

export default GameRedditPosts;