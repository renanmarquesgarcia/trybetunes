import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/loading/Loading';
import './Profile.css';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(true);

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

  return (
    loading
      ? <Loading />
      : (
        <section className="profile__container">
          <section className="profile__image__name__container">
            <img
              src={ profileImage }
              alt="Imagem do perfil"
              className="profile__image"
              data-testid="profile-image"
            />
            <div>
              <h4>Nome</h4>
              <span>{name}</span>
            </div>
          </section>
          <section className="profile__info">
            <div>
              <h4>E-mail</h4>
              <span>{email}</span>
            </div>
            <div>
              <h4>Descrição</h4>
              <span>{description}</span>
            </div>
            <Link
              to="/profile/edit"
              className="link__profile__edit"
            >
              Editar perfil
            </Link>
          </section>
        </section>
      )
  );
}

export default Profile;
