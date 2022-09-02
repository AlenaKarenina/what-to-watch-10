import {Link} from 'react-router-dom';
import {Film} from '../../types/films';
import {Dispatch, SetStateAction} from 'react';
import VideoPlayer from '../video-player/video-player';
import {useState} from 'react';

type FilmCardProps = {
  film: Film,
  activeFilmCard: number | undefined,
  setActive: Dispatch<SetStateAction<number | undefined>>,
}

function FilmCard({film, setActive, activeFilmCard}: FilmCardProps): JSX.Element {

  const [isActive, setIsActive] = useState(false);

  let timer: null | ReturnType<typeof setTimeout> = null;

  const handleMouseEnter = () => {

    setIsActive(false);

    timer = setTimeout(() => {
      setActive(film.id);
    }, 100);
  };

  const handleMouseLeave = () => {
    setActive(undefined);

    setIsActive(true);

    if (timer) {
      clearTimeout(timer);
    }
  };

  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
    >
      <div className={`small-film-card__image ${isActive ? 'small-film-card__image--active' : '' }`}>
        <img src={film.posterImage} alt="video" />
        <VideoPlayer
          width="280"
          height="175"
          isPlaying={activeFilmCard === film.id}
          posterImage={film.posterImage}
          previewVideoLink={film.previewVideoLink}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/:${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
