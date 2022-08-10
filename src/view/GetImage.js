import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Image from "./Image";

function GetImage() {
  const [images, setImages] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const fetchImages = async () => {
        const response = await fetch(
          `https://api.unsplash.com/photos?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
        );
        const data = await response.json();
        setImages(data);
        setRemoveLoading(true)
      };
      fetchImages();
    }, 3000)   
  }, []);

  return (
    <div>
      {!images ? <h2 className="flex items-center justify-center h-screen font-bold text-4-xl text-center text-slate-800">Loading...</h2> : 
      <section className="px-5 container mx-auto">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl my-10 lg:mt-20 lg:mb-16 text-slate-800 capitalize">Recommended for you</h1>
        {!removeLoading && <Loader/>}
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
          {images.map((image, index) => (
            <Image key={image.id} {...image}/>
          ))}
        </div>
      </section>
      }
    </div>
  );
}

export default GetImage;
