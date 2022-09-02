import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FilmsList from '../../components/films-list/films-list';
import IconsPlayer from '../../components/icons-player/icons-player';
import ShowMoreBtn from '../../components/show-more-btn/show-more-btn';
import GenresList from '../../components/genres-list/genres-list';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useNavigate} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {getFilms, getPromoFilm, getFilmsCount, getFilteredFilms, getFavoriteFilms, getFavoriteStatusChange} from '../../store/site-data/selectors';
import {fetchFavoriteFilmsAction, changeFilmStatusAction, fetchPromoAction} from '../../store/api-actions';
import {resetFavoriteStatus} from '../../store/site-data/site-data';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {useEffect} from 'react';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {redirectToRoute} from '../../store/action';

function MainScreen(): JSX.Element {

  const filteredFilms = useAppSelector(getFilteredFilms);
  const filmsCount = useAppSelector(getFilmsCount);
  const filmPromo = useAppSelector(getPromoFilm);
  const films = useAppSelector(getFilms);
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const favoriteChangeStatus = useAppSelector(getFavoriteStatusChange);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const navigate = useNavigate();

  const handlerPlayButtonClick = () => {
    const path = '/player/:1';
    navigate(path);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [dispatch, authorizationStatus]);

  useEffect(() => {
    if (favoriteChangeStatus) {
      dispatch(fetchPromoAction());
      dispatch(fetchFavoriteFilmsAction());
      dispatch(resetFavoriteStatus(true));
    }
  }, [dispatch, favoriteChangeStatus]);

  if (!films) {
    return <NotFoundScreen/>;
  }

  if (!filmPromo) {
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
  const favoriteIcon = getFavoriteIcon(filmPromo?.isFavorite);

  //Получение количества фильмов, добавленных к просмотру
  const getFilmsCountRender = (favoriteFilmsCount: number) => favoriteFilmsCount === 0 ? 0 : favoriteFilmsCount;
  const filmsFavoriteCount = getFilmsCountRender(favoriteFilms.length ?? 0);

  return (
    <>
      <IconsPlayer />

      <section className="film-card">
        <div className="film-card__bg">
          <img src={filmPromo?.backgroundImage} alt={filmPromo?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={filmPromo?.posterImage} alt={filmPromo?.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{filmPromo?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmPromo?.genre}</span>
                <span className="film-card__year">{filmPromo?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={handlerPlayButtonClick}>
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
                      filmId: filmPromo?.id,
                      status: Number(!filmPromo?.isFavorite),
                    }));
                  }}
                >
                  {favoriteIcon}
                  <span>My list</span>
                  <span className="film-card__count">{filmsFavoriteCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList films={films}/>

          <FilmsList films={filteredFilms.slice(0, filmsCount)}/>

          {((filteredFilms.length - filmsCount) > 0) && <ShowMoreBtn/>}

        </section>

        <Footer />

      </div>
    </>
  );
}

export default MainScreen;
