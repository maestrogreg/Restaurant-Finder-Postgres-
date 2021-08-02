/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosInstance from '../apis/RestaurantFinder';

type QuizParams = {
    id: string;
};

const UpdateRestaurant = (props: any) => {
    const { id } = useParams<QuizParams>();
    const history = useHistory()
    const [priceRange, setPriceRange] = useState('Price Range');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const fetchData = async () => {
        const response = await axiosInstance.get(`/${id}`);
        const restaurant = response.data.data.restaurants;
        setName(restaurant.name);
        setPriceRange(restaurant.price_range);
        setLocation(restaurant.location);

    }
    const handleSubmit = async (event: React.SyntheticEvent) => {
        try {
            event.preventDefault();
            await axiosInstance.put(`/${id}`, {
                name,
                location,
                price_range: priceRange
            });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <form onSubmit={handleSubmit} action="">
                <div className="form-group">
                    <label htmlFor='name'>name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor='location'>location</label>
                    <input onChange={e => setLocation(e.target.value)} value={location} id="location" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <select className="form-select my-4" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant
