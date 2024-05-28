import express from "express";
const router = express.Router();
import { createCategory, 
        updateCategory, 
        deleteCategory,
        listCategory,
        readCategory } from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorizeAdmin ,createCategory);
router.route('/categories').get(listCategory)
router.route("/:categoryId")
    .get(readCategory)
    .put(authenticate, authorizeAdmin, updateCategory)
    .delete(authenticate, authorizeAdmin, deleteCategory);

export default router;