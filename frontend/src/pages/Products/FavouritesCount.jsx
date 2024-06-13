import { useSelector } from "react-redux"



const FavouritesCount = () => {
    const favourites = useSelector(state => state.favourites)
    const favouritesCount = favourites.length
  return (
    <div className="absolute left-5 top-8">
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
            {favouritesCount}
        </span>
    </div>
  )
}

export default FavouritesCount