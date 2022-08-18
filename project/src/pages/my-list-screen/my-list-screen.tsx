import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import FilmsList from '../../components/films-list/films-list';
import IconsPlayer from '../../components/icons-player/icons-player';
import UserBlock from '../../components/user-block/user-block';
import {useAppSelector} from '../../hooks';

function MyListScreen(): JSX.Element {
  const films = useAppSelector((state) => state.films).filter((film) => film.isFavorite);

  const favoriteFilmsLength = useAppSelector((state) => state.films).filter((filmA) => filmA.isFavorite).length;

  return (
    <>
      <IconsPlayer />

      <div className="user-page">

        <header className="page-header user-page__head">
          <Logo />

          <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilmsLength}</span></h1>

          <UserBlock/>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <FilmsList films={films}/>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MyListScreen;
