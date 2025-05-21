import ArrowIcon from "../common/ArrowIcon";


export type CardProps = {
    imagePath: string,
    title: string,
    description?: string
    actionArrow?: boolean
    height?: string;
    width?: string;
}


const Card = ({ imagePath, title, description, actionArrow, height = "240px", width = "180px" }: CardProps) => {
    return (
        <div className="flex flex-col p-4" style={{ width }}>
            <img
                src={imagePath}
                style={{ height }}
                className="bg-cover bg-center rounded hover:scale-105 cursor-pointer transition duration-200 ease-in-out w-full"
                alt="clothing image"
            />
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-[16px] p-1">{title}</p>
                    {description && <p className="text-[14px] px-1 text-gray-900">{description}</p>}
                </div>
                {actionArrow && (
                    <span className="cursor-pointer pr-2 items-center">
                        <ArrowIcon />
                    </span>
                )}
            </div>
        </div>
    );
};

export default Card;