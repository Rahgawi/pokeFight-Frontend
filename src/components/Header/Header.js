import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="Header-wrapper">
      <div className="title">
        <img
          src={require('./images/Pokefight.png')}
          alt="pokefight"
          max-width="400px"
        />
      </div>

      <nav>
        <NavLink className="menubtns" to="/">
          Home
        </NavLink>
        <NavLink className="menubtns" to="pokemon/pokefight">
          Pokefight
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
