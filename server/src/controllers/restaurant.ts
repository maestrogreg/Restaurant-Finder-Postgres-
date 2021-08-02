import { Request, Response } from 'express';
import db from '../database/data';

export const getRestaurants = async(req: Request, res: Response) =>{
    try{
        const results = await db.query('SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(Avg(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id');
        // console.log(results);
        console.log('reached1')
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
            
        })
    }catch(error){

    }
    
}

export const getRestaurant = async(req: Request, res: Response) =>{
    console.log('reached')
    try {
        const restaurant = await db.query('SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(Avg(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1', [req.params.id]);
        
        if(restaurant.rows.length < 1){
            return res.status(404).json({status:'error', error:'restaurant not found'});
        }
        const reviews = await db.query('select * from reviews where restaurant_id = $1', [req.params.id]);
        console.log(reviews);

        res.status(200).json({
            status: 'success',
            data: {
                restaurants: restaurant.rows[0],
                reviews: reviews.rows
            }
            
        })
    } catch (error) {
        res.status(404).json({status:'error', error:error.message});
    }
}

export const createRestaurant = async(req: Request, res: Response) => {
    try {
        const { name, location, price_range} = req.body;
        const restaurant = await db.query('INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *', [name, location, price_range]);
        res.status(201).json({
            status: 'success',
            data: {
                restaurants: restaurant.rows[0]
            }
            
        })
    } catch (error) {
        res.status(404).json({status:'error', error:error.message});
    }
}

export const updateRestaurant = async(req: Request, res: Response) => {
    try {
        const { name, location, price_range} = req.body;
        const id = req.params.id;
        const restaurant = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [name, location, price_range, id]);
        console.log(restaurant);
        
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: restaurant.rows[0]
            }
            
        })
    } catch (error) {
        res.status(404).json({status:'error', error:error.message});
    }
}

export const deleteRestaurant = async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = db.query('DELETE FROM restaurants WHERE id = $1', [id]);
        res.status(200).json({
            status: 'success',
            message: 'restaurant successfully deleted'
            
        })
    } catch (error) {
        res.status(400).json({status:'error', error:error.message});
    }
}

export const addReview = async(req: Request, res: Response) => {
    try {
        const restaurant_id = req.params.id;
        const {name, review, rating} = req.body;
        const newReview = await db.query('INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *', [restaurant_id, name, review, rating]);
        res.status(201).json({
            status: 'success',
            review: newReview.rows[0]
        })
    } catch (error) {
        res.status(400).json({status:'error', error:error.message});
    }
}