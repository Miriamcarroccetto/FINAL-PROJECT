import express from "express";
import 'dotenv/config';
import Experience from "../models/experienceSchema.js"
import authMiddleware from '../middlewares/authMiddleware.js';
import requireAdmin from '../middlewares/requireAdmin.js'

const router = express.Router()

// GET TOTAL EXPERIENCES

router.get('/', async (req, res, next)=> {

    try {
        const experiences = await Experience.find()
        res.send(experiences)
    } catch (err) {
        next(err)
    }
})

// GET WITH ID

router.get('/:id', async (req,res,next)=> {

    try {
        const experience = await Experience.findById(req.params.id)
        if(!experience) return res.status(404).json({error:'Esperienza non trovata'})
            res.send(experience)
    } catch (err) {
        next(err)
    }
})

// POST 

router.post ('/',authMiddleware,  requireAdmin, async (req,res,next) => {

    const {title, category, description, city, price, duration, date} = req.body

    try {
        const newExperience = new Experience({
            adminId: req.user._id,
            title,
            category,
            description,
            city,
            price,
            duration,
            date
        })
    await newExperience.save()
    res.status(201).json(newExperience)

    } catch(err) {
        next(err)
    }
})

// PUT

router.put('/:id',authMiddleware,  requireAdmin, async(req,res,next)=> {

    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        })
    if(!experience) {
        return res.status(404).json({error: 'Esperienza non trovata'})
    }
    res.status(200).json(experience)

    } catch(err) {
        next(err)
    }
})

// DELETE

router.delete('/:id', authMiddleware,  requireAdmin, async(req,res,next)=> {
    
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id)
    if(!experience) return res.status(404).json({error: 'Esperienza non trovata'})
        res.status(200).json({ message: 'Esperienza eliminata con successo'})

    } catch (err) {
        next(err)
    }
})

export default router
