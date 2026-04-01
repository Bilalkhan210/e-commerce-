import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState();
  const [image, setImage] = useState();
  const [size, setSize] = useState("");

  const fetchProductData = async (item) => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
      {/* {product data } */}
      <div className="flex gap-12 sm:gap-12  flex-col sm:flex-row">
        {/* {product image } */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className="w-[24%]  sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
                onClick={(e) => {
                  setImage(e.target.src);
                }}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>

          {/* {product info } */}
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 ">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className=" flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border border-gray-200 py-2 px-4 bg-gray-100 ${size === item ? "border-gray-500 " : ""}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
          onClick={()=>addToCart(productData._id,size)}
          className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700 ">
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5 text-gray-300" />
          <div className="text-sm text-gray-500 flex flex-col gap-1 mt-5">
            <p>100% Original product.</p>
            <p>Cash on delivery is availabel on this product </p>
            <p>Easy return and exchange policy with in 7 days</p>
          </div>
        </div>
      </div>
     
     {/* {description && Reviews } */}

      <div className="mt-20">
        <div className="flex">
          <b className="border border-gray-400 px-5 py-3 text-sm">
            {" "}
            Description
          </b>
          <p className="border border-gray-400 px-5 py-3 text-sm">
            Reviews (122)
          </p>
        </div>
        <div className=" flex flex-col gap-4  border px-6 py-6 text-sm text-gray-700">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            esse enim ducimus quos! Officiis minus numquam dolor tenetur
            molestias voluptatum, eos, itaque quasi minima qui reiciendis
            sapiente fugit quam quidem?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eius
            placeat fuga asperiores voluptatum suscipit voluptates possimus
            architecto ex expedita eligendi, molestias vel maiores, harum libero
            sit, mollitia perspiciatis autem!
          </p>
        </div>
      </div>
      {/* { Display relative products} */}
       
       <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : (
    <div className="opacity:0"></div>
  );
};

export default Product;
