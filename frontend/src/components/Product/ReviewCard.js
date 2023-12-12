import React from 'react'
import ReactStars from "react-rating-stars-component";
import profilePng from '../../images/Profile.png';
const ReviewCard = ({review}) => {
    const options = {
        value: review.rating,
        edit: false,
        activeColor: "gold",
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
        color: "rgba(20,20,20,0.1)",
      };
  return (
    <div className='reviewCard'>
    <img src={profilePng} alt="User" />
    <p>{review.name}</p>
    <ReactStars {...options} />
    <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
