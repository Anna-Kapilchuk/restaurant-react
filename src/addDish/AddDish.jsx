import { useContext, useState } from "react"
import { resIdToAddContext } from "../restaurantContext/Context"
import { useNavigate } from "react-router-dom"
import { SetNotificationContext } from "../restaurantContext/NotificationContext"
import { Box, Button, Container, TextField } from "@mui/material"
import axios from "axios"
import { ADD_DISH } from "../infra/urls"

const AddDish = () => {

    const resIdToAdd = useContext(resIdToAddContext)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [restaurant, setRestaurant] = useState()
    const setNotification = useContext(SetNotificationContext)
//   const setUser = useContext(SetUserContext)
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
          const response = await axios.post(ADD_DISH, {name: name, description: description, price: price,
            restaurant: resIdToAdd})
                setNotification({open: true, msg: 'dish added', severity: 'success'})
                console.log(response)

            navigate(`/restaurants/${resIdToAdd}`)
            } catch (e) {
                setNotification({open: true, msg: e.response.data.detail, severity: 'error'})
            }    
    };


    return(
        <>
        
        <Container maxWidth='md' style={{marginTop:'10%'}} >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
              <TextField
                // style={{width:'30em'}}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Reastorant Name"
                name="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price"
                type="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField   
                margin="normal"
                required
                fullWidth
                id="descriptione"
                label="Description"
                name="description"
                autoFocus
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{backgroundColor:'rgb(47, 141, 141)'}}
              >
                Add
              </Button>
            </Box>
          </Container>
        </>
    )
}

export default AddDish