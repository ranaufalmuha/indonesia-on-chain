import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useAuth } from "../utils/useAuthClient";
import IndonesiaOnChain from "../../../assets/images/IndonesiaOnChain.png";
import Loader from "../Loader/Loader";
import LanguageButton from "./LanguageButton/LanguageButton";
import { useTranslation } from 'react-i18next';
import { logoutStart } from '../Reducers/InternetIdentityReducer';

const Navbar = ({ setClickConnectWallet }) => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout, actor } = useAuth();
  const UserRole = useSelector((state) => state.users.role);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [usertest, setUsertest] = useState();
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const NavbarLinks = [
    { name: t('navbar.home'), path: "/#" },
    { name: t('navbar.features'), path: "/#features" },
    { name: t('navbar.about'), path: "/#about" },
  ];

  const DashboardLink = {
    name: t('navbar.dashboard'),
    path: usertest === "student" ? "/student-dashboard/main" : usertest === "educator" ? "/educator-dashboard/main" : "/signup-role",
  };

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const result = await actor.is_user_exist();
      if (result.ok) {
        const user_data = await actor.get_user_info();
        if (user_data.ok.role) setUsertest(user_data.ok.role);
        dispatch({ type: 'STORE_USER_DATA', payload: user_data.ok });
      }
    };

    if (isAuthenticated) {
      fetch();
    }
  }, [isAuthenticated, actor, dispatch]);

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("selectedLang") || "in");
  }, [i18n]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login();
      setIsLoading(false);
      setLoadingDashboard(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    dispatch(logoutStart());
    setIsLoading(false);
    window.location.href = process.env.DFX_NETWORK === "ic" ? '/' : `/?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`;
  };

  return (
    <nav className={`flex items-center  justify-center fixed top-0 left-0 w-full z-20 transition duration-300 bg-white/50 ease-in-out backdrop-blur-md ${shadow ? "shadow-lg" : ""}`}
      style={{ flexDirection: menuOpen ? 'column' : 'row' }}>



      <div className="container flex justify-between w-full h-24 px-8 py-4 max-sm:h-24 max-sm:py-4 duration-300">
        {/* logo  */}
        <div className="flex items-center justify-start gap-5">
          <img src={IndonesiaOnChain} alt="" className="object-cover h-full" />
        </div>

        {/* side  */}
        <div className={`hidden md:flex flex-col md:flex-row items-center`}>
          <ul className="flex items-center gap-4">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="whitespace-nowrap">
                <HashLink
                  smooth
                  to={link.path}
                  className={`font-poppins font-normal text-base whitespace-nowrap ${link.path === window.location.pathname + window.location.hash ? "text-purple-600 " : ""}`}
                >
                  {link.name}
                </HashLink>
              </li>
            ))}


            {/* Language  */}
            <li className="">
              <NavLink className="block text-base font-normal font-poppins">
                <LanguageButton />
              </NavLink>
            </li>


            {/* Button  */}
            {isAuthenticated && (
              <li>
                {loadingDashboard ? (
                  <Loader />
                ) : (
                  <NavLink
                    to={process.env.DFX_NETWORK === "ic" ? DashboardLink?.path : `${DashboardLink?.path}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`}
                    className={({ isActive }) =>
                      `px-4 py-2 font-poppins font-normal text-base leading-7 ${isActive ? "text-purple-600 " : ""}`
                    }
                  >
                    {DashboardLink?.name}
                  </NavLink>
                )}
              </li>
            )}
            <li>
              {!isAuthenticated ? (
                <button
                  className="bg-accent2 w-36 lg:px-7 lg:py-3 px-2 py-4 text-white rounded-full text-sm hover:scale-105 font-bold transition-all duration-500 ease-in-out"
                  onClick={() => setClickConnectWallet(true)}
                >
                  {t('navbar.getStarted')}
                </button>
              ) : (
                <button
                  className="px-6 py-3 bg-[#3400B1] text-white font-poppins text-base rounded-full hover:text-[#3400B1] hover:bg-white border-2 border-[#3400B1] hover:scale-105 font-normal transition-all duration-500 ease-in-out"
                  onClick={() => { !isLoading && handleLogout() }}
                >
                  {t('navbar.logout')}
                </button>
              )}
            </li>


          </ul>
        </div>











        {/* side Mobile */}
        <div className="flex md:hidden">
          <div className="z-20 flex items-center justify-center pr-3"> <LanguageButton /> </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
            {menuOpen ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>



      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col items-center w-screen h-screen gap-4 py-4 bg-white shadow-lg md:hidden">
          {NavbarLinks.map((link, index) => (
            <HashLink key={index} smooth to={link.path} className="w-full gap-2 py-2 text-center hover:bg-gray-100">
              {link.name}
            </HashLink>
          ))}
          <LanguageButton />
          {isAuthenticated ? (
            <>
              <NavLink
                to={process.env.DFX_NETWORK === "ic" ? DashboardLink?.path : `${DashboardLink?.path}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`}
                className={({ isActive }) =>
                  `px-4 py-2 font-poppins font-normal text-base leading-7 ${isActive ? "text-purple-600 " : ""}`
                }
              >
                {DashboardLink?.name}
              </NavLink>
              <button onClick={handleLogout} className="py-2 mt-2 text-white bg-purple-700 w-60">
                {t('navbar.logout')}
              </button>
            </>
          ) : (
            <button onClick={() => setClickConnectWallet(true)} className="py-2 mt-2 text-white bg-purple-700 rounded w-60">
              {t('navbar.getStarted')}
            </button>
          )}

        </div>
      )}
    </nav>

  );
};

export default Navbar;
