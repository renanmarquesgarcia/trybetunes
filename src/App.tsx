import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/login/Login';
import Search from './pages/search/Search';
import { AlbumType } from './types';
import Album from './pages/album/Album';
import Layout from './components/Layout/Layout';
import Favorites from './pages/favorites/Favorites';
import NotFound from './pages/notFound/NotFound';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profileEdit/ProfileEdit';

function App() {
  const [albums, setAlbums] = useState<AlbumType[] | [] | null>(null);

  const saveAlbums = (content: AlbumType[] | []) => {
    setAlbums(content);
  };

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route
          path="/search"
          element={ <Search saveAlbums={ saveAlbums } albums={ albums } /> }
        />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
      </Route>
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
