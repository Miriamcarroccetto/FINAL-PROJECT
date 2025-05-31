import express from "express";
import 'dotenv/config';
import Experience from "../models/experienceSchema.js"
import authMiddleware from '../middlewares/authMiddleware.js';
import requireAdmin from '../middlewares/requireAdmin.js';
import experienceOwner from "../middlewares/experienceOwner.js";
import multer from 'multer'
import { storageCloud } from "../config/cloudinary.js"

const upload = multer({ storageCloud })


const router = express.Router()



// POST 

router.post ('/',[authMiddleware,  requireAdmin, upload.single('image')], async (req,res,next) => {

    const {title, category, description, city, price, duration, date, image} = req.body

    try {
        const imageUrl = req.file ? req.file.path : null
        const newExperience = new Experience({
            user: req.user._id,
            title,
            category,
            description,
            city,
            price,
            duration,
            date,
            image: imageUrl,
        })
    await newExperience.save()
    res.status(201).json(newExperience)

    } catch(err) {
        next(err)
    }
})

// PUT

router.put('/:id', [authMiddleware, requireAdmin, experienceOwner, upload.single('image')], async (req, res, next) => {
  try {

    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: 'Esperienza non trovata' });
    }

    const { title, category, description, city, price, duration, date } = req.body;

   
    if (title) experience.title = title;
    if (category) experience.category = category;
    if (description) experience.description = description;
    if (city) experience.city = city;
    if (price) experience.price = price;
    if (date) experience.date = date;

    
    if (duration) {
      experience.duration = typeof duration === 'string' ? JSON.parse(duration) : duration;
    }

  
    if (req.file) {
      experience.image = req.file.path;
    }

    const updatedExperience = await experience.save();
    res.status(200).json(updatedExperience);

  } catch (err) {
    next(err);
  }
});


// DELETE

router.delete('/:id', [authMiddleware,  requireAdmin, experienceOwner], async(req,res,next)=> {
    
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id)
    if(!experience) return res.status(404).json({error: 'Esperienza non trovata'})
        res.status(200).json({ message: 'Esperienza eliminata con successo'})

    } catch (err) {
        next(err)
    }
})




export default router