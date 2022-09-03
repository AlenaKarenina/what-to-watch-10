function LoadingScreen(): JSX.Element {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '999',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontSize: '56px',
        fontWeight: '700',
        color: '#fd612ead',
      }}
    >Loading ...
    </div>
  );
}

export default LoadingScreen;
