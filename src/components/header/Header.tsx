import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import trybeTunesLogo from '../../images/trybe_tunes_logo.png';
import searchIcon from '../../images/search_icon.png';
import emptyStarIcon from '../../images/empty_star_icon.png';
import profileIcon from '../../images/profile_icon.png';

import './Header.css';

function Header() {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await getUser();
      if ('name' in userInfo) {
        setName(userInfo.name);
      }
      if ('image' in userInfo) {
        setProfileImage(userInfo.image);
      }
    }

    getUserInfo();
  }, []);

  return (
    <header
      data-testid="header-component"
      className="header__container"
    >
      <img
        src={ trybeTunesLogo }
        alt="Trybe Tunes Logo"
        className="header__trybe__tunes__logo"
      />
      <nav className="header__nav__links">
        <div className="nav__links">
          <img src={ searchIcon } alt="ícone de pesquisa" />
          <NavLink to="/search" data-testid="link-to-search">Pesquisa</NavLink>
        </div>
        <div className="nav__links">
          <img src={ emptyStarIcon } alt="ícone de favoritas" />
          <NavLink to="/favorites" data-testid="link-to-favorites">Favoritas</NavLink>
        </div>
        <div className="nav__links">
          <img src={ profileIcon } alt="ícone de perfil" />
          <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
        </div>
      </nav>
      <section className="header__user__info">
        { profileImage && (
          <img
            src={ profileImage }
            alt="Foto de Perfil"
            className="header__profile__picture"
          />
        )}
        { name && <span data-testid="header-user-name">{name}</span>}

      </section>
    </header>
  );
}

export default Header;
