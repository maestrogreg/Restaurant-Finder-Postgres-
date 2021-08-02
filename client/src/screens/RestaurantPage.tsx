/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext';
import axiosInstance from '../apis/RestaurantFinder';
// import StarRating from '../components/StarRating';
import Reviews from '../components/Reviewws';
import AddReviews from '../components/AddReviews';
import StarRating from '../components/StarRating';

type QuizParams = {
    id: string;
};

const RestaurantPage = () => {
    const { selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext) 
    const { id } = useParams<QuizParams>();

    const fetchRestaurant = async() => {
        try {
            const response = await axiosInstance.get(`/${id}`);
            console.log(response)
            setSelectedRestaurant(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchRestaurant();
    }, []);
    return (
        <div>
            {selectedRestaurant.restaurants && (
                <>
                <h1 className="text-center display-1">{selectedRestaurant.restaurants.name}</h1>
                <div className="text-center">
                    <StarRating rating={selectedRestaurant.restaurants.average_rating} />
                    <span className="text-warning m-1">
                        {selectedRestaurant.restaurants.count ? `(${selectedRestaurant.restaurants.count})` : "(0)"}
                    </span>
                </div>
                <div className="mt-3">
                    <Reviews reviews={selectedRestaurant.reviews} />
                    <AddReviews />
                </div>
                </>
            )}
        </div>
    )
}

export default RestaurantPage
