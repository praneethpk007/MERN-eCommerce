import express from "express";
const router = express.Router();

import {authenticate, authorizeAdmin} from '../middlewares/authMiddleware.js';
import {
    createOrder, 
    getAllOrders,
    getUserOrders,
    countTotalOrders,
    countTotalSales,
    countTotalSalesByDate,
    getOrderById,
    markOrderAsPaid,
    markOrderAsDelivered,
} from '../controllers/orderController.js';

router.route("/")
    .post(authenticate, createOrder)
    .get(authenticate, authorizeAdmin, getAllOrders)

router.route('/mine').get(authenticate, getUserOrders)
router.route('/total-orders').get(authenticate, authorizeAdmin, countTotalOrders)
router.route('/total-sales').get(authenticate, authorizeAdmin, countTotalSales)
router.route('/total-sales-by-date').get(authenticate, authorizeAdmin, countTotalSalesByDate)
router.route('/:id').get(authenticate, getOrderById)
router.route('/:id/pay').put(authenticate, markOrderAsPaid)
router.route('/:id/deliver').put(authenticate, authorizeAdmin, markOrderAsDelivered)

export default router;