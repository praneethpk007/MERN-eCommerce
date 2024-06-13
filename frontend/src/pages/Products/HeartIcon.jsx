import { useEffect } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { addToFavourites, removeFromFavourites, setFavourites } from "../../redux/features/favourites/favouriteSlice" 
import { addFavouritestoLocalStorage, removeFavouritestoLocalStorage, getFavourites } from "../../Utils/localStorage"

const HeartIcon = ({product}) => {
    const dispatch = useDispatch()
    const favourites = useSelector((state) => state.favourites) || []
    const isFavourite = favourites.some((p) => p._id === product._id)
    
    useEffect(() => {
        const favouritesFromLocalStorage = getFavourites()
        dispatch(setFavourites(favouritesFromLocalStorage))
    },[])

    const toggleFavourites = () => {
        if(isFavourite){
            dispatch(removeFromFavourites(product))
            removeFavouritestoLocalStorage(product._id)
        } else{
            dispatch(addToFavourites(product))
            addFavouritestoLocalStorage(product)
        }
    }

  return (
    <div onClick={toggleFavourites} className="absolute top-2 right-5 cursor-pointer">
        {isFavourite
            ? (<FaHeart className="text-pink-500"/>)
            : (<FaRegHeart className="text-white"/>)}
    </div>
  )
}

export default HeartIcon