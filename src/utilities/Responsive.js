import { useEffect, useState } from "react";
function Responsive(){
    const [width, setWidth] = useState(window.innerWidth);
    
    const isDesktop = width >= 1400; 
    const isLaptop = width >= 1200 && width < 1399; 
    const isMiniLaptop = width >= 992 && width < 1199; 
    const isTablet = width >= 768 && width < 991; 
    const isMobile = width < 768; 

/*     console.log('isDesktop',isDesktop);
    console.log('isLaptop',isLaptop);
    console.log('isMiniLaptop',isMiniLaptop);
    console.log('isTablet',isTablet);
    console.log('isMobile',isMobile); */

    useEffect(() => {
      const screenSize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", screenSize);
      return () => window.removeEventListener("resize", screenSize);
    }, []);

    return {isDesktop,isLaptop,isMiniLaptop,isTablet,isMobile};
}

export default Responsive