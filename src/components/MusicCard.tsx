import { useEffect, useState } from 'react';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { SongType } from '../types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

type MusicCardProps = SongType & { favorite: boolean };

function MusicCard({ trackId, trackName, previewUrl, favorite }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClickIsFavorite = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(!isFavorite);
    if (e.target.checked) {
      await addSong({ trackId, trackName, previewUrl });
    } else {
      await removeSong({ trackId, trackName, previewUrl });
    }
  };

  useEffect(() => {
    if (favorite) setIsFavorite(true);
  }, []);

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
