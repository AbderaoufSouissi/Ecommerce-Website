import { useMemo } from "react";
import Card, { type CardProps } from "../Card/Card";
import SectionHeading from "./SectionsHeading/SectionHeading";
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
  { title: "", imagePath: dress_shirts },
  { title: "", imagePath: jeans },
  { title: "", imagePath: mannequin },
  { title: "", imagePath: shirts },
  { title: "", imagePath: lumberjack },
  { title: "", imagePath: joggers },
];

const NewArrivals = () => {
  const memoCards = useMemo(
    () =>
      items.map((item, index) => (
        <Card key={index} imagePath={item.imagePath} title={item.title} />
      )),
    []
  );

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
        {memoCards}
      </Carousel>
    </>
  );
};

export default NewArrivals;
