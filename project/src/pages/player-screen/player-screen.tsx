import {useEffect, useState, useRef, ChangeEvent} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import IconsPlayer from '../../components/icons-player/icons-player';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {getFilm} from '../../store/site-data/selectors';
import {fetchFilmAction} from '../../store/api-actions';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Spinner from '../../components/spinner/spinner';

function PlayerScreen(): JSX.Element {

  const film = useAppSelector(getFilm);
  const params = useParams();
  const id = `${(params.id ? params.id.slice(1) : '0')}`;

  const navigate = useNavigate();

  const handleExitButtonClick = () => {
    const path = `/films/:${film?.id}`;
    navigate(path);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilmAction(Number(id)));
  }, [id, dispatch]);

  const enum ProgressBar {
    Start = 0,
    End = 100,
  }

  //функция для конвертирования секунд взята с https://russianblogs.com/article/6472332881/
  const formatSeconds = (value: string) => {
    const SECONDS_IN_MINUTE = 60;
    const MINUTES_IN_HOUR = 60;
    if(value === undefined || value === '0') {
      return '00:00';
    }
    let secondsTime = parseInt(value, 10);
    let minutesTime = 0;
    let hoursTime = 0;
    if (secondsTime >= SECONDS_IN_MINUTE) {
      minutesTime = parseInt(String(secondsTime / SECONDS_IN_MINUTE), 10);
      secondsTime = parseInt(String(secondsTime % SECONDS_IN_MINUTE), 10);
      if(minutesTime >= MINUTES_IN_HOUR) {
        hoursTime = parseInt(String(minutesTime / MINUTES_IN_HOUR), 10);
        minutesTime = parseInt(String(minutesTime % MINUTES_IN_HOUR), 10);
      }
    }
    let result = `${secondsTime.toString().padStart(2, '0')}`;
    if ((Number(value) - SECONDS_IN_MINUTE) < 0 ) {
      result = `00:${secondsTime.toString().padStart(2, '0')}`;
    }
    if(minutesTime > 0 && hoursTime === 0) {
      result = `${minutesTime.toString().padStart(2, '0')}:${result}`;
    }
    if(hoursTime > 0) {
      result = `${hoursTime.toString().padStart(2, '0')}:${minutesTime.toString().padStart(2, '0')}:${result}`;
    }
    return result;
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState<number>(ProgressBar.Start);
  const [timeLeft, setTimeLeft] = useState<number>(ProgressBar.Start);
  const convertedTimeLeft = formatSeconds(timeLeft.toString());
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleIsPlayClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  if (!film) {
    return <NotFoundScreen/>;
  }

  const getPlayPauseButton = (playbackStatus: boolean):JSX.Element => {
    if (playbackStatus) {
      return (
        <>
          <svg viewBox="0 0 14 21" width="14" height="21">
            <use xlinkHref="#pause"></use>
          </svg>
          <span>Pause</span>
        </>
      );
    }
    return (
      <>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </>
    );
  };

  const playPauseButton = getPlayPauseButton(isPlaying);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current?.currentTime / videoRef.current?.duration) * ProgressBar.End;
      setProgress(currentProgress);
      setTimeLeft(videoRef.current.duration - videoRef.current.currentTime);
    }
  };

  const handleVideoProgress = (evt: ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(evt.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current?.duration / ProgressBar.End) * manualChange;
      setProgress(manualChange);
    }
  };

  const handleEndPlay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = ProgressBar.Start;
      setIsPlaying(false);
    }
  };

  return (
    <>
      <IconsPlayer />

      <div className="player" >
        <video
          autoPlay
          muted
          ref={videoRef}
          src={film?.videoLink}
          className="player__video"
          poster={film?.posterImage}
          onSeeking={() => setIsLoading(true)}
          onSeeked={() => setIsLoading(false)}
          onTimeUpdate={handleTimeUpdate}
          onDoubleClick={() =>videoRef.current?.requestFullscreen()}
          onEnded={handleEndPlay}
        >
        </video>

        <button
          type="button"
          className="player__exit"
          onClick={handleExitButtonClick}
        >
          Exit
        </button>

        {isLoading && <span><Spinner /></span>}

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <input
                className="player__progress-setter"
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(evt) => handleVideoProgress(evt)}
                style={{display: 'none'}}
              />
              <progress
                className="player__progress"
                value={progress} max="100"
              >
              </progress>
              <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">- {convertedTimeLeft}</div>
          </div>

          <div className="player__controls-row">
            <button onClick={handleIsPlayClick} type="button" className="player__play">
              {playPauseButton}
            </button>
            <div className="player__name">{film?.name}</div>

            <button onClick={() => videoRef.current?.requestFullscreen()} type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerScreen;
