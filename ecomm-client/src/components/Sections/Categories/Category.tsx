import type { CardProps } from "../../Card/Card"
import Card from "../../Card/Card"
import SectionHeading from "../SectionsHeading/SectionHeading"

const Category = ({ title, data }: { title: string, data: CardProps[] }) => {
    return (
        <>
            <SectionHeading title={title} />
            <div className="flex flex-wrap justify-start gap-x-6 gap-y-10 px-12">
                {data && data.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        imagePath={item.imagePath}
                        description={item.description}
                        actionArrow={true}
                        height="280px"
                        width="200px"
                    />
                ))}
            </div>
        </>
    )
}

export default Category
