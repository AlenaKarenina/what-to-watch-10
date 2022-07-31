import {increaseFilmsCount} from '../../store/action';
import {useAppDispatch} from '../../hooks';

function ShowMoreBtn(): JSX.Element {

  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more" onClick={() => dispatch(increaseFilmsCount())}>
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export default ShowMoreBtn;
