import { Container, Grid } from "@mui/material"
import DishItem from "../dishItem/DishItem"
import { useContext } from "react"
import { DishesContext } from "../restaurantContext/Context"

const Dishes = () => {

    const dishes = useContext(DishesContext)

    return(
        <>
        <Container maxWidth='lg'>
                        <Grid container spacing={4}>
                            {dishes?.map((dish) => 
                            <Grid item key={dish.id}  xs={12}>
                                <DishItem  dish={dish}/>
                            </Grid>
                            )}
                        </Grid>
        </Container>

    </>
    )
}

export default Dishes