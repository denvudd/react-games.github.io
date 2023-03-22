
import MainPage from '../pages/MainPage/MainPage';

import PopularGamesPage from '../pages/PopularGamesPage/PopularGamesPage';
import RatingGamesPage from '../pages/RatingGamesPage/RatingGamesPage';
import MetacriticGamesPage from '../pages/MetacriticGamesPage/MetacriticGamesPage';

import DevelopersPage from "../pages/DevelopersPage/DevelopersPage";
import PublishersPage from "../pages/PublishersPage/PublishersPage";
import GenresPage from '../pages/GenresPage/GenresPage';
import PlatformsPage from '../pages/PlatformsPage/PlatformsPage';
import TagsPage from '../pages/TagsPage/TagsPage';

import SingleDelevoperPage from '../pages/SingleDelevoperPage/SingleDelevoperPage';
import SingleGamePage from '../pages/SingleGamePage/SingleGamePage';
import SinglePublisherPage from '../pages/SinglePublisherPage/SinglePublisherPage';
import SingleGenrePage from '../pages/SingleGenrePage/SingleGenrePage';
import SinglePlatformPage from '../pages/SinglePlatformPage/SinglePlatformPage';
import SingleTagPage from '../pages/SingleTagPage/SingleTagPage';

export const routes = [
  {path: '/', element: <MainPage/>},
  {path: '/games', element: <PopularGamesPage/>},
  {path: '/games-by-rating', element: <RatingGamesPage/>},
  {path: '/games-by-metacritic', element: <MetacriticGamesPage/>},
  {path: '/games/:slug', element: <SingleGamePage/>},
  {path: '/developers', element: <DevelopersPage/>},
  {path: '/developers/:slug', element: <SingleDelevoperPage/>},
  {path: '/publishers', element: <PublishersPage/>},
  {path: '/publishers/:slug', element: <SinglePublisherPage/>},
  {path: '/genres', element: <GenresPage/>},
  {path: '/genres/:slug', element: <SingleGenrePage/>},
  {path: '/platforms', element: <PlatformsPage/>},
  {path: '/platforms/:id', element: <SinglePlatformPage/>},
  {path: '/tags', element: <TagsPage/>},
  {path: '/tags/:slug', element: <SingleTagPage/>},
]