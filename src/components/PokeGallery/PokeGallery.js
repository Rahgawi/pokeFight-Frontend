import { useRef, useState } from 'react';
import './PokeGallery.css';
import PokePreview from './PokePreview/PokePreview';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '@fontsource/luckiest-guy';
import '@fontsource/kanit';

function PokeGallery() {
  const [pokeData, setPokeData] = useState([]);
  const [page, setPage] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const dataFetchedRef = useRef(false);
  const pokePerPage = 12;

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const indexFrom = (page - 1) * pokePerPage;
    const indexTo = page * pokePerPage;

    const fetchPokemons = async () => {
      const URI = `${process.env.REACT_APP_POKE_API}/pokemon?indexFrom=${indexFrom}&indexTo=${indexTo}`;

      try {
        const res = await axios.get(URI);
        // console.log(res.data);
        setPokeData((pokeData) => [...pokeData, ...res.data]);
        if (res.data.length < pokePerPage) setIsCompleted(true);
      } catch (error) {
        console.error(error);
      } finally {
        dataFetchedRef.current = false;
      }
    };

    fetchPokemons();
  }, [page]);

  const increasePage = () => setPage(page + 1);

  console.log(pokeData);

  return (
    <div className="PokeGallery-wrapper">
      <section className="PokeGallery-container">
        {pokeData.length > 0 ? (
          pokeData.map((pokeObj) => {
            return (
              <Link to={`/pokemon/${pokeObj.id}`}>
                <PokePreview
                  id={pokeObj.id}
                  name={pokeObj.name.english}
                  key={pokeObj.id}
                />
              </Link>
            );
          })
        ) : (
          <>
            <h1>Loading...</h1>
          </>
        )}
      </section>

      {pokeData.length > 0 && !isCompleted ? (
        <section className="PokeGallery-btn-section">
          <button className="PokeGallery-btn" onClick={increasePage}>
            show {pokePerPage} more
          </button>
        </section>
      ) : (
        ''
      )}
    </div>
  );
}

export default PokeGallery;
