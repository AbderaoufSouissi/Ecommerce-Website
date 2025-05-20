import Card, { type CardProps } from "../Card/Card";
import SectionHeading from "./SectionsHeading/SectionHeading";
import TShirt from "../../assets/img/white-tshirt.jpg";
import Shirt from "../../assets/img/brown-dress-shirt.jpg";
import Hat from "../../assets/img/black-hat.jpg";
import Dress from "../../assets/img/red-dress.jpg";
import TNecks from "../../assets/img/black-turtle-neck.jpg";



const items: CardProps[] = [
  { title: "T-Shirts", imagePath: TShirt, alt: "T-Shirts" },
  { title: "Hats", imagePath: Hat, alt: "Hats" },
  { title: "Dresses", imagePath: Dress, alt: "Dresses" },
  { title: "Dress Shirts", imagePath: Shirt, alt: "Shirts" },
  { title: "Turtle Necks", imagePath: TNecks, alt: "Turtle Necks" },
];

const NewArrivals = () => {
  return (
    <>
      <SectionHeading title="New Arrivals" />
      <div className="flex flex-wrap px-[20px]">
        {items && items.map((item, index) => (
          <Card
            key={index}
            imagePath={item.imagePath}
            title={item.title}
            alt={item.alt}
          />
        ))}
      </div>
    </>
  );
};

export default NewArrivals;
