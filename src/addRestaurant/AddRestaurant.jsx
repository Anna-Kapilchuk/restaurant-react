import { Box, Button, Container, Grid, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { SetNotificationContext } from "../restaurantContext/NotificationContext"
import { SetUserContext, UserContext } from "../restaurantContext/Context"
import { useContext, useState } from "react"
import axios from "axios"
import { RESTAURANTS_LIST_URL } from "../infra/urls"

const AddRestaurant = () => {

    const [name, setName] = useState()
    const [resType, setResType] = useState()
    const [phone, setPhone] = useState()
    const [facebook, setFacebook] = useState()
    const [instagram, setInstagram] = useState()
    const [city, setCity] = useState()
    const [street, setStreet] = useState()
    const setNotification = useContext(SetNotificationContext)
//   const setUser = useContext(SetUserContext)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
          const response = await axios.post(RESTAURANTS_LIST_URL, {name: name, res_type: resType, phone_num: phone,
            instagram: instagram, facebook : facebook , city: city, street: street})
                setNotification({open: true, msg: 'restaurant added', severity: 'success'})
                console.log(response)

            navigate(`/restaurants/${response.data.id}`)
            } catch (e) {
                setNotification({open: true, msg: e.response.data.detail, severity: 'error'})
            }    
    };

    return(
        <>
        
        <Container maxWidth='md' >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                style={{width:'30em'}}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Reastorant Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                style={{width:'30em'}}
                margin="normal"
                required
                fullWidth
                id="res_type"
                label="Restaurant Type"
                name="res_type"
                autoComplete="res_type"
                autoFocus
                value={resType}
                onChange={(e) => setResType(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="city"
                label="City"
                type="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="street"
                label="Street"
                type="street"
                id="street"
                autoFocus
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone_num"
                label="Phone"
                type="phone_num"
                id="phone_num"
                autoFocus
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="instagram"
                label="Instagram Url"
                type="instagram"
                id="instagram"
                autoFocus
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="facebook"
                label="Facebook Url"
                type="facebook"
                id="facebook"
                autoFocus
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
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

export default AddRestaurant