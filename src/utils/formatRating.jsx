export const formatRating = (ratingString) => {
  const formattedRating = parseFloat(ratingString).toFixed(2);
    // Проверяем, есть ли входное значение десятичное значение
    if (formattedRating.split(".")[0] === "00") {
      return formattedRating + ".00";
    } else {
      return formattedRating;
    }
}