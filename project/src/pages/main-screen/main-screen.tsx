import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import {Film} from '../../types/films';
import FilmsList from '../../components/films-list/films-list';
import {FilmPromo} from '../../types/filmPromo';
import IconsPlayer from '../../components/icons-player/icons-player';
import ShowMoreBtn from '../../components/show-more-btn/show-more-btn';
import GenresList from '../../components/genres-list/genres-list';

import {useAppSelector} from '../../hooks';

type MainScreenProps = {
  filmPromo: FilmPromo,
  films: Film[],
};

function MainScreen({filmPromo, films}: MainScreenProps): JSX.Element {
  const {filteredFilms, filmsCount} = useAppSelector((state) => state);

  return (
    <>
      <IconsPlayer />

      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{filmPromo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmPromo.genre}</span>
                <span className="film-card__year">{filmPromo.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{films.length}</span>
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
