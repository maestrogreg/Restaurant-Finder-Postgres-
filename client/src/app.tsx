import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "./screens/Home";
import Restaurant from "./screens/RestaurantPage";
import Update from "./screens/UpdateRestaurant";
import './app.css';
import { RestaurantsContextProvider } from './context/RestaurantContext';


const App = () => {
    return (

        <RestaurantsContextProvider>
            <div className="container"><Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/restaurants/:id/update' component={Update} />
                    <Route exact path='/restaurants/:id' component={Restaurant} />
                </Switch>
            </Router>
            </div>
        </RestaurantsContextProvider>
    )

}

export default App;