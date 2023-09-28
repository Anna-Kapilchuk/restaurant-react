import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Rating, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SetNotificationContext } from '../restaurantContext/NotificationContext';
import axios from 'axios';
import { RESTAURANTS_DETAILS_URL } from '../infra/urls';


const RestaurantItem = ({rest}) => {

    const setNotification = React.useContext(SetNotificationContext)
    const [value, setValue] = React.useState(null);
    const navigate = useNavigate()

    const navRestaurant = () => {
        setNotification({open: true, msg: 'going to restaurant'})
        navigate(`/restaurants/${rest.id}`)
    }
    
    const avgRating = async () => {
        const response = 
              await axios.get(`${RESTAURANTS_DETAILS_URL}/${rest.id}/avg-rating`)
              setValue(response.data.restaurant_rating__avg)
    }

    React.useEffect( 
        () => {
            avgRating()
        },[])

        // console.log(value)

    // http://127.0.0.1:8000/api/restaurants/1/avg-rating


    return(
        <>
            <button style={{border: 'none', background:'none'}} onClick={navRestaurant}>
                <Card sx={{ display: 'flex', maxWidth: '32em', minWidth: '25em', height:'10em'}}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        // image={rest.res_pic_url}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {rest.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                  {`  ${rest.city} ${rest.street}`}  
                            </Typography>
                            <Typography component="legend"></Typography>
                            <Rating name="read-only" value={value} readOnly />
                        </CardContent>
                    </Box>
                </Card>
            </button>
        </>
    )
}

export default RestaurantItem