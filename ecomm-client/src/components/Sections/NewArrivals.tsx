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
import dress_shirts from '../../assets/img/arrivals-dress-shirts.jpg';
import jeans from '../../assets/img/arrivals-jeans.jpg';
import mannequin from '../../assets/img/arrivals-mannequin.jpg';
import shirts from '../../assets/img/arrivals-shirts.jpg';
import lumberjack from '../../assets/img/arrivals-lumberjack.jpg';
import joggers from '../../assets/img/arrivals-joggers.jpg';


const items: CardProps[] = [
  { title: "", imagePath:dress_shirts },
  { title: "", imagePath:jeans },
  { title: "", imagePath: mannequin },
  { title: "", imagePath: shirts },
  { title: "", imagePath: lumberjack },
  { title: "", imagePath: joggers },
  
  // { title: "Hats", imagePath: Hat },
  // { title: "Dresses", imagePath: Dress },
  // { title: "Dress Shirts", imagePath: Shirt },
  // { title: "Baseball Jackets", imagePath: BJacket },
  // { title: "Leather Jackets", imagePath: LJacket },
  // { title: "White Dresses", imagePath: WDress },
  // { title: "Turtle Necks", imagePath: TNeck },
  // { title: "SweatShirts", imagePath: Sweatshirt },
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
        className="px-8"
      >
        {items &&
          items.map((item, index) => (
            <Card
              key={index}
              imagePath={item.imagePath}
              title={item.title}
            />
          ))}
      </Carousel>
    </>
  );
};

export default NewArrivals;
