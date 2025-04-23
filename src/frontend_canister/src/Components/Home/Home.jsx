import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import Navbar from '../layouts/Navbar';
import { mainHomeSvg } from '../utils/svgData';
import PlayButton from '../../../assets/images/PlayButton.png';
import Header from '../../../assets/images/Header.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavbarMobile from '../layouts/NavbarMobile';
import svgImages from '../../../assets/images/mobilelandingbg.svg';
import { useAuth } from '../utils/useAuthClient';
import HelpVideo from '../../modals/HelpVideo';
import { logoutStart } from '../Reducers/InternetIdentityReducer';
import { useOutletContext } from 'react-router-dom';
const Home = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, login, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [HelpVideoOpen, setHelpVideoOpen] = useState(false);
    const { t } = useTranslation();
    const { setClickConnectWallet } = useOutletContext();
    useEffect(() => {
        AOS.init();
        dispatch({ type: 'CHECK_USER_PRESENT' });
    }, [dispatch]);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await login();
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleHelpVideoClick = () => {
        setHelpVideoOpen(true);
    };


    const handleLogout = async () => {
        setIsLoading(true);

        try {
            dispatch(logoutStart());
            setIsLoading(false);
            window.location.href =
                process.env.DFX_NETWORK === "ic" ?
                    '/' :
                    `/?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`;
        } catch (error) {
            setIsLoading(false);
        }
    };
    return (
        <>
            <section id='/' className='w-full md:min-h-full flex justify-center relative'>
                {HelpVideoOpen && <HelpVideo setHelpVideoOpen={setHelpVideoOpen} />}
                <div
                    className='bg-cover bg-center container duration-300 mt-28 px-8'
                    style={{
                        backgroundImage: `url(${svgImages})`,
                    }}
                >
                    {/* <Navbar setClickConnectWallet={setClickConnectWallet} /> */}
                    <div className='flex flex-col lg:flex-row lg:justify-evenly lg:items-center px-10 py-10 bg-accent3/20 rounded-3xl gap-10'>
                        <div
                            className='flex flex-col lg:w-1/2 w-full gap-8'
                            data-aos='fade-right'
                            data-aos-delay='100'
                            data-aos-easing='ease-in-back'
                        >
                            <div className='text-3xl md:text-4xl xl:text-5xl font-extrabold w-full flex justify-center md:mt-10 max-lg:text-center'>
                                <p className='max-w-[600px]'>
                                    {t('home.learning') + " " + t('home.blockchainIntro')}
                                </p>
                            </div>
                            <div className='font-normal text-disabled w-full flex justify-center max-lg:text-center'>
                                <p className='max-w-full'>
                                    {t('home.platformIntro')}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <div className='flex gap-2 max-lg:gap-4 max-lg:flex-col w-full max-lg:items-center max-w-full'>
                                    {!isAuthenticated ? (
                                        <button
                                            className='pl-5 pr-3 py-2 bg-accent2 text-white font-medium rounded-full hover:scale-105 transition-all duration-500 ease-in-out mb-4 sm:mb-0 sm:mr-4 flex gap-4 items-center'
                                            onClick={() => setClickConnectWallet(true)}
                                        >
                                            <p>{t('home.getStarted')}</p>
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-accent2">{"->"}</div>
                                        </button>
                                    ) : (
                                        <button
                                            className='px-6 py-3 bg-accent2 text-white font-medium rounded-full hover:scale-105 transition-all duration-500 ease-in-out mb-4 sm:mb-0 sm:mr-4'
                                            // onClick={() => {
                                            //     if (!isLoading) logout();
                                            // }}
                                            onClick={() => { !isLoading && handleLogout() }}
                                        >
                                            {t('home.logout')}
                                        </button>
                                    )}
                                    <div className='flex items-center cursor-pointer hover:scale-105 duration-500' onClick={handleHelpVideoClick}>
                                        <img className='h-10 w-10'
                                            src=
                                            {PlayButton} alt={t('home.watchHowItWorks')} />   {/* //  */}
                                        <p className='ml-3 text-base font-normal'>{t('home.watchHowItWorks')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='hidden md:block lg:flex-1 lg:justify-end items-center lg:mt-0'
                            data-aos='fade-up'
                        >
                            {mainHomeSvg}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
