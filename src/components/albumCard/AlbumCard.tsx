import { Link } from 'react-router-dom';
import './AlbumCard.css';

type AlbumCardProps = {
  collectionId: number;
  collectionName: string;
  collectionImage: string;
  artistName: string;
};

function AlbumCard(
  { collectionId, collectionName, collectionImage, artistName }: AlbumCardProps,
) {
  return (
    <div className="album__card__container">
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <img
          src={ collectionImage }
          alt="capa do álbum"
          className="album__card__image"
        />
        <h3>{collectionName}</h3>
        <span>{artistName}</span>
      </Link>
    </div>
  );
}

export default AlbumCard;
