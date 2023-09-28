import { useNavigate, useParams } from "react-router-dom"
import { SetDishesContext, UserContext, setResIdToAddContext, useRestaurants } from "../restaurantContext/Context"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { RESTAURANTS_DETAILS_URL, RES_RATING } from "../infra/urls"
import {MDBCol,MDBContainer,MDBRow,MDBCard,MDBCardText,MDBCardBody,MDBCardImage,
    MDBBtn,MDBBreadcrumb,MDBBreadcrumbItem,MDBProgress,
    MDBProgressBar,MDBIcon,MDBListGroup,MDBListGroupItem} from 'mdb-react-ui-kit';
import Dishes from "../dishes/Dishes"
import { Fab, Rating } from "@mui/material"
import Header from "../header/Header"
import { SetNotificationContext } from "../restaurantContext/NotificationContext"
import AddIcon from '@mui/icons-material/Add';

const DetailedRestaurant = () => {

    const {restaurantId} = useParams()
    const setDishes = useContext(SetDishesContext)
    const [restaurant, setRestaurant] = useState({})
    const [value, setValue] = useState(null);
    const user = useContext(UserContext)
    const setNotification = useContext(SetNotificationContext)
    const navigate = useNavigate()
    const setResIdToAdd = useContext(setResIdToAddContext)

    
        useEffect(() => { 
            const fetchData = async () => {
                    const response = await axios.get(`${RESTAURANTS_DETAILS_URL}/${restaurantId}`)
                    setRestaurant(response.data)
                    const responseDishes = await axios.get(`${RESTAURANTS_DETAILS_URL}/${restaurantId}/dishes`)
                    setDishes(responseDishes.data)
                    const responseRating = 
                    await axios.get(`${RESTAURANTS_DETAILS_URL}/${restaurantId}/avg-rating`)
                    setValue(responseRating.data.restaurant_rating__avg)
                }
                fetchData()
            }
            ,[restaurantId])

        const handleChange = (e, newValue) => {
            const newRating = async () => {
              try{
                if(user.user.id){
                  const respons = await axios.get(`http://127.0.0.1:8000/api/res-rating/?restaurant=${restaurantId}&user=${user.user.id}`)

                  if(respons.data.results[0].id){
                      await axios.get(`http://127.0.0.1:8000/api/res-rating/${respons.data.results[0].id}`, {restaurant_rating: newValue})
                      setNotification({open: true, msg: 'rating updated', severity: 'succsess'})
                      console.log('insideif')
                  
                }else{
                  const newRatingRespons = await axios.post(RES_RATING, {restaurant: restaurantId,
                    restaurant_rating: e, user: user?.user?.id})
                    console.log(`rating: ${newRatingRespons}`)
                    setNotification({open: true, msg: 'rating added', severity: 'succsess'})
                    console.log('insideelse')
              }}
              const responseRating = 
                    await axios.get(`${RESTAURANTS_DETAILS_URL}/${restaurantId}/avg-rating`)
                    setValue(responseRating.data.restaurant_rating__avg)
                    console.log('insideresse')
                }catch(e){
                  setNotification({open: true, msg: 'Error', severity: 'error'})
                }
              }
            }

            const handleClick = () => {
              setResIdToAdd(restaurantId)
              navigate('/add-dish')
            }
      
        

    return(
        <>
            {restaurant &&
                <section style={{ backgroundColor: 'rgb(47, 141, 141)' }}>
                <MDBContainer className="py-5">
                  <MDBRow>
                    <MDBCol>
                      <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4" style={{justifyContent:'center'}}>
                        <MDBBreadcrumbItem active>{restaurant?.name}</MDBBreadcrumbItem>
                      </MDBBreadcrumb>
                    </MDBCol>
                  </MDBRow>
          
                  <MDBRow>
                    <MDBCol lg="4">
                      <MDBCard className="mb-4">
                        <MDBCardBody className="text-center">
                          <MDBCardImage
                            src={restaurant?.res_pic_url}
                            className="rounded-circle"
                            style={{ width: '150px' }}
                            fluid />
                        </MDBCardBody>
                      </MDBCard>

                      <MDBCard className="mb-4">
                        <MDBCardBody>
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Name</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">{restaurant?.name}</MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Type</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">{restaurant?.res_type}</MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Phone</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">{restaurant?.phone_num}</MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Address</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">{`${restaurant?.city} ${restaurant?.street}`}</MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Rating</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(e, newValue) => handleChange(e.target.value, newValue)}
                              />

                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>

                      <MDBCard className="mb-4 mb-lg-0">
                        <MDBCardBody className="p-0">
                          <MDBListGroup flush className="rounded-3">
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                              <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                              <MDBCardText>{restaurant?.instagram}</MDBCardText>
                            </MDBListGroupItem>
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                              <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                              <MDBCardText>{restaurant?.facebook}</MDBCardText>
                            </MDBListGroupItem>
                          </MDBListGroup>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <Dishes  setDishes={setDishes}/>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol >

                  </MDBRow>
                </MDBContainer>
              </section>   
            }
            {user?.user?.is_staff &&
            <Fab size="medium" color="warning" aria-label="add" onClick={handleClick}
             style={{position:'absolute', bottom:'20px', right:'20px'}}>
              <AddIcon />
            </Fab>}
        </>
        
    )
}

export default DetailedRestaurant