export type CardProps = {
    imagePath: string,
    title: string,
    alt: string
}


const Card = ({imagePath,title,alt}:CardProps) => {
    return (
        <div className="flex flex-col p-6">
            <img
                src={imagePath}
                className="h-[240px] w-[180px] bg-cover bg-center rounded hover:scale-105 cursor-pointer transition duration-300 ease-in-out"
                alt={alt}
            />

            <p className="text-[16px] p-[5px]">{title}</p>
        </div>
    );
};

export default Card;
