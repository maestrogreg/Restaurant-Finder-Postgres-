/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';
import StarRating from './StarRating';

interface Restaurant {
    name: string,
    location: string,
    price_range: number,
    id: number,
    average_rating: number,
    count: number
}

const RestaurantList = (props: any) => {
    const { restaurants, setRestaurants } = useContext(RestaurantContext);
    let history = useHistory()
    const getRestaurants = async () => {
        try {

            const result = await axiosInstance.get('/');
            const restaurantsArray = result.data.data.restaurants;
            setRestaurants(restaurantsArray);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async (e: React.SyntheticEvent, id: number) => {
        try {
            e.stopPropagation();
            await axiosInstance.delete(`/${id}`);
            setRestaurants(restaurants.filter((restaurant: Restaurant) => restaurant.id !== id))
        } catch (error) {

        }
    }
    const handleUpdate = async (e: React.SyntheticEvent, id: number) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
    }
    const handleRestaurantSelect = (id: number) => {
        history.push(`/restaurants/${id}`);
    }
    const renderRating = (restaurant: Restaurant) => {
        if(!restaurant.count){
            return(
                <span className="text-warning">0 reviews</span>
            )
        }else{
            return (
                <>
                    <StarRating rating={restaurant.average_rating} />
                    <span className="text-warning m-2">({restaurant.count})</span>
                </>
            )
        }
        
    }
    useEffect(() => {
        getRestaurants();
    }, [])
    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map((restaurant: Restaurant) => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{'$'.repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>

                        )

                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
