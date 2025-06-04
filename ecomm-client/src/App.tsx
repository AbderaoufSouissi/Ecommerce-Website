import { useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import Category from "./components/Sections/Categories/Category";
import NewArrivals from "./components/Sections/NewArrivals";
import content from "./data/content.json";
import { fetchCategories } from "./api/fetchCategories";

function App() {
  
  useEffect(() => {
    fetchCategories().then(response=> console.log("response: ",response)).catch()
  },[])

  return (
    <>
      <HeroSection />
      <NewArrivals />
      {content?.pages?.shop?.sections?.map((item, index) => (<Category key={item.title + index} {...item} />))}
      <Footer content={{ items: content.footer.items, copyright: content.copyright }}/>
      
    </>
  );
}

export default App;
