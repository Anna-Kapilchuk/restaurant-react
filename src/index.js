import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './home/Home';
import DetailedRestaurant from './detailedRestaurant/DetailedRestaurant';
import LoginPage from './login/LoginPage';
import UserProvider, { RestaurantProvider } from './restaurantContext/Context';
import SignUp from './login/SignUp';
import Notification from './notification/Notification';
import axios from 'axios';
import Profile from './profile/Profile';
import AddRestaurant from './addRestaurant/AddRestaurant';
import AddDish from './addDish/AddDish';
import { createTheme } from '@mui/material';


axios.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('token')

    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }
)

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: `restaurants/:restaurantId`,
        element: <DetailedRestaurant />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path:'/add-restaurant',
        element: <AddRestaurant />
      },
      {
        path:'/add-dish',
        element: <AddDish />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/signup',
    element: <SignUp />
  }

])

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(255, 211, 51)',
    },
    secondary: {
      main: 'rgb(90, 186, 135)',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Notification>
      <UserProvider>
        <RestaurantProvider>
          <RouterProvider router={router} />
        </RestaurantProvider>
      </UserProvider>
  </Notification>

)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
