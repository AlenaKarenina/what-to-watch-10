import {Film} from '../../types/films';
import {RatingRatio} from '../../const';

type OverviewProps = {
  film: Film
}

function Overview({film}: OverviewProps): JSX.Element {

  const getRating = (ratings: number) => {
    if (RatingRatio.BAD <= ratings && ratings < RatingRatio.NORMAL) {
      return 'Bad';
    }
    if (RatingRatio.NORMAL <= ratings && ratings < RatingRatio.GOOD) {
      return 'Normal';
    }
    if (RatingRatio.GOOD <= ratings && ratings < RatingRatio.VERY_GOOD) {
      return 'Good';
    }
    if (RatingRatio.VERY_GOOD <= ratings && ratings < RatingRatio.AWESOME) {
      return 'Very good';
    }
    if (ratings === RatingRatio.AWESOME) {
      return 'Awesome';
    }
  };

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRating(film?.rating)}</span>
          <span className="film-rating__count">{film?.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film?.description}</p>

        <p className="film-card__director"><strong>Director: {film?.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {film?.starring}</strong></p>
      </div>
    </>
  );
}
export default Overview;
