/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import axiosInstance from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

interface Restaurant{
    name: string,
    location: string,
    price_range: number,
    id: number
}

const RestaurantList = (props: any) => {
    const { restaurants, setRestaurants } = useContext(RestaurantContext);
    const getRestaurants = async () => {
        try {

            const result = await axiosInstance.get('/');
            const restaurantsArray = result.data.data.restaurants;
            setRestaurants(restaurantsArray);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async(id: number) =>{
        try {
            await axiosInstance.delete(`/${id}`);
            setRestaurants(restaurants.filter((restaurant:Restaurant) => restaurant.id !== id))
        } catch (error) {
            
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
                    {restaurants && restaurants.map((restaurant:Restaurant) => {
                        return (
                            <tr key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{'$'.repeat(restaurant.price_range)}</td>
                                <td>Rating</td>
                                <td><button className="btn btn-warning">Update</button></td>
                                <td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>

                        )

                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
