import React from 'react'
import StarRating from './StarRating'

interface Review{
    id: number,
    restaurant_id: number,
    name: string,
    review: string,
    rating: number
}
interface ReviewProp{
    reviews: Review[]
}
const Reviews = ({reviews}: ReviewProp) => {
    return (
        <div className="row row-cols-3 mb-2">
            {reviews.map((review)=>{
               return (<div key={review.id} className="card text-white bg-primary mb-3 me-4" style={{maxWidth: '30%'}}>
                <div className="card-header d-flex justify-content-between">
                    <span>{review.name}</span>
                    <span><StarRating rating={review.rating}/></span>
                </div>
                <div className="card-body">
                    <p className="card-text">{review.review}</p>
                </div>
            </div>)
            })}

            {/* 
            <div className="card text-white bg-primary mb-3 me-4" style={{maxWidth: '30%'}}>
                <div className="card-header d-flex justify-content-between">
                    <span>Joe</span>
                    <span><StarRating rating={3}/></span>
                </div>
                <div className="card-body">
                    <p className="card-text">This restaurant was awesome</p>
                </div>
            </div>
            <div className="card text-white bg-primary mb-3 me-4" style={{maxWidth: '30%'}}>
                <div className="card-header d-flex justify-content-between">
                    <span>Joe</span>
                    <span><StarRating rating={3}/></span>
                </div>
                <div className="card-body">
                    <p className="card-text">This restaurant was awesome</p>
                </div>
            </div>
            <div className="card text-white bg-primary mb-3 me-4" style={{maxWidth: '30%'}}>
                <div className="card-header d-flex justify-content-between">
                    <span>Joe</span>
                    <span><StarRating rating={3}/></span>
                </div>
                <div className="card-body">
                    <p className="card-text">This restaurant was awesome</p>
                </div>
            </div> */}
        </div>
    )
}

export default Reviews
