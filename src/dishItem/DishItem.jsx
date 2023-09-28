import { useContext, useState } from "react";
import { SetNotificationContext } from "../restaurantContext/NotificationContext";
import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Typography } from "@mui/material";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import axios from "axios";
import { UserContext } from "../restaurantContext/Context";
import { DISH_RATING } from "../infra/urls";


const DishItem = ({dish}) => {

    const setNotification = useContext(SetNotificationContext)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(4)
    const user = useContext(UserContext)

    console.log(open)
    const handleClose = () =>{
        setOpen(!open)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const handleChange = (e, newValue) => {
        const newRating = async () => {
            try{
                    const respons = await axios.get(`http://127.0.0.1:8000/api/dish-rating/?dish=${dish.id}&user=${user.user.id}`)
                if(respons.data.results[0].id){
                    await axios.get(`http://127.0.0.1:8000/api/dish-rating/${respons.data.results[0].id}`, {dish_rating: newValue})
                    setNotification({open: true, msg: 'rating updated', severity: 'succsess'})
                    }else{
                    const newRatingRespons = await axios.post(DISH_RATING, {dish: dish.id,
                        dish_rating: e, user: user?.user?.id})
                        console.log(`rating: ${newRatingRespons}`)
                        setNotification({open: true, msg: 'Rating added', severity: 'succsess'})
                    }
                const responseRating = await axios.get(`http://127.0.0.1:8000/api/dishes/${dish.id}/avg-rating`)
                    
                    console.log(responseRating)
                }catch (e) {
                    setNotification({open: true, msg: 'Error', severity: 'error'})
                }
        }
 
    }



    return(
        <>
        {/* <button style={{border: 'none', background:'none'}} onClick={handleOpen}>
            <Dialog open={open}  onClose={handleClose} aria-labelledby={dish?.name}>
                <DialogTitle id={dish?.name}>{dish.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
             */}
                <MDBRow>
                    <MDBCol sm="9">
                        <Card sx={{ display: 'flex', maxWidth: '32em', minWidth: '25em', height:'10em'}}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={dish?.dish_pic_url}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography variant='h4' component="div">
                                        {dish?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`  ${dish?.description}`}  
                                    </Typography>
                                    <Typography component="legend"></Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={value}
                                        onChange={(e, newValue) => handleChange(e.target.value, newValue)}
                                    />
                                </CardContent>
                            </Box>
                        </Card>
                    </MDBCol>
                </MDBRow>
                <hr />
            {/* </button> */}
        </>
    );
}
export default DishItem