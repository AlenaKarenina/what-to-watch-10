import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import IconsPlayer from '../../components/icons-player/icons-player';
import {useRef, FormEvent, useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/auth-data';

function SignInScreen(): JSX.Element {

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [errorClass, setErrorClass] = useState('');
  const MIN_PASSWORD_LENGTH = 2;

  const dispatch = useAppDispatch();

  const validatePassword = (password:string): boolean => {
    const ELEMENTS = 2;
    const simbols = new Map();
    const separatedSymbols = Array.from(password);
    separatedSymbols.forEach((symbol) => {
      const regex = new RegExp(/[a-z]/i);
      if (regex.test(symbol)) {
        simbols.set('hasLetter', true);
      }
    });
    separatedSymbols.forEach((symbol) => {
      const regex = new RegExp(/[0-9]/i);
      if (regex.test(symbol)){
        simbols.set('hasNumber', true);
      }
    });
    if (simbols.size === ELEMENTS) {
      return true;
    } else {
      return false;
    }
  };

  const handlePasswordInput = (evt: FormEvent<HTMLInputElement>) => {
    if ((passwordRef.current?.value as string).length < MIN_PASSWORD_LENGTH || (passwordRef.current?.value as string) === '') {
      evt.preventDefault();
      setErrorMessage('The minimum password length is two symbols');
      setErrorClass('sign-in__field--error');
    } else if(!validatePassword(passwordRef.current?.value as string)){
      setErrorMessage('The password must contain minimum one letter and one number');
      setErrorClass('sign-in__field--error');
    } else {
      setErrorMessage('');
      setErrorClass('');
    }
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if ((passwordRef.current?.value as string) === '') {
      evt.preventDefault();
      setErrorMessage('The minimum password length is two symbols');
      setErrorClass('sign-in__field--error');
    }

    if (emailRef.current !== null && passwordRef.current !== null && (passwordRef.current?.value as string).length >= MIN_PASSWORD_LENGTH && (passwordRef.current?.value as string) !== '') {
      if(validatePassword(passwordRef.current?.value)){
        onSubmit({
          login: emailRef.current.value,
          password: passwordRef.current.value,
        });
      } else {
        setErrorMessage('The password must contain minimum one letter and one number');
        setErrorClass('sign-in__field--error');
      }
    }
  };

  return (
    <>
      <IconsPlayer />

      <div className="user-page">

        <header className="page-header user-page__head">
          <Logo />
          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form
            action=''
            className='sign-in__form'
            onSubmit={handleSubmit}
          >
            <div className="sign-in__message">
              <span>{errorMessage}</span>
            </div>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  ref={emailRef}
                  className='sign-in__input'
                  type='email'
                  placeholder='Email address'
                  name='user-email'
                  id='user-email'
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>

              <div className={`sign-in__field ${errorClass}`}>
                <input
                  ref={passwordRef}
                  className='sign-in__input'
                  type='password'
                  placeholder='Password'
                  name='user-password'
                  id='user-password'
                  onInput={handlePasswordInput}
                />
                <label className='sign-in__label visually-hidden' htmlFor='user-password'>Password</label>
              </div>

            </div>
            <div className="sign-in__submit">
              <button className='sign-in__btn' type='submit'>
                Sign in
              </button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default SignInScreen;
