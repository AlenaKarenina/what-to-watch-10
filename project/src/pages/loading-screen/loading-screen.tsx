function LoadingScreen(): JSX.Element {
  return (
    <p
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '999',
        background: 'white',
      }}
    >Loading ...
    </p>
  );
}

export default LoadingScreen;
