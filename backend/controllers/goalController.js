const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@desc Get Goals
//@route Get /api/goals
//@access Private
const getGoals = asyncHandler(
    async(req,res)=>{
        const goals = await Goal.find({ user: req.user.id })

        res.status(200).json(goals)
    }
)

//@desc Set Goal
//@route Post /api/goals
//@access Private
const setGoal = asyncHandler(

    async(req,res)=>{
        if(!req.body.text){
            res.status(400)
            throw new Error('Please Add a text field')
        }

        const goal = await Goal.create({
             text: req.body.text,
             user: req.user.id
        })

        res.status(200).json(goal) 
    }
)

//@desc Update Goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async(req,res)=>{
    const goal = await Goal.findByIdAndUpdate(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal Not Found')
    }

    
   
    //check for user
   if(!req.user){
      res.status(401)
      throw new Error('User Not Found')
   }
   
   //logged in user is goal user
   if(goal.user.toString() !== req.user.id){
     res.status(401)
     throw new Error('User Not authorised')
   }
 
     const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new : true,})
    
    res.status(200).json('updatedGoal')
})

//@desc Delete Goal
//@route Delete /api/goals/:id
//@access Private
const deleteGoal = asyncHandler( async(req,res)=>{
    const goal = await Goal.findByIdAndUpdate(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal Not Found')
    }
    
   
   
    //check for user
   if(!req.user){
      res.status(401)
      throw new Error('User Not Found')
   }
   
   //logged in user is goal user
   if(goal.user.toString() !== req.user.id){
     res.status(401)
     throw new Error('User Not authorised')
   }

    await goal.deleteOne() 

    res.status(200).json({ id : req.params.id })
})


module.exports={
    getGoals,setGoal,updateGoal,deleteGoal
}