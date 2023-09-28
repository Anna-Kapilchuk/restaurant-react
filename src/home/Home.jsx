import './Home.css'
import RestaurantList from "../restaurantList/RestaurantList";
import { useEffect, useState } from 'react';
import { RESTAURANTS_LIST_URL } from '../infra/urls';
import axios from 'axios';
import IWant from '../iWant/IWant';

const Home = () => {


    return(

        <div style={{backgroundColor: 'rgb(255, 211, 51)', maxHeight: '150em'}}>
            <div className="home-img"> </div>
            <div className="col-yel"></div>
                <IWant />
            <div style={{height:"70em"}}>
                <RestaurantList />
            </div>
        </div>

    )
        
}

export default Home
