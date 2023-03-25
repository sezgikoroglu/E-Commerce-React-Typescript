import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { getProductDetails } from "../services/products";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { setBasketItems } from "../store/features/basket/basket";
import { display } from "@mui/system";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.products.details);
  const basket = useSelector((state: RootState) => state.basket.items);
  const [images, setImages] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [params.id]);

  useEffect(() => {
    if (details) {
      setImages(details.images);
    }
  }, [details]);

  const nextSlide = () => {
    if (slideIndex !== images.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === images.length) {
      setSlideIndex(0);
    }
  };
  const prevSlide = () => {
    if (slideIndex !== 0) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 0) {
      setSlideIndex(images.length);
    }
  };

  const addToBasket=(details:any)=>{
    
    const isInItems=basket.some(x=>x.id==details.id)
    let items=[];
    if(isInItems){
      const index = basket.findIndex(x => x.id == details.id);
      const amount = basket[index].amount;
      items = [...basket]
      items[index] = { ...details, amount: amount + 1 }
    }else{
      items=[...basket,{...details,amount:1}]
    }

    dispatch(setBasketItems(items))
    localStorage.setItem("basket", JSON.stringify(items))
  }

  return (
    <>
      {details && (
        <div className="details-container">
          <div className="images-container">
            <div className="img-container">
              <img className="img-detail" src={images[slideIndex]}></img>
              <ArrowForwardIosIcon
                className="next"
                onClick={nextSlide}
                direction="next"
              ></ArrowForwardIosIcon>
              <ArrowBackIosIcon
                className="prev"
                onClick={prevSlide}
                direction="prev"
              ></ArrowBackIosIcon>
            </div>
            <div className="small-img-container">
              {details.images.map((img: string, index: number) => (
                <img
                  key={img}
                  className="img-01-A"
                  src={img}
                  onClick={() => {
                    setSlideIndex(index);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="content-container">
            <div className="desc-item-01">{details.title}</div>
            <p className="desc-item-02">{details.description}</p>
            <div className="desc-item-03">
              <Rating
                name="half-rating"
                readOnly
                value={details.rating}
                precision={0.25}
              />
              <div>{details.price} $</div>
              <div>Discount: {details.discountPercentage} %</div>
              {
                basket.some(x=>x.id==details.id) && 
                (
                  <Tooltip title="The product is already in your cart">
                  <IconButton>
                  <button disabled onClick={()=>{addToBasket(details)}}>In Card</button>
                  </IconButton>
                  </Tooltip>
                )
                
              }
              {
                !(basket.some(x=>x.id==details.id)) && 
                <button onClick={()=>{addToBasket(details)}}>Add to Card</button>
              }
              
             
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
