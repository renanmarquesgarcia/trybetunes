import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Search from './pages/Search';
import { AlbumType } from './types';
import Album from './pages/Album';
import Layout from './components/Layout';
import Favorites from './pages/Favorites';

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
      </Route>
    </Routes>
  );
}

export default App;
