import express from "express";
import { createOrder, verifyPayment } from "../controllers/razorpayController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route('/create-order').post(authenticate, createOrder);
router.route('/verify-payment').post(authenticate, verifyPayment);

export default router;