import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import {useParams, Link} from 'react-router-dom';
import ReviewForm from '../../components/review-form/ReviewForm';
import IconsPlayer from '../../components/icons-player/icons-player';
import {useAppSelector} from '../../hooks';
import {getFilm} from '../../store/site-data/selectors';

function AddReviewScreen(): JSX.Element {
  const film = useAppSelector(getFilm);

  const params = useParams();
  const id = `${(params.id ? params.id.slice(1) : '0')}`;
  //const film = films.find((item) => item.id === Number.parseInt(id, 10)) || films[0];

  return (
    <>
      <IconsPlayer />

      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo />

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/:${film?.id}`} className="breadcrumbs__link">{film?.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={`/films/:${film?.id}/review`}>Add review</Link>
                </li>
              </ul>
            </nav>

            <UserBlock/>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={film?.backgroundImage} alt={film?.name} width="218" height="327" />
          </div>
        </div>

        <ReviewForm filmId={id} />

      </section>
    </>
  );
}

export default AddReviewScreen;
