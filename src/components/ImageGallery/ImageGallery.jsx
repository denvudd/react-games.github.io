function Gallery({ screenshots }) {
  console.log(screenshots);
  return (
    <div className="gallery">
      {screenshots.map(screenshot => (
        <img key={screenshot.id} src={screenshot.image} alt="" />
      ))}
    </div>
  );
}

export default Gallery;