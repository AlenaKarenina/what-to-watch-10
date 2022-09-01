import {Link} from 'react-router-dom';
import {Film} from '../../types/films';
import {Dispatch, SetStateAction} from 'react';
import VideoPlayer from '../video-player/video-player';

type FilmCardProps = {
  film: Film,
  activeFilmCard: number | undefined,
  setActive: Dispatch<SetStateAction<number | undefined>>
}

function FilmCard({film, setActive, activeFilmCard}: FilmCardProps): JSX.Element {

  let timer: null | ReturnType<typeof setTimeout> = null;

  const handleMouseEnter = () => {

    timer = setTimeout(() => {
      setActive(film.id);
    }, 100);
  };

  const handleMouseLeave = () => {
    setActive(undefined);

    if (timer) {
      clearTimeout(timer);
    }
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="small-film-card__image">
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
