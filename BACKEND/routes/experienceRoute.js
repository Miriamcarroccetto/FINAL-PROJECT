import express from "express";
import 'dotenv/config';
import Experience from "../models/experienceSchema.js"


const router = express.Router()

// GET TOTAL EXPERIENCES

router.get('/', async (req, res, next)=> {

    try {
        const experiences = await Experience.find()
        res.status(200).json(experiences)
    } catch (err) {
        next(err)
    }
})

// GET WITH ID

router.get('/:id', async (req,res,next)=> {

    try {
        const experience = await Experience.findById(req.params.id)
        if(!experience) return res.status(404).json({error:'Esperienza non trovata'})
            res.status(200).json(experience)
    } catch (err) {
        next(err)
    }
})

export default router
