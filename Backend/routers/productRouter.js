import express from "express";
import { data } from '../data.js'
import  expressAsyncHandler from 'express-async-handler'
import Product from "../models/productModel.js";
import { isAuth , isAdmin } from '../utils.js'

const productRouter = express.Router()

productRouter.get('/', expressAsyncHandler( async (req,res) => {
    const products = await Product.find({});
    res.send(products)
}
))

productRouter.get('/seed', expressAsyncHandler(  async (req,res) => {
    const createdProducts = await Product.insertMany(data)
    res.send({ createdProducts });
}) )

productRouter.get('/:id' , expressAsyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send({ message: 'Mangoes not found' })
    }
} ) )

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler( async (req,res) => {
    const product = new Product({
        name: 'New name' + Date.now(),
        image: 'https://freesvg.org/img/manggo.png',
        cost: 0,
        category: 'Category',
        type: 'Type',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'Description',
        instock: false
    })

    const createdProduct = await product.save()

    res.send({ message: 'Product created', product: createdProduct })

} ) )

productRouter.put('/:id', isAuth , isAdmin, expressAsyncHandler( async (req,res) => {
    const productId = req.params.id
    const product = await Product.findById(productId)

    if(product){
        product.cost = req.body.cost
        product.name = req.body.name
        product.image = req.body.image
        product.category = req.body.category
        product.type = req.body.type
        product.countInStock = req.body.countInStock
        product.description = req.body.description
        product.instock = req.body.instock

        const updatedProduct = await product.save()
        res.send( { message: 'Product Updated', product: updatedProduct } )
        
    }
    else{
        res.status(404).send({ message: 'Product not found' })
    }
} ))

productRouter.delete('/:id', isAuth ,isAdmin , expressAsyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        const deletedProduct = await product.remove()
        res.send( { message: 'Product deleted', product: deletedProduct } )
    }
    else{
        res.status(404).send({ message: 'Product not found' })
    }
} ) )

export default productRouter
