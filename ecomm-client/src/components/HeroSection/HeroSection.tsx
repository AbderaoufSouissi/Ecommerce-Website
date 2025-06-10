import HeroImage from "../../assets/img/hat.jpg";

const HeroSection = () => {
    return (
        <div className='relative flex items-center bg-cover flext-start bg-center text-left h-svh w-full' style={{ backgroundImage: 'url(' + HeroImage + ') ' }}>
            <div className='absolute top-0 right-0 bottom-0 left-0'></div>
            <main className='px-10 lg:px-24 z-10'>
                <div className='text-left'>
                    <h2 className='text-2xl text-white'>T-shirt / Tops</h2>
                </div>
                <p className='mt-3 text-white sm:mt-5 sm:max-w-xl text-5xl'>
                    Summer
                    Value Pack
                </p>
                <p className='mt-3 text-white sm:mt-5 sm:max-w-xl text-2xl'>
                    cool / colorful / comfy
                </p>
                <button
                className="border-0 rounded mt-6 bg-black px-8 py-2 text-sm font-semibold text-white shadow hover:bg-white hover:text-black hover: cursor-pointer sm:w-auto transition-colors duration-300">
                Shop Now
                </button>
            </main>
        </div>
    )
}


export default HeroSection;
