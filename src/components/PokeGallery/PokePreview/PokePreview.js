import './PokePreview.css';

function PokePreview({ id, name }) {
  return (
    <div className="PokePreview-wrapper">
      {/* <Link to={`/pokemon/${id}`} className="PokePreview-link"> */}
      <figure>
        <img
          src={`https://picsum.photos/200/200?random=${id}`}
          alt={name}
          className="PokePreview-img"
        />
        <figcaption className="PokePreview-pokemon-name">{name}</figcaption>
      </figure>
      {/* </Link> */}
    </div>
  );
}

export default PokePreview;
