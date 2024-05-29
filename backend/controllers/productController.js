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

export { 
    addProduct,
    updateProductDetails,
    deleteProduct,
    getProducts,
    fetchProductById,
    getAllProducts,
    addProductReview,
};