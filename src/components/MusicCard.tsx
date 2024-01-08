import { useState } from 'react';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { SongType } from '../types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

function MusicCard({ trackId, trackName, previewUrl }: SongType) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClickIsFavorite = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(!isFavorite);
    if (e.target.checked) {
      await addSong({ trackId, trackName, previewUrl });
    } else {
      await removeSong({ trackId, trackName, previewUrl });
    }
  };

  return (
    <div>
      <span>{trackName}</span>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ `favorite-${trackId}` }
        data-testid={ `checkbox-music-${trackId}` }
      >
        { isFavorite
          ? <img src={ checkedHeart } alt="favorite" />
          : <img src={ emptyHeart } alt="favorite" /> }
        <input
          type="checkbox"
          id={ `favorite-${trackId}` }
          onChange={ (e) => handleClickIsFavorite(e) }
          checked={ isFavorite }
        />
      </label>
    </div>
  );
}

export default MusicCard;
