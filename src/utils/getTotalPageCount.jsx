export const getTotalPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
} 
