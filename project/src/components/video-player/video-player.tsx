import {useEffect, useRef} from 'react';

type VideoPlayerProps = {
  posterImage: string,
  previewVideoLink: string,
  isPlaying: boolean,
  width: string,
  height: string,
}

function VideoPlayer({posterImage, previewVideoLink, isPlaying, width, height}: VideoPlayerProps): JSX.Element {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {

    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;

  }, [isPlaying]);

  return (
    <video
      width={width}
      height={height}
      ref={videoRef}
      poster={posterImage}
      muted
    >
      <source src={previewVideoLink} />
    </video>
  );
}
export default VideoPlayer;
