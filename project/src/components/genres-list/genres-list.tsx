import {Link} from 'react-router-dom';

import {Film} from '../../types/films';
import {DEFAULT_ACTIVE_GENRE} from '../../const';
import {getGenre} from '../../store/site-data/selectors';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setActiveGenre, getFilteredGenre, resetFilmsCount} from '../../store/action';

type GenresListProps = {
  films: Film[],
};

function GenresList({films}: GenresListProps): JSX.Element {

  const dispatch = useAppDispatch();
  const {activeGenre} = useAppSelector(getGenre);

  const genres = [DEFAULT_ACTIVE_GENRE, ...new Set(films.map((item) => item.genre))];

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item ${genre === activeGenre ? 'catalog__genres-item--active' : ''}`}>
          <Link to="#" className="catalog__genres-link"
            onClick={() => {
              dispatch(setActiveGenre(genre));
              dispatch(getFilteredGenre());
              dispatch(resetFilmsCount());
            }}
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
