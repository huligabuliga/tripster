import { Link } from 'react-router-dom';
//import * as FaIcons from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <img src="coinfusionLogo.png" alt="Logo" />
        </li>
        <li>
          <Link to="">Home</Link>
        </li>
        <li>
          <Link to="">Search</Link>
        </li>
        <li>
          <Link to="">Notifications</Link>
        </li>
        <li>
          <Link to="">My account</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
