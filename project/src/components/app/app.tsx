import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import MoviePageScreen from '../../pages/movie-page-screen/movie-page-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import {Review} from '../../types/reviews';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppProps = {
  reviews: Review[];
}

function App({reviews}: AppProps): JSX.Element {
  const {films, isDataLoaded} = useAppSelector((state) => state);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element= {<MainScreen />}
        />

        <Route
          path={AppRoute.Film}
          element={<MoviePageScreen films={films} reviews={reviews}/>}
        />

        <Route
          path={AppRoute.AddReview}
          element={<AddReviewScreen films={films}/>}
        />

        <Route
          path={AppRoute.Player}
          element={<PlayerScreen films={films} />}
        />

        <Route
          path={AppRoute.SignIn}
          element={<SignInScreen />}
        />

        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <MyListScreen films={films}/>
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
