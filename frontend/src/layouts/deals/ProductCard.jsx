import React from "react";
import "./productCard.css";
import image from "../../assets/img/nat-1.jpg";
import pro from "../../assets/img/pro.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Link
      // onClick={() => navigate(`product/${product._id}`, { replace: true })}
      to={`/product/${product._id}`}
      className="card"
    >
      <div className="card__img-wrapper">
        <img src={image} alt="poductiamge" className="card__img" />
      </div>
      <h6 className="card__name">{product.name}</h6>
      <div className="card__rating">{product.ratings}</div>
      <span className="card__rating">{product.category}</span>
      <div className="card__price">Rs {product.price} /-</div>
      <div className="card__price">{product.numOfReviews} reviews</div>
      <div className="card__name">{product.createdAt}</div>
    </Link>
  );
};

export default ProductCard;
