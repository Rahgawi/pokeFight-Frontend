import './Header.css';
import { NavLink } from 'react-router-dom';
function Header() {
  return (
    <header className="Header-wrapper">
      <div className="title">
        <img src="../images/Pokefight.png" alt="pokefight" />
      </div>

      <nav>
        <NavLink className="menubtns" to="Pokemon">
          Home
        </NavLink>
        {/* /* <NavLink className="menubtns" to="Pokefight">
          Pokefight
        </NavLink> */}
      </nav>
    </header>
  );
}

export default Header;
