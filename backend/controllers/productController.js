import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, price, description, category, quantity, brand } = req.fields;
        switch (true){
            case !name:
                return res.json({error: "Name is required."});
            case !price:
                return res.json({error: "Price is required."});
            case !description:
                return res.json({error: "Description is required."});
            case !category:
                return res.json({error: "Category is required."});
            case !quantity:
                return res.json({error: "Quantity is required."});
            case !brand:
                return res.json({error: "Brand is required."});
        }

        const product = new Product({...req.fields});
        await product.save();
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
})

const updateProductDetails = asyncHandler(async(req,res) => {
    try {
        const { name, price, description, category, quantity, brand } = req.fields;
        //add image later
        switch (true){
            case !name:
                return res.json({error: "Name is required."});
            case !price:
                return res.json({error: "Price is required."});
            case !description:
                return res.json({error: "Description is required."});
            case !category:
                return res.json({error: "Category is required."});
            case !quantity:
                return res.json({error: "Quantity is required."});
            case !brand:
                return res.json({error: "Brand is required."});
        }

        const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new: true});
        await product.save();
        if (!product) return res.status(404).json({error: "Product not found."});
        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
})

const deleteProduct = asyncHandler(async(req,res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error."});
    }
})

const getProducts = asyncHandler(async(req,res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i" //case-insensitive
            }
        } : {};

        const count = await Product.countDocuments({...keyword});
        const products = await Product.find({...keyword}).limit(pageSize);

        res.json({
            products, 
            page: 1, 
            pages: Math.ceil(count / pageSize), 
            hasMore: false,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
})

const fetchProductById = asyncHandler(async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product){
            res.status(404);
            throw new Error("Product not found.");
        } else {
            res.json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
})

const getAllProducts = asyncHandler(async(req,res) => {
    try {
        const products = await Product.find({}).populate("category").limit(12).sort({createAt: -1});
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error."});
    }
})

const addProductReview = asyncHandler(async(req,res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product){
            res.status(404);
            throw new Error("Product not found.");
        } else{
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
            if(alreadyReviewed){
                res.status(400);
                throw new Error("Product already reviewed.");
            } else {
                const review = {
                    name: req.user.username,
                    rating: Number(rating),
                    comment,
                    user: req.user._id,
                };
                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
                await product.save();
                res.status(201).json({message: "Review added."});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
})

const getTopProducts = asyncHandler(async(req,res) => {
    try {
        const products = await Product.find({}).sort({rating: -1}).limit(4);
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
})

const getNewProducts = asyncHandler(async(req,res) => {
    try {
        const newProducts = await Product.find({}).sort({_id: -1}).limit(4);
        res.json(newProducts);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
})

export { 
    addProduct,
    updateProductDetails,
    deleteProduct,
    getProducts,
    fetchProductById,
    getAllProducts,
    addProductReview,
    getTopProducts,
    getNewProducts,
};