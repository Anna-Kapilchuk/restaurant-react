import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import { useContext, useEffect} from 'react';
import axios from 'axios';
import { ME_URL, RESTAURANTS_LIST_URL } from './infra/urls';
import {FetchDataContext, ResIdToAddProvider, SetUserContext, useRestaurants, useSetRestaurant } from './restaurantContext/Context';
import Notification from './notification/Notification';




function App() {

  const setUser = useContext(SetUserContext)
  // const [restaurants, setResturants] = useState({results:[]})
  const restaurants = useRestaurants()
  const setResturants = useSetRestaurant()



  const fetchData = async () => {
    let urlToSend = RESTAURANTS_LIST_URL

    if (restaurants.results.length > 0) {
        urlToSend = restaurants.next
    }
    try{
        const response = await axios.get(urlToSend)
        setResturants(
          {...restaurants, 
            next: response.data.next,
            results: [...restaurants.results, ...response.data.results]
          }
        )
    }catch (e) {
    }}

    const fetchDataUser = async () => {

          const meResponse = await axios.get(ME_URL)
          setUser({
              user: {...meResponse.data}
        })
      }

  useEffect( 
    () => {
        fetchData()
        fetchDataUser()
    },[])


  return (
    <>
      <Header/>
        <ResIdToAddProvider>
          <FetchDataContext.Provider value={fetchData}>
              <Outlet /> 
          </FetchDataContext.Provider>
        </ResIdToAddProvider>
      <Notification />
    </>
  );
}

export default App;
