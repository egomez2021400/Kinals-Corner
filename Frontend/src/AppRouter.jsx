import { Navigate, Route, Routes } from "react-router-dom";
import { isUserAuthenticated } from "./auth/helpers/LoginHelper";
// import { Login } from "./auth/pages/Login";
import { Teachers } from "./teachers/pages/Teachers";
import { HomePage } from "./home/pages/HomePage";
import { Register } from "./register/pages/Register";
import { Navbar } from "./components/Navbar";
import { Foro } from "./foro/pages/Foro";
import SocialHelpsByUser from "./user/pages/viewUserHelp";
import SocialHelpList from "./helpSocial/pages/HelpSocials";
import { Login } from "./auth/pages/Login";
import { Perfil } from "./user/pages/Perfil";

export const AppRouter = () => {
    return(
        <>
        {isUserAuthenticated() && <Navbar/>}
        <Routes>
        <Route path="/"  
            element={isUserAuthenticated() ? <Foro/> : <HomePage/>}
        />

        <Route path="/login" 
            element={
                !isUserAuthenticated() ? (
                    <Login/>
                    ) : (
                    <Navigate to="/"></Navigate>
                )
            }
        />

            <Route path="/register" 
            element={
                !isUserAuthenticated() ? (
                    <Register/>
                    ) : (
                    <Navigate to="/"></Navigate>
                )
            }
            />
            <Route path="/teachers" 
            element={
                isUserAuthenticated() ? (
                    <Teachers/>
                    ) : (
                    <Navigate to="/"></Navigate>
                )
            }
            />
            <Route path="/foro" 
            element={
                isUserAuthenticated() ? (
                    <Foro/>
                    ) : (
                    <Navigate to="/"></Navigate>
                )
            }
            />
            <Route path="/perfil" 
            element={
                isUserAuthenticated() ? (
                    <Perfil/>
                    ) : (
                    <Navigate to="/"></Navigate>
                )
            }
            />
            <Route path="/helpSocials"
            element={
                isUserAuthenticated() ? (
                    <SocialHelpList />
                ) : (
                    <Navigate to="/"></Navigate>
                )
            }
            />

            <Route path="/listUserHelp"
            element={
                isUserAuthenticated() ? (
                    <SocialHelpsByUser />
                ) : (
                    <Navigate to="/"></Navigate>
                )
            }
            />

        </Routes>
        </>
    );
};
