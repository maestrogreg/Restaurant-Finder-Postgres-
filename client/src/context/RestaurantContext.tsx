import React, { useState, createContext } from 'react';

interface Restaurant{
    name?: string,
    location?: string,
    price_range?: number,
    id?: number,
    restaurant_id?: number,
    count?: number,
    average_rating?: number
}
interface Review{
    id: number,
    restaurant_id: number,
    name: string,
    review: string,
    rating: number
}
interface completeRestaurantData{
    restaurants: Record<string,any>,
    reviews: Review[]
}
interface Restaurants{
    restaurants: Record<string, any>;
    setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
    addRestaurants: (restaurant: Restaurant) => void;
    selectedRestaurant: completeRestaurantData;
    setSelectedRestaurant: (selectedRestaurant: completeRestaurantData) => void
}

export const RestaurantContext = createContext({} as Restaurants);

export const RestaurantsContextProvider = (props: any) => {
    const [restaurants, setRestaurants] = useState([] as Restaurant[]);
    const [selectedRestaurant, setSelectedRestaurant] = useState({} as completeRestaurantData);

    const addRestaurants = (restaurant: Restaurant) => {
        setRestaurants([...restaurants,restaurant])
    }

    return (
        <RestaurantContext.Provider value={{restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant}}>
            {props.children}
        </RestaurantContext.Provider>
    )
}