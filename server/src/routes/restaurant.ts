import { Router } from 'express';
import { getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurant';

const route = Router();

route.get('/', getRestaurants);
route.get('/:id', getRestaurant);
route.post('/', createRestaurant);
route.put('/:id', updateRestaurant);
route.delete('/:id',deleteRestaurant);

export default route;