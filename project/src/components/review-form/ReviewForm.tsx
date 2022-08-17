import React, {useState, FormEvent, useEffect} from 'react';
import CommentData from '../../types/comment-data';
import {useAppDispatch} from '../../hooks';
import {postCommentAction} from '../../store/api-actions';

const ratingValues: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;

type ReviewFormProps = {
  filmId: string;
}

function ReviewForm({filmId}: ReviewFormProps): JSX.Element {

  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
  });

  const dispatch = useAppDispatch();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (formData.rating !== '' && formData.comment.length >= MIN_COMMENT_LENGTH && formData.comment.length <= MAX_COMMENT_LENGTH) {
      setIsSubmitDisabled(false);
    }
    setIsSubmitDisabled(true);
  }, [formData.rating, formData.comment.length]);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    setFormData({...formData, rating: value});
  };

  const handleTextareaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setFormData({...formData, comment: value});
  };

  const onSubmit = (comment: CommentData) => {
    dispatch(postCommentAction(comment));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(formData.rating !== '' && formData.comment.length >= MIN_COMMENT_LENGTH && formData.comment.length <= MAX_COMMENT_LENGTH) {
      onSubmit({
        rating: formData.rating,
        comment: formData.comment,
        filmId: filmId,
      });
    }
  };

  return (
    <div className="add-review">
      <form
        action="#"
        className="add-review__form"
        onSubmit={handleSubmit}
      >
        <div className="rating">
          <div className="rating__stars">
            {
              ratingValues.map((score) => (
                <React.Fragment key={score}>
                  <input
                    className="rating__input"
                    id={`star-${score}`}
                    type="radio"
                    name="rating"
                    value={score}
                    onChange={handleInputChange}
                  />
                  <label className="rating__label" htmlFor={`star-${score}`}>{`Rating ${score}`}</label>
                </React.Fragment>
              ))
            }
          </div>
        </div>

        <div className="add-review__text">
          <textarea onChange={handleTextareaChange} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={isSubmitDisabled}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
