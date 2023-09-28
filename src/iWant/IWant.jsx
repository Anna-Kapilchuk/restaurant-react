import { Box, Stack } from '@mui/material'
import './Iwant.css'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import {useSetRestaurant } from '../restaurantContext/Context'
import RestaurantSearch from '../restaurantSrearch/ReasurantSrearch'
import axios from 'axios'
import { RESTAURANTS_LIST_URL } from '../infra/urls'

const IWant = () => {

    const setResturants = useSetRestaurant()
    const [selected, setSelected] = useState('')

    const handleClick = (e, selected) => {

        const handleSearch = async () => {
            const response = await axios.get(RESTAURANTS_LIST_URL, {params: {res_type: selected}})
            console.log(response.data)
            setResturants(response.data)
        }
        handleSearch()
    }


    return(
        <>
        <Box sx={{justifyContent:'center', display:'flex', mb:'5em'}}>
            <Stack direction={'row'}>
                <button  onClick={(e, selected) => handleClick(e.target.value,'sushi')}>
                    <div className="circle" style={{backgroundImage: 'url(https://storage.googleapis.com/restaurant-jb/2198a3c9-d0a8-d2d7-e362-8219f191b688.jpg)'}}>
                        <h2 className='text'>Sushi</h2>
                    </div>
                </button>
                <button onClick={(e, selected) => handleClick(e.target.value,'Hamburger')}>
                    <div className="circle" style={{backgroundImage: 'url(https://storage.googleapis.com/restaurant-jb/hamburger-de-beterraba-vegano-0015072609200fe6de9f9428.jpg)'}}>
                        <h2 className='text'>Hamburger</h2>
                    </div>
                </button>
                <button onClick={(e, selected) => handleClick(e.target.value,'pizza')}>
                    <div className="circle" style={{backgroundImage: 'url(https://storage.googleapis.com/restaurant-jb/acc437797968b7475dce84d0bf838ae8-220c08548cac211cc7db219bb52f46cf_XL.jpg)'}}>
                        <h2 className='text'>Pizza</h2>
                    </div>
                </button>
                <button onClick={(e, selected) => handleClick(e.target.value,'pasta')}>
                    <div className="circle" style={{backgroundImage: 'url(https://storage.googleapis.com/restaurant-jb/94f18a7d-c95f-3bd9-f0c5-4c4dc975167a.jpg)'}}>
                        <h2 className='text'>Pasta</h2>
                    </div>
                </button>
                <button onClick={(e, selected) => handleClick(e.target.value,'dessert')}>
                    <div className="circle" style={{backgroundImage: 'url(https://storage.googleapis.com/restaurant-jb/256x256bb.jpg)'}}>
                        <h2 className='text'>Dessert</h2>
                    </div>
                </button>
                <button onClick={(e, selected) => handleClick(e.target.value,'mexican')}>
                    <div className="circle" style={{backgroundImage: 'url(https://storage.googleapis.com/restaurant-jb/B4791FA2-5665-41CF-8FE7-2D863889214E.jpeg)'}}>
                        <h2 className='text'>Mexican</h2>
                    </div>
                </button>
            </Stack>
        </Box>
        </>
    )
}
export default IWant