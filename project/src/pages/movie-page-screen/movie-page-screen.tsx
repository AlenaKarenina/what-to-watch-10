import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {AppRoute, APIRoute, AuthorizationStatus, MORE_LIKE_FILM_COUNT} from '../../const';
import Tabs from '../../components/tabs/tabs';
import {Review} from '../../types/reviews';
import SimilarListCards from '../../components/similar-list-cards/similar-list-cards';
import IconsPlayer from '../../components/icons-player/icons-player';
import {useEffect, useState} from 'react';
import {api} from '../../store';
import {useAppDispatch, useAppSelector} from '../../hooks/';
import {fetchSimilarFilmsAction, fetchFilmAction, fetchFavoriteFilmsAction, changeFilmStatusAction} from '../../store/api-actions';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {getSimilarFilmsList, getFilm, getFavoriteFilms, getFavoriteStatusChange} from '../../store/site-data/selectors';
import {resetFavoriteStatus} from '../../store/site-data/site-data';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {redirectToRoute} from '../../store/action';

function MoviePageScreen(): JSX.Element {

  const navigate = useNavigate();
  const params = useParams();
  const id = `${(params.id ? params.id.slice(1) : '0')}`;

  const [reviews, setReviews] = useState<Review[]>([]);

  const similarFilmsList = useAppSelector(getSimilarFilmsList);
  const film = useAppSelector(getFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const favoriteChangeStatus = useAppSelector(getFavoriteStatusChange);

  const similarFilms = similarFilmsList
    .slice(0, MORE_LIKE_FILM_COUNT);

  const handlePlayBtnClick = () => {
    const path = `/player/:${film?.id}`;
    navigate(path);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    api.get<Review[]>(`${APIRoute.Comments}/${id}`).then((data) => {
      setReviews(data.data);
    });
    dispatch(fetchFilmAction(Number(id)));
    dispatch(fetchSimilarFilmsAction(Number(id)));
  }, [id, dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [dispatch, authorizationStatus]);

  useEffect(() => {
    if (favoriteChangeStatus) {
      dispatch(fetchFilmAction(Number(id)));
      dispatch(resetFavoriteStatus(true));
    }
  }, [dispatch, id, favoriteChangeStatus]);

  if (!film) {
    return <NotFoundScreen/>;
  }

  //Обновление кнопки My list
  const getFavoriteIcon = (status: boolean): JSX.Element => {
    if (status) {
      return (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
    );
  };
  const favoriteIcon = getFavoriteIcon(film?.isFavorite);

  //Получение количества фильмов, добавленных к просмотру
  const getFilmsCountRender = (favoriteFilmsCount: number) => favoriteFilmsCount === 0 ? 0 : favoriteFilmsCount;
  const filmsFavoriteCount = getFilmsCountRender(favoriteFilms.length ?? 0);

  return (
    <>
      <IconsPlayer />

      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film?.genre}</span>
                <span className="film-card__year">{film?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={handlePlayBtnClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>

                <button
                  className="btn btn--list film-card__button"
                  type="button"
                  onClick={() => {
                    if (authorizationStatus !== AuthorizationStatus.Auth) {
                      dispatch(redirectToRoute(AppRoute.SignIn));
                    }
                    dispatch(changeFilmStatusAction({
                      filmId: film?.id,
                      status: Number(!film.isFavorite),
                    }));
                  }}
                >
                  {favoriteIcon}
                  <span>My list</span>
                  <span className="film-card__count">{filmsFavoriteCount}</span>
                </button>

                {authorizationStatus === AuthorizationStatus.Auth &&
                  <Link to={`/films/:${film?.id}/review`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film?.posterImage} alt={film?.name} width="218" height="327" />
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
