import dayjs from 'dayjs';
import {Review} from '../../types/reviews';

type ReviewsProps = {
  comments: Review[]
}

function Reviews({comments}: ReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments?.map((item) => (
          <div key={item.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{item.comment}</p>
              <footer className="review__details">
                <cite className="review__author">{item.user.name}</cite>
                <time className="review__date" dateTime={item.date}>{dayjs(item.date).format('MMMM D, YYYY')}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{item.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
