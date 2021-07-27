import React, { useState, createContext } from 'react';

interface Restaurant{
    name: string,
    location: string,
    price_range: number,
    id: number
}
interface Restaurants{
    restaurants: Record<string, any>
    setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>
    addRestaurants: (restaurant: Restaurant) => void;
}

export const RestaurantContext = createContext({} as Restaurants);

export const RestaurantsContextProvider = (props: any) => {
    const [restaurants, setRestaurants] = useState([] as Restaurant[]);

    const addRestaurants = (restaurant: Restaurant) => {
        setRestaurants([...restaurants,restaurant])
    }

    return (
        <RestaurantContext.Provider value={{restaurants, setRestaurants, addRestaurants}}>
            {props.children}
        </RestaurantContext.Provider>
    )
}