import React, { useState, createContext } from 'react';

interface Restaurants{
    restaurants: Record<string, any>
    setRestaurants: React.Dispatch<React.SetStateAction<never[]>>
}

export const RestaurantContext = createContext({} as Restaurants);

export const RestaurantsContextProvider = (props: any) => {
    const [restaurants, setRestaurants] = useState([]);
    return (
        <RestaurantContext.Provider value={{restaurants, setRestaurants}}>
            {props.children}
        </RestaurantContext.Provider>
    )
}