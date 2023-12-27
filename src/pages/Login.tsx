import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
          <button
            data-testid="login-submit-button"
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
