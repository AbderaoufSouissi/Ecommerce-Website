import "./App.css";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import Navigation from "./components/Navigation/Navigation";
import Category from "./components/Sections/Categories/Category";
import NewArrivals from "./components/Sections/NewArrivals";
import content from "./data/content.json";

function App() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <NewArrivals />
      {content?.categories && content.categories.map((item, index) => (<Category key={item.title + index} {...item} />))}
      <Footer content={{ items: content.footer.items, copyright: content.copyright }}/>
      
    </>
  );
}

export default App;
