import express from "express";
import ExpressFormidable from "express-formidable";
const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

//controllers
import { addProduct, 
    updateProductDetails, 
    deleteProduct, 
    getProducts, 
    fetchProductById, 
    getAllProducts, 
    addProductReview,
    getTopProducts,
    getNewProducts,
    getFilteredProducts
} from "../controllers/productController.js";

router.route('/')
    .get(authenticate, getProducts)
    .post(authenticate, authorizeAdmin, ExpressFormidable(), addProduct);
router.route('/allproducts')
    .get(getAllProducts);
router.route('/top')
    .get(getTopProducts);
router.route('/new')
    .get(getNewProducts);
router.route('/:id')
    .get(fetchProductById)
    .put(authenticate, authorizeAdmin, ExpressFormidable(), updateProductDetails)
    .delete(authenticate, authorizeAdmin, checkId, deleteProduct);
router.route('/:id/reviews')
    .post(authenticate, checkId, addProductReview);
router.route('/filtered-products').post(getFilteredProducts)
export default router;