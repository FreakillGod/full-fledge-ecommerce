import React from 'react'

const ReviewCard = ({review}) => {
  return (
    <div className='reviewCard'>
        <img src={'#'} alt="user"/>
        <p>{review.name}</p>
        <p>Ratings</p>
        <p>Stars here</p>
        <span >{review.comment}</span>
    </div>
  )
}

export default ReviewCard