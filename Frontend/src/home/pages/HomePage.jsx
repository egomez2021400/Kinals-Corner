import logo from '../../assets/image/LogoHd.png'; // Reemplaza con la ruta de tu logo
import microsoftLogo from '../../assets/image/microsoft.png'; // Reemplaza con la ruta del logo de Microsoft
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/HomePage.css'

export const HomePage = () => {
    const navigate = useNavigate();

    const onLogin = () =>{
        navigate("/login",{
            replace: true
        })
    }

    const onRegister = () =>{
        navigate("/register",{
            replace: true
        })
    }
    return (
        <div className="login-container">
          <div className="left-section">
            {/* Agrega la imagen de fondo */}
            <img className="background-image" />
          </div>
    
          <div className="right-section">
            <div className="logo1">
              <img src={logo} alt="Logo" />
            </div>
    
            <h1 className="main-title">
              El rincón de <br /> Confianza de Kinal
            </h1>
            <p className="sub-title">Únete a Kinals Corner</p>
    
            <button className="microsoft-btn"
            >
              <img src={microsoftLogo} alt="Microsoft Logo" />
              Continue with Microsoft
            </button>
    
            <div className="divider">
              <span>o</span>
            </div>
    
            <button className="create-account-btn" onClick={onRegister}>Crear Cuenta</button>
    
            <p className="terms-policy">
              Al registrarte, estás de acuerdo con <br/>nuestras políticas y términos.
            </p>
    
            <p className="already-have-account">¿Ya tienes una cuenta?</p>
            <button className="login-btn" onClick={onLogin}>Iniciar Sesión</button>
          </div>
        </div>
      );
    };
