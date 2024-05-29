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
    addProductReview
} from "../controllers/productController.js";

router.route('/')
    .get(authenticate, authorizeAdmin, getProducts)
    .post(authenticate, authorizeAdmin, ExpressFormidable(), addProduct);
router.route('/allproducts')
    .get(getAllProducts);
router.route('/:id')
    .get(fetchProductById)
    .put(authenticate, authorizeAdmin, ExpressFormidable(), updateProductDetails)
    .delete(authenticate, authorizeAdmin, checkId, deleteProduct);
router.route('/:id/reviews')
    .post(authenticate, checkId, addProductReview);

export default router;