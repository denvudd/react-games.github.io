import { useState, useEffect } from "react";

import GamesAPI from "../../API/GamesAPI";

import Loader from "../../components/UI/Loader/Loader";

import { formatDate } from '../../utils/formatDate';

import './gameRedditPosts.scss';

const GameRedditPosts = ({id}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await GamesAPI.getRedditPostsById(id);
    setPosts(response.data.results);
    setIsLoading(false);
  }
  
  console.log(posts);
  return (
    <div className="game-reddit__inner">
      {isLoading
            ? <Loader/>
            : posts.map(post => {
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
      }
    </div>
  );
};

export default GameRedditPosts;