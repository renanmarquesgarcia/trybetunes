import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import trybeTunesLogo from '../../images/trybe_tunes_logo.png';
import './Login.css';

function Login() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const isDisabled = name.length < 3;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await createUser({ name });
    navigate('/search');
  };

  return (
    loading
      ? <Loading />
      : (
        <form className="form__login__container">
          <img src={ trybeTunesLogo } alt="Trybe Tunes logo" />
          <input
            type="text"
            data-testid="login-name-input"
            className="login__name__input"
            placeholder="qual é o seu nome?"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
          <button
            data-testid="login-submit-button"
            className="login__btn"
            disabled={ isDisabled }
            onClick={ (e) => handleSubmit(e) }
          >
            Entrar
          </button>
        </form>
      )
  );
}

export default Login;
