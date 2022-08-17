/* eslint-disable no-console */
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Film} from '../../types/films';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {AppRoute, MORE_LIKE_FILM_COUNT, APIRoute, AuthorizationStatus} from '../../const';
import Tabs from '../../components/tabs/tabs';
import {Review} from '../../types/reviews';
import SimilarListCards from '../../components/similar-list-cards/similar-list-cards';
import IconsPlayer from '../../components/icons-player/icons-player';
import {useEffect, useState} from 'react';
import {api} from '../../store';
import {useAppDispatch, useAppSelector} from '../../hooks/';
import {fetchSimilarFilmsAction} from '../../store/api-actions';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type MoviePageScreenProps = {
  films: Film[],
  comments: Review[]
}

function MoviePageScreen({films, comments}: MoviePageScreenProps): JSX.Element {

  const navigate = useNavigate();
  const params = useParams();
  const id = `${(params.id ? params.id.slice(1) : '0')}`;
  const film = films.find((item) => item.id === Number.parseInt(id, 10)) || films[0];

  const [reviews, setReviews] = useState<Review[]>([]);

  const similarFilms = films
    .slice(0, MORE_LIKE_FILM_COUNT);

  const handlePlayBtnClick = () => {
    const path = `/player/:${film.id}`;
    navigate(path);
  };

  const handleMyListBtnClick = () => {
    navigate(AppRoute.MyList);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    api.get<Review[]>(`${APIRoute.Comments}/${id}`).then((data) => {
      setReviews(data.data);
    });
    dispatch(fetchSimilarFilmsAction(Number(id)));
  }, [id]);

  const {authorizationStatus} = useAppSelector((state) => state);

  if (!film) {
    return <NotFoundScreen/>;
  }

  return (
    <>
      <IconsPlayer />

      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={handlePlayBtnClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={handleMyListBtnClick}>
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{films.length}</span>
                </button>

                {authorizationStatus === AuthorizationStatus.Auth &&
                  <Link to={`/films/:${film.id}/review`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs film={film} comments={reviews}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">

        <SimilarListCards films={similarFilms}/>

        <Footer />
      </div>
    </>
  );
}

export default MoviePageScreen;
