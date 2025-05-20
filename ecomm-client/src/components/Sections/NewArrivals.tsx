import Card, { type CardProps } from "../Card/Card";
import SectionHeading from "./SectionsHeading/SectionHeading";
import TShirt from "../../assets/img/white-tshirt.jpg";
import Shirt from "../../assets/img/brown-dress-shirt.jpg";
import Hat from "../../assets/img/black-hat.jpg";
import Dress from "../../assets/img/red-dress.jpg";
import TNeck from "../../assets/img/black-turtle-neck.jpg";
import BJacket from "../../assets/img/baseball-jacket.jpg";
import LJacket from "../../assets/img/leather-jacket.jpg";
import WDress from "../../assets/img/white-dress_1.jpg";
import Sweatshirt from "../../assets/img/white-dress_2.jpg";

import Carousel from "react-multi-carousel";
import { responsive } from "../../utils/Section.constants";
import "./NewArrivals.css";

const items: CardProps[] = [
  { title: "T-Shirts", imagePath: TShirt, alt: "T-Shirts" },
  { title: "Hats", imagePath: Hat, alt: "Hats" },
  { title: "Dresses", imagePath: Dress, alt: "Dresses" },
  { title: "Dress Shirts", imagePath: Shirt, alt: "Shirts" },
  { title: "Baseball Jackets", imagePath: BJacket, alt: "BJacket" },
  { title: "Leather Jackets", imagePath: LJacket, alt: "LJacket" },
  { title: "White Dresses ", imagePath: WDress, alt: "WDress" },
  { title: "Turtle Necks", imagePath: TNeck, alt: "TNeck" },
  { title: "SweatShirts", imagePath:Sweatshirt , alt: "Sweatshirt" },
];

const NewArrivals = () => {
  return (
    <>
      <SectionHeading title="New Arrivals" />
      <Carousel
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={false}
        showDots={false}
        infinite={false}
        partialVisible={false}
        itemClass={"react-slider-custom-item"}
        className="px-12"
      >
        {items &&
          items.map((item, index) => (
            <Card
              key={index}
              imagePath={item.imagePath}
              title={item.title}
              alt={item.alt}
            />
          ))}
      </Carousel>
    </>
  );
};

export default NewArrivals;
