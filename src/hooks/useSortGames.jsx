import { useMemo } from "react";

const useSortGames = (sort, gamesList) => {
  const sortedGames = useMemo(() => {
    if (sort) {
      switch (sort) {
        case 'name':
          return [...gamesList].sort((a, b) => a[sort].localeCompare(b[sort]));
        case 'rating':
          return [...gamesList].sort((a, b) => b[sort] - a[sort]);
        case 'added':
          return [...gamesList].sort((a, b) => a[sort] - b[sort]);
        case 'released':
          return [...gamesList].sort((a, b) => new Date(a[sort]) - new Date(b[sort]));
        default:
          return [...gamesList];
      }
    } else {
      return [...gamesList];
    }  
  }, [sort, gamesList]);

  return sortedGames;
}

export default useSortGames;