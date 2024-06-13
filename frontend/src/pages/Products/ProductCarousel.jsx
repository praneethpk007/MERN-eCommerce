import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from "moment"
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from "react-icons/fa"

const ProductCarousel = () => {
    const {data: products, isLoading, error} = useGetTopProductsQuery();

    if(isLoading) return <Loader />
    if(error) return <Message variant='danger'>{error}</Message>

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: "0px",
    }

  return (
    <div className="mb-4 xl:block lg:block md:block">
        {isLoading ? null : error ? (
            <Message variant='danger'>
                {error?.data?.message || error.message}
            </Message>
        ) : (
            <Slider {...settings} className="xl:w-[30rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block items-center">
                {products.map(({image, id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock}) => (
                    <div key={id}>
                        <img 
                            src={image} 
                            alt={name} 
                            className="w-auto rounded-lg object-fit h-[20rem] mb-4" 
                        />
                        <div className="flex flex-col justify-between w-[25rem]">
                            <h2>{name}</h2>
                            <p>₹ {price}</p> <br /><br />
                            <p className="w-[25rem]">{description.substring(0,160)}...</p><br /><br />
                        </div>
                        <div className="flex justify-between w-[20rem]">
                            <div className="one">
                                <h1 className="flex items-center mb-2 w-[15rem]">
                                    <FaStore className="mr-2 text-white" />Brand: {brand}
                                </h1>
                                <h1 className="flex items-center mb-2 w-[15rem]">
                                    <FaClock className="mr-2 text-white" />Added: {moment(createdAt).fromNow()}
                                </h1>
                                <h1 className="flex items-center mb-2 w-[15rem]">
                                    <FaStar className="mr-2 text-white" />Reviews: {numReviews}
                                </h1>
                            </div>
                            <div className="two">
                                <h1 className="flex items-center mb-2 mr-w-[5rem]">
                                    <FaStar className="mr-2 text-white" /> Ratings: 
                                    {Math.round(rating)}
                                </h1>
                                <h1 className="flex items-center mb-2 mr-w-[5rem]">
                                    <FaShoppingCart className="mr-2 text-white" /> Quantity: 
                                    {quantity}
                                </h1>
                                <h1 className="flex items-center mb-2 mr-w-[5rem]">
                                    <FaBox className="mr-2 text-white" /> In Stock: 
                                    {countInStock}
                                </h1>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        )}
    </div>
  )
}

export default ProductCarousel