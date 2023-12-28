type MusicCardProps = {
  trackName: string,
  previewUrl: string
};

function MusicCard({ trackName, previewUrl }: MusicCardProps) {
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
    </div>
  );
}

export default MusicCard;
