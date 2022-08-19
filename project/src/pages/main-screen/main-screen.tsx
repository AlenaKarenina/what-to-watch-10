import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FilmsList from '../../components/films-list/films-list';
import IconsPlayer from '../../components/icons-player/icons-player';
import ShowMoreBtn from '../../components/show-more-btn/show-more-btn';
import GenresList from '../../components/genres-list/genres-list';
import {AppRoute} from '../../const';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';

function MainScreen(): JSX.Element {
  const {films, filteredFilms, filmsCount} = useAppSelector((state) => state);
  const favoriteFilmsLength = useAppSelector((state) => state.films).filter((filmA) => filmA.isFavorite).length;

  const filmPromo = useAppSelector((state) => state.promo);

  const navigate = useNavigate();

  const handlerPlayButtonClick = () => {
    const path = '/player/:1';
    navigate(path);
  };

  const handleMyListBtnClick = () => {
    navigate(AppRoute.MyList);
  };

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

                <button className="btn btn--list film-card__button" type="button" onClick={handleMyListBtnClick}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{favoriteFilmsLength}</span>
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
