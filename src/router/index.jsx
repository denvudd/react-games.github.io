
import MainPage from '../pages/MainPage/MainPage';
import GamesPage from '../pages/GamesPage/GamesPage';
import DevelopersPage from "../pages/DevelopersPage/DevelopersPage";
import SingleGamePage from '../pages/SingleGamePage/SingleGamePage';
import SingleDelevoperPage from '../pages/SingleDelevoperPage/SingleDelevoperPage';
import PublishersPage from "../pages/PublishersPage/PublishersPage";
import SinglePublisherPage from '../pages/SinglePublisherPage/SinglePublisherPage';

export const routes = [
  {path: '/', element: <MainPage/>},
  {path: '/games', element: <GamesPage/>},
  {path: '/games/:slug', element: <SingleGamePage/>},
  {path: '/developers', element: <DevelopersPage/>},
  {path: '/developers/:slug', element: <SingleDelevoperPage/>},
  {path: '/publishers', element: <PublishersPage/>},
  {path: '/publishers/:slug', element: <SinglePublisherPage/>},
]