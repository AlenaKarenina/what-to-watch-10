import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import {Film} from '../../types/films';
import FilmsList from '../../components/films-list/films-list';
import IconsPlayer from '../../components/icons-player/icons-player';
import UserBlock from '../../components/user-block/user-block';


type MyListScreenProps = {
  films: Film[];
}

function MyListScreen({films}: MyListScreenProps): JSX.Element {
  return (
    <>
      <IconsPlayer />

      <div className="user-page">

        <header className="page-header user-page__head">
          <Logo />

          <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>

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
