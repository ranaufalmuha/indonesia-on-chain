import React from "react";
import { useTranslation } from "react-i18next";
import {
    blockchainBasicsSvg,
    innovateWithSvg,
    blockchainLearningPlatformSvg,
} from "../utils/svgData";
const AboutSection = () => {
    const { t } = useTranslation();
    const listComponent = [
        {
            title: t("about.section1.title1"),
            description: t("about.section1.description1"),
            img: "https://pbs.twimg.com/media/Gk3v2ClW4AAtXMX?format=jpg&name=4096x4096",
        },
        {
            title: t("about.section1.title2"),
            description: t("about.section1.description2"),
            img: "https://pbs.twimg.com/media/Gg8LkOoaUAARnSz?format=jpg&name=4096x4096",
        },
        {
            title: t("about.section1.title3"),
            description: t("about.section1.description3"),
            img: "https://qessr-fqaaa-aaaak-afoga-cai.icp0.io/testpic.jpg",
        },
    ];

    return (
        <section className="about-section py-36 w-full flex justify-center">
            <div className="flex flex-col px-8 container items-center gap-16">
                {/* 1st ============================ */}
                <div className="flex max-lg:justify-center items-center w-full">
                    {/* TITLE  */}
                    <div className="flex flex-col gap-8 w-2/3 max-lg:w-full max-lg:text-center">
                        <h2 className="text-3xl lg:text-4xl justify-center items-center">
                            {t("about.section1.blockchain") +
                                " " +
                                t("about.section1.learningPlatform")}
                        </h2>
                        <p className="text-disabled">
                            {t("about.section1.platformDescription")}
                        </p>
                    </div>
                </div>

                {/* 2nd ============================ */}
                <div className="w-full grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-10 duration-300">
                    {/* components  */}
                    {listComponent.map((item, i) => (
                        <div key={i} className={`w-full rounded-2xl aspect-square overflow-hidden flex flex-col justify-end  gap-8 relative group duration-300 transition ease-in-out shadow-lg hover:scale-110`}>

                            {/* image  */}
                            <img src={item.img} className="object-cover h-full absolute w-full top-0 left-0" alt="" />

                            {/* text  */}
                            <div className="flex flex-col gap-3 duration-300 z-10 bg-white p-10">
                                <p className="text-xl">{item.title}</p>
                                <p className="text-sm text-disabled">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
