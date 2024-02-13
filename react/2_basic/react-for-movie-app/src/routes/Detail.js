import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  console.log(id);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <h1>Detail : {movie.title}</h1>
      <div style={{ display: "flex" }}>
        <div>
          <img src={movie.large_cover_image} alt={movie.title} />
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                padding: "1px 5px",
                background: "gray",
                color: "white",
              }}
            >
              rating
            </div>
            <div
              style={{
                padding: "1px 5px",
                background: "orange",
                color: "black",
              }}
            >
              {movie.rating} / 10
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                padding: "1px 5px",
                background: "gray",
                color: "white",
              }}
            >
              like
            </div>
            <div
              style={{
                padding: "1px 5px",
                background: "red",
                color: "black",
              }}
            >
              {movie.like_count}
            </div>
          </div>
          <ul>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p>{movie.description_full}</p>
        </div>
      </div>
    </div>
  );
}
export default Detail;
