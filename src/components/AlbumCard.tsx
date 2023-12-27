import { Link } from 'react-router-dom';

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
    <div>
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <img src={ collectionImage } alt="capa do álbum" />
        <h3>{collectionName}</h3>
        <span>{artistName}</span>
      </Link>
    </div>
  );
}

export default AlbumCard;
