const express = require('express')
const router = express.Router()
const Person = require('../models/person')



// post route to add a person
router.post('/', async (req,res)=>{
    try{
        const data = req.body  // getting the data from body parser 

        // creating a person model
        const newPerson = new Person(data)

        // save the new person to database
        const response = await newPerson.save()
        console.log('save data')
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})



// get route to fetch the data
router.get('/', async (req,res)=>{
    try {
        const data = await Person.find()
        console.log('Data fetched')
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// fetch data from  worktype
router.get('/:workType', async(req,res)=>{
    try {
        const workType = req.params.workType
        if(workType == 'chef' || workType == 'waiter'|| workType == 'manager'){
            const response = await Person.find({work:workType})
            console.log('response fetched')
            res.status(200).json(response)
        }else{
            res.status(404).json({error: "Not Found"})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
})



// put method for update the person data from the mongodb data base
router.put('/:id', async(req,res)=>{
    try {
        const personId = req.params.id
        const updatedPersonData = req.body

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData)
        if(!response){
            return res.status(404).json({error: "Person Not Found"})
        }
        console.log('Data updated')
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})


// delete method to delete the data from the database
router.delete('/:id', async(req,res)=>{
    try {
        const personId = req.params.id
        const response = await Person.findOneAndDelete(personId)
        if(!response){
            return res.status(404).json({error: "Person Not Found"})
        }
        console.log("Data Deleted")
        res.status(200).json({message: "Data deleted successfully"})

    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }   

})




module.exports = router