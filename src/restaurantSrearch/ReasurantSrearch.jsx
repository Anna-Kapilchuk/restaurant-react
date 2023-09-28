// import { Box, Stack } from "@mui/material"
// import SearchIcon from '@mui/icons-material/Search';
// import axios from "axios";
// import { RESTAURANTS_LIST_URL } from "../infra/urls";
// import {useState } from "react";
// import {useSetRestaurant } from "../restaurantContext/Context";


// const RestaurantSearch = () => {

//     const [selected, setSelected] = useState('')
//     const setResturants = useSetRestaurant()


//     const handleSearch = async () => {
//         const response = await axios.get(RESTAURANTS_LIST_URL, {params: {res_type: selected}})
//         console.log(response.data)
//         setResturants(response.data)
//         setSelected('')
//     }

//     return(
//         null
//         // <Box>
//         //     <Stack direction={'row'} justifyContent={'center'}>
//         //         <input type="text" className="in-put" value={selected} onChange={(e) => setSelected(e.target.value)}/>
//         //         <button className="b-search" onClick={handleSearch}>
//         //             <SearchIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 , fontSize: '3em'}}/>
//         //         </button>
//         //     </Stack>
//         // </Box>
//     )
// }

// export default RestaurantSearch