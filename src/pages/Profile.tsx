import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
        <section>
          <span>{`Nome: ${name}`}</span>
          <span>{`Email: ${email}`}</span>
          <span>{`Descrição: ${description}`}</span>
          <img src={ profileImage } alt="Imagem do perfil" data-testid="profile-image" />
          <Link to="/profile/edit">Editar perfil</Link>
        </section>
      )
  );
}

export default Profile;
