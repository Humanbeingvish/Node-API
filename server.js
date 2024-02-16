const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product=require('./models/productModel')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes

app.get('/',(req,res)=>{
    res.send('Hello Node api')
})

app.get('/products',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/product',async(req,res)=>{
    try {
        const product =await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

//update the product 

app.put('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const product =await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:`Cannot find any product with id ${id} `})
        }
        const updatedProduct =await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//Delete the product 
app.delete('/products/:id',async(req,res)=>{
    try {
        const{id} =req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Connot find any product with Id ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//Connection to the MongoDB

mongoose.
connect('mongodb+srv://admin:admin@cluster0.n0kqbhm.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000,()=>{
        console.log('Node API app is running on port 3000');
    })
    console.log('Connected to MongoDB');
})
.catch((error)=>{
    console.log(error);
})