import { createContext, useContext, useState } from "react"


export const ReataurantsContext = createContext(null)

export const useRestaurants = () => {
    return useContext(ReataurantsContext)
}


export const SetRestaurantsContext = createContext(null)

export const useSetRestaurant = () => {
    return useContext(SetRestaurantsContext)
}


export const FetchDataContext = createContext(null)

export const useFetchData = () => {
    return useContext(FetchDataContext)
}

export const DishesContext = createContext(null)
export const SetDishesContext = createContext(null)

export const RestaurantProvider = ({children}) => {

    const [restaurants, setResturants] = useState({results:[]})
    const [dishes, setDishes] = useState([])

    return(
        <>
            <ReataurantsContext.Provider value={restaurants}>
                <SetRestaurantsContext.Provider value={setResturants}>
                    <DishesContext.Provider value={dishes}>
                        <SetDishesContext.Provider value={setDishes}>
                            {children}
                        </SetDishesContext.Provider>
                    </DishesContext.Provider>
                </SetRestaurantsContext.Provider>
            </ReataurantsContext.Provider>
        </>
    )
}




export const UserContext = createContext(null)
export const SetUserContext = createContext(null)

const UserProvider = ({children}) => {
    const [user, setUser] = useState({user: null})

    return(
        <UserContext.Provider value={user}>
            <SetUserContext.Provider value={setUser}>
                {children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    )
}

export default UserProvider



export const resIdToAddContext = createContext(null)
export const setResIdToAddContext = createContext(null)

export const ResIdToAddProvider = ({children}) => {

        const [resIdToAdd, setResIDToAdd] = useState(null)

    return(

        <resIdToAddContext.Provider value={resIdToAdd}>
            <setResIdToAddContext.Provider value={setResIDToAdd}>
                {children}
            </setResIdToAddContext.Provider>
        </resIdToAddContext.Provider>
    )
}


