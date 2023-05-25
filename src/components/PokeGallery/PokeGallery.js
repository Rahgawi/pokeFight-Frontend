import './PokeGallery.css';
import PokePreview from './PokePreview/PokePreview';

function PokeGallery() {
  return (
    <div className="PokeGallery-wrapper">
      <h1>PokeGallery.js</h1>
      <section className="PokeGallery-container">
        <PokePreview />
        <PokePreview />
        <PokePreview />
        <PokePreview />
        <PokePreview />
        <PokePreview />
        <PokePreview />
        <PokePreview />
        <PokePreview />
        <PokePreview />
        <PokePreview />
        <PokePreview />
      </section>
    </div>
  );
}

export default PokeGallery;
