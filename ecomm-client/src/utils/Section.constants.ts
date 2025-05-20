export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,             // show 4 items
    slidesToSlide: 4      // slide 4 items
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,             // show 2 items on tablets
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,             // show 1 item on mobile
    slidesToSlide: 1
  }
};
