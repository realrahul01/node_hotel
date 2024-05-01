const express = require('express')
const router = express.Router()
const menuItem = require('../models/menu')

// for practice menu item for post method
router.post('/', async (req,res)=>{
    try {
        const data = req.body
        const createMenu = new menuItem(data)
        console.log(createMenu)
        const response = await createMenu.save() 
        console.log('save data')
        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
})


// for get the data get method
router.get('/', async (req,res)=>{
    try {
        const data = await menuItem.find()
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})


// fetch data based on taste
router.get('/:tasteType', async(req,res)=>{
    try {
        const tasteType = req.params.tasteType
    if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy'){
        const response = await menuItem.find({taste: tasteType})
        res.status(200).json(response)
    }else{
        res.status(404).json({error: 'Not Found'})
    }
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// this is the route to update the menu item put method
router.put('/:id', async (req,res)=>{
    try {
        const menuId = req.params.id
        const menuUpdate = req.body
        const response = await menuItem.findByIdAndUpdate(menuId,menuUpdate)
        if(!response){
            res.status(404).json({error: "Menu Not Found"})
        }
        res.status(200).json(response)    
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
})


// this is the route to delete the menu item delete method
router.delete('/:id', async (req,res)=>{
    try {
        const menuId = req.params.id
        const response = await menuItem.findOneAndDelete(menuId)
        console.log('Data Delete')
        res.status(200).json({error: "Menu data delete successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router