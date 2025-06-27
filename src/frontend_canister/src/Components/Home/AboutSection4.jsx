import React from 'react'
import CollegeGirl from '../../../assets/images/CollegeGirl.png'
import { useTranslation } from 'react-i18next';
const AboutSection4 = () => {
    const { t } = useTranslation();
    const listVideo = [
        {
            img: "https://pbs.twimg.com/media/GRERffDaAAA3dOt?format=jpg&name=large",
            title: "Developer Courses",
            difficulty: "Beginner",
        },
        {
            img: "https://pbs.twimg.com/media/GRERffDaAAA3dOt?format=jpg&name=large",
            title: "Basics Bootcamp",
            difficulty: "Beginner",
        },
        {
            img: "https://pbs.twimg.com/media/GRERffDaAAA3dOt?format=jpg&name=large",
            title: "ICVR",
            difficulty: "Advance",
        }
    ]
    return (

        <section id='features' className="about-section bg-white  w-full flex justify-center">
            <div className="container flex flex-col gap-12 px-8">


                {/* 1st ============================ */}
                <div className="flex max-lg:justify-center items-center w-full">
                    {/* TITLE  */}
                    <div className="flex flex-col gap-8 w-2/3 max-lg:w-full max-lg:text-center">
                        <h2 className="text-3xl lg:text-4xl justify-center items-center">
                            {t('about.section4.title')}
                        </h2>
                    </div>
                </div>

                {/* 2nd ============================ */}
                <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-10 duration-300">
                    {listVideo.map((item, i) => (
                        <div key={i} className={`w-full rounded-2xl aspect-square overflow-hidden flex flex-col justify-end relative group duration-300 transition ease-in-out shadow-lg hover:scale-110`}>

                            {/* image  */}
                            <img src={item.img} className="object-cover h-full w-full top-0 left-0" alt="" />

                            {/* text  */}
                            <div className="flex flex-col gap-3 duration-300 z-10 bg-white p-10">
                                <p className="text-xl capitalize">{item.title}</p>
                                <p className="text-sm text-accent3 capitalize">
                                    {item.difficulty}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </section>
    )
}

export default AboutSection4
