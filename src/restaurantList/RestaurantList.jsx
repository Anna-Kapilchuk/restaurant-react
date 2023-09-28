import RestaurantItem from "../restaurantItem/RestaurantItem"
import Grid from '@mui/material/Unstable_Grid2';
import { Container } from "@mui/material";
import { useFetchData, useRestaurants } from "../restaurantContext/Context";
import InfiniteScroll from "react-infinite-scroller";
import './RestaurantList.css'


const RestaurantList = () => {


    const restaurants = useRestaurants()
    const loadFunc = useFetchData()

    const {count, next, results} = restaurants

    const items = results.map((rest) => {
        return( 
                <Grid item key={rest.id}  xs={12} sm={6} md={4}>
                    <RestaurantItem  rest={rest}/>
                </Grid>
                )
        })
 
    return(
        <>
            <Container maxWidth='xl' sx={{overflow:'auto'}} >
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadFunc}
                        hasMore={next !== null}
                        loader={<div className="loader" key={0}>Loading ...</div>}>
                            <Grid container spacing={4}>
                                    {items}
                            </Grid>

                    </InfiniteScroll>
            </Container>

        </>
    )
}

export default RestaurantList



{/* <Container maxWidth='xl'>
<Grid container spacing={4}>
<Grid   xs={12} sm={6} md={4}>
        <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={next !== null}
            loader={<div className="loader" key={0}>Loading ...</div>}
        >
            {items}
        </InfiniteScroll>
    </Grid>
</Grid>
</Container> */}