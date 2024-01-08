import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';

function Header() {
  const [name, setName] = useState('');

  useEffect(() => {
    async function getName() {
      const userInfo = await getUser();
      if ('name' in userInfo) {
        setName(userInfo.name);
      }
    }

    getName();
  }, []);

  return (
    <header data-testid="header-component">
      <nav>
        <NavLink to="/search" data-testid="link-to-search">Pesquisa</NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favoritas</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      </nav>
      { name && <span data-testid="header-user-name">{name}</span>}
    </header>
  );
}

export default Header;
