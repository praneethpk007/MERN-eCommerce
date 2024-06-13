//Favourites

export const addFavouritestoLocalStorage = (product) => {
    const favourites = getFavourites()
    if(!favourites.some((p) => p._id === product._id)) {
        favourites.push(product)
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }
}

export const removeFavouritestoLocalStorage = (productId) => {
    const favourites = getFavourites()
    const updateFavourites = favourites.filter((product) => product._id !== productId)
    localStorage.setItem('favourites', JSON.stringify(updateFavourites))
}

export const getFavourites = () => {
    const favouritesJSON = localStorage.getItem('favourites')
    return favouritesJSON ? JSON.parse(favouritesJSON) : []
}