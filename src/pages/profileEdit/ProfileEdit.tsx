import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/loading/Loading';
import './profileEdit.css';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function ProfileEdit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const isDisabled = !(email.match(EMAIL_REGEX)
  && name.length > 0
  && email.length > 0
  && description.length > 0
  && profileImage.length > 0);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await getUser();
      setName(userInfo.name);
      setEmail(userInfo.email);
      setDescription(userInfo.description);
      setProfileImage(userInfo.image);
    }

    getUserInfo();
    setLoading(false);
  }, []);

  const handleClickSaveNewUserInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await updateUser({ name, email, description, image: profileImage });
    navigate('/profile');
  };

  return (
    loading
      ? <Loading />
      : (
        <form className="profile__edit__form">
          <div className="profile__edit__name__container">
            <label htmlFor="name">
              Nome
            </label>
            <input
              data-testid="edit-input-name"
              id="name"
              type="text"
              value={ name }
              onChange={ ({ target }) => setName(target.value) }
            />
          </div>
          <div>
            <label htmlFor="email">
              Email
            </label>
            <input
              data-testid="edit-input-email"
              id="email"
              type="text"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </div>
          <div>
            <label htmlFor="description">
              Descrição
            </label>
            <textarea
              data-testid="edit-input-description"
              id="description"
              value={ description }
              onChange={ ({ target }) => setDescription(target.value) }
            />
          </div>
          <div>
            <label htmlFor="profileImage">
              Foto do Perfil
            </label>
            <input
              data-testid="edit-input-image"
              id="profileImage"
              type="text"
              value={ profileImage }
              onChange={ ({ target }) => setProfileImage(target.value) }
            />
          </div>
          <button
            data-testid="edit-button-save"
            className="edit__profile__save__btn"
            onClick={ (e) => handleClickSaveNewUserInfo(e) }
            disabled={ isDisabled }
          >
            Salvar
          </button>
        </form>
      )
  );
}

export default ProfileEdit;
