import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { isUserAuthenticated } from '../auth/helpers/LoginHelper';
import '../assets/styles/navbar.css';
import logo from '../assets/image/LogoHd.png';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const navbarRef = useRef(null);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    window.location.href = '/';
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileMenuClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  useEffect(() => {
    setAuthenticated(isUserAuthenticated());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" ref={navbarRef}>
      <div className="container">
        <Link to="/" className="navbar-brand" href="/">
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand-name">Kinals R</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!authenticated ? ( // Mostrar botones de inicio de sesión y registro si el usuario no está autenticado
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link btn btn-outline-primary rounded-pill login-btn">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link btn btn-outline-primary rounded-pill register-btn">
                    Registrarse
                  </Link>
                </li>
              </>
            ) : (
              // Mostrar elementos del Navbar si el usuario está autenticado
              <>
                <li className="nav-item">
                  <Link to="/teachers" className="nav-link" href="/teachers">
                    Maestros
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/foro" className="nav-link" href="/foro">
                    Foro
                  </Link>
                </li>

                <li className="nav-item">
                <Link to="/helpSocials" className="nav-link" href="/foro">
                    Crear ayuda social
                  </Link>
                </li>
                <li>
                  <Link to="/listUserHelp" className="nav-link" href="/foro">
                    Mis ayudas sociales
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="notificationsDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={showNotifications}
                    onClick={handleNotificationClick}
                  >
                    <FontAwesomeIcon icon={faBell} />
                  </a>
                  <ul
                    className={`dropdown-menu dropdown-menu-start ${
                      showNotifications ? 'show' : ''
                    }`}
                    aria-labelledby="notificationsDropdown"
                  >
                    {/* Lista de notificaciones*/}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="profileDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={showProfileMenu}
                    onClick={handleProfileMenuClick}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </a>
                  <ul
                    className={`dropdown-menu dropdown-menu-end ${
                      showProfileMenu ? 'show' : ''
                    }`}
                    aria-labelledby="profileDropdown"
                  >
                    <li>
                      <a to="/perfil" className="dropdown-item" href="/perfil">
                        Ver perfil
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/" onClick={cerrarSesion}>
                        Cerrar sesión
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
