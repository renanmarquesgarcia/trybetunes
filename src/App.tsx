import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Search from './pages/Search';
import { AlbumType } from './types';
import Album from './pages/Album';

function App() {
  const [albums, setAlbums] = useState<AlbumType[] | [] | null>(null);

  const saveAlbums = (content: AlbumType[] | []) => {
    setAlbums(content);
  };

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route
        path="/search"
        element={ <Search saveAlbums={ saveAlbums } albums={ albums } /> }
      />
      <Route path="album/:id" element={ <Album /> } />
    </Routes>
  );
}

export default App;
