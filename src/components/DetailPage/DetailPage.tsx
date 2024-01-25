import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Button } from 'antd';
import imageAsset from '../../assets/noimage.jpeg';
import './DetailPage.scss';

interface MovieDetails {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Plot: string;
  Director: string;
  imdbRating: string;
  Actors: string;
}

const DetailPage: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const defaultPosterUrl =
    imageAsset ||
    'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg';

  useEffect(() => {
    const API_URL = `https://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.REACT_APP_API_KEY}`;
    fetch(API_URL)
      .then((response) => response.json())
      .then((data: MovieDetails) => setMovieDetails(data))
      .catch((error) => console.error(error));
  }, [imdbID]);

  if (!movieDetails) {
    return <Spin />;
  }

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <>
      <div className="movie_card" id="tomb">
        <div className="info_section">
          <div className="movie_header">
            <img
              className="locandina"
              src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : defaultPosterUrl}
              alt="movie"
            />
            <h1>{movieDetails.Title} </h1>
            <h4>{movieDetails.Year !== 'N/A' ? movieDetails.Year : 'Unknown'}</h4>
            <span className="minutes">
              {movieDetails.Runtime !== 'N/A' ? movieDetails.Runtime : 'Unknown'}
            </span>
            <p className="type">{movieDetails.Genre !== 'N/A' ? movieDetails.Genre : 'No Type'}</p>
          </div>
          <div className="movie_desc">
            <p className="text">
              {movieDetails.Plot !== 'N/A' ? movieDetails.Plot : 'No Description'}
            </p>
            <p className="text">
              <h4>{`Director: ${
                movieDetails.Director !== 'N/A' ? movieDetails.Director : 'No Name'
              }`}</h4>
            </p>
            <p className="text">
              <span className="minutes">{`Ratings: ${
                movieDetails.imdbRating !== 'N/A' ? movieDetails.imdbRating : 'No Rating'
              }`}</span>
            </p>
          </div>
          <div className="movie_actor">
            <ul>
              <li>
                <i>{`Actors: ${
                  movieDetails.Actors !== 'N/A' ? movieDetails.Actors : 'No Name'
                }`}</i>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="blur_back"
          style={{
            background: movieDetails.Poster !== 'N/A' ? `url(${movieDetails.Poster}), #0a0a0a` : '#0a0a0a',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>
      <div className="back-button">
        <Button type="dashed" onClick={handleBackClick}>
          Back to Search
        </Button>
      </div>
    </>
  );
};

export default DetailPage;
