import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../apis/RestaurantFinder';

type QuizParams = {
    id: string;
};

const AddReviews = () => {
    const { id } = useParams<QuizParams>();
    const history = useHistory();
    const location = useLocation();
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(1);
    
    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
             await axiosInstance.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating
            });
            history.push('/');
            history.push(location.pathname);   
        } catch (error) {
            
        }
    }

    return (
        <div className="mb-2">
            <form action="">
                <div className="row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e => setRating(parseInt(e.target.value))} id="name" className="form-select">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea value={reviewText} onChange={e=> setReviewText(e.target.value)} id="review" className="form-control mb-3"></textarea>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddReviews
