import React, { useState, useContext } from 'react';
import axiosInstance from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

const AddRestaurant = () => {
    const { addRestaurants } = useContext(RestaurantContext);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');

    const handleSubmit = async(event: React.SyntheticEvent) =>{
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/',{
                name, 
                location,
                price_range: priceRange
            })
            console.log(response);
            addRestaurants(response.data.data.restaurants)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mb-4">
            <form action="" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name"/>
                    </div>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="location"/>
                    </div>
                    <div className="col">
                        <select className="form-select" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                   <button type="submit" className="col btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
