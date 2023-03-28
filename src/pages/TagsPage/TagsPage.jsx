import { useState, useEffect, useRef } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';

import TagsService from '../../API/services/tags/TagsService';

import CardList from '../../components/UI/CardList/CardList';
import LoaderContent from '../../components/UI/LoaderContent/LoaderContent';
import Error from '../../components/UI/Error/Error';

import { getTotalPageCount } from '../../utils/getTotalPageCount';

const TagsPage = () => {
  const [tagsList, setTagsList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [getPlatforms, isLoading, error] = useFetching(async () => {
    const response = await TagsService.getTagssList(limit, page);
    setTagsList([...tagsList, ...response.data.results]);

    const totalCount = response.data.count;
    setTotalPages(getTotalPageCount(totalCount, limit))
  });
  const lastElement = useRef();

  useObserver(lastElement, page < totalPages, isLoading, () => {
    setTimeout(() => {
      setPage(page + 1);
    }, 500)
  });

  useEffect(() => {
    getPlatforms();
  }, [page, limit]);
  return (
    <div className="page platforms-page">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Tags</h2>
        </div>
        <div className="platforms-page__wrapper">
        <div className="page__about">
          <div className="page__about-text">
            <p>Tags are essentially keywords or labels that are associated with a particular video game. They are used to categorize games 
              into different genres, themes, or gameplay features, making it easier for you to browse and discover new games that 
              match your preferences.</p>
            <p>For example, if you're a fan of first-person shooters, you can easily find games with the "FPS" tag. Similarly, if you're 
              interested in puzzle games, you can look for games with the "Puzzle" or "Brain Teaser" tags. Tags also help you to refine your search results, 
              by allowing you to filter games based on certain criteria. You can narrow down your search results by selecting multiple tags, such as "Action," 
              "Open World," and "Fantasy," to find games that match your specific interests.</p>
          </div>
          </div>
          <CardList list={tagsList} link="tags" buttonText="More" param="slug"/>
          {error && <Error/>}
        </div>
        <div ref={lastElement} className="observer"></div>
        {(page < totalPages || isLoading) ? <LoaderContent/> : null}
      </div>
    </div>
  );
};

export default TagsPage;