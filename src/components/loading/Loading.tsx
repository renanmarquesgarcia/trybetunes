import './Loading.css';

function Loading() {
  return (
    <div className="loading__container">
      <span className="loader" />
      <h1 className="loading__text">Carregando...</h1>
    </div>
  );
}

export default Loading;
