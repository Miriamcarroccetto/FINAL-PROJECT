import express from "express";
import 'dotenv/config';
import User from "../models/userSchema.js"

const router = express.Router()

// GET USERS

router.get('/', async (req,res,next)=> {

    try {
        const users = await User.find()
        res.status(200).json(users)

    } catch(err) {
        next(err)
    }
})

// GET WITH ID

router.get('/:id', async (req,res,next)=> {
    
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({ error: 'Utente non trovato'})
            res.status(200).json(user)

    } catch(err) {
        next(err)
    }
})

// POST

router.post('/', async(req,res,next)=> {
  const { name, lastname, email, birthday, password, isAdmin} = req.body

  try {
    const newUser = new User ({
        name,
        lastname,
        email,
        birthday,
        password,
        isAdmin
    })

    await newUser.save()
    res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
})

// PUT

router.put('/:id', async(req,res,next)=> {

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!user) return res.status(404).json({ error: 'Utente non trovato'})

        res.status(200).json(user)

    } catch(err) {
        next(err)
    }
})

//DELETE

router.delete('/:id', async (req,res,next)=> {

    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) return res.status(404).json({ error: 'Utente non trovato'})
        
        res.status(200).json({ message: 'Utente eliminato con successo'})

    } catch (err) {
        next(err)
    }
})

export default router