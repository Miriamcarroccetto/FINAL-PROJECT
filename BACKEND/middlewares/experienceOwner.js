import Experience from "../models/experienceSchema";


const experienceOwner = async (req, res, next) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) return res.status(404).json({ error: 'Esperienza non trovata' });

  if (experience.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: 'Non autorizzato' });
  }

  next();
};

export default experienceOwner
