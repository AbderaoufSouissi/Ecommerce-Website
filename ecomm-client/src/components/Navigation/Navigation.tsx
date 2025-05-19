const Navigation = () => {
  return (
    <nav className="flex items-center py-6 px-8 justify-between gap-40">
      <div className="flex items-center gap-6">
        {/* LOGO */}
        <a href="/" className="text-3xl text-black gap-8 font-bold">Online Shop</a>
      
      </div>
      
      <div className="flex-wrap items-center gap-10 flex-1">
        {/* NAV ITEMS */}
        <ul className="flex gap-14 text-gray-700 hover:text-black">
          
          <li><a href="/" >Shop</a></li>
          <li><a href="/mens" >Men</a></li>
          <li><a href="/womens">Women</a></li>
          <li><a href="/kids">Kids</a></li>
        
        </ul>
      </div>
      <div>
        {/* SEARCH BAR */}
      </div>

      
      <div>
        {/* ACTION ITEMS icons */}
      </div>
    </nav>
  );
};

export default Navigation;
