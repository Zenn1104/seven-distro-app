import { useState } from "react";
import { Head } from "@inertiajs/react";
import { Dialog } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const slides = [
    {
        id: 1,
        image: "/storage/images/image-1.jpg",
        title: "Selamat Datang!",
        subtitle: "Temukan koleksi distro terbaik di sini.",
    },
    {
        id: 2,
        image: "/storage/images/image-2.jpg",
        title: "Diskon Spesial!",
        subtitle: "Dapatkan penawaran menarik untuk koleksi terbaru.",
    },
    {
        id: 3,
        image: "/storage/images/image-3.jpg",
        title: "Belanja Mudah & Cepat!",
        subtitle: "Dapatkan pengalaman berbelanja terbaik.",
    },
];

export default function SectionHero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <Head title="Home" />
            <div className="relative w-full h-[500px] overflow-hidden">
                {/* Carousel */}
                <div className="w-full h-full relative">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute w-full h-full transition-opacity duration-700 ${
                                index === currentIndex
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                                <h2 className="text-4xl font-bold md:text-7xl">
                                    {slide.title}
                                </h2>
                                <p className="text-lg mt-2 md:text-xl">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-white" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full"
                >
                    <ChevronRightIcon className="w-6 h-6 text-white" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                                index === currentIndex
                                    ? "bg-white"
                                    : "bg-gray-400"
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
