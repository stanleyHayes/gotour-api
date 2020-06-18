const Touristsite = require('../models/Touristsite');

//Description: Get all Touristsites
//route:       GET /api/v1/Touristsites
//access:      Public
exports.getTouristsites = async (req, res, next) => {
  try {
    const sites = await Touristsite.find({});
    res.status(200).json({ success: true, data: sites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Description: Get single Touristsite
//route:       GET /api/v1/Touristsites/:id
//access:      Public
exports.getTouristsite = async (req, res, next) => {
  try {
    const site = await Touristsite.findById(req.params.id);
    if (!site) {
      return res.status(404).json({ error: 'Tourist site not found' });
    }
    res.status(200).json({ success: true, data: site });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Description: Create Touristsite
//route:       POST /api/v1/Touristsites/:id
//access:      Private
exports.createTouristsite = async (req, res, next) => {
  try {
    const site = await Touristsite.create(req.body);
    res.status(200).json({ success: true, data: site });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Description: Update Touristsite
//route:       PUT /api/v1/Touristsites/:id
//access:      Private
exports.updateTouristsite = async (req, res, next) => {
  console.log(req.body);
  try {
    let site = await Touristsite.findById(req.params.id);
    if (!site) {
      return res.status(404).json({ error: 'Tourist site not found' });
    }
    site = await Touristsite.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: site });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Description: Delete Touristsite
//route:       DELETE /api/v1/Touristsites/:id
//access:      Private
exports.deleteTouristsite = async (req, res, next) => {
  try {
    let site = await Touristsite.findById(req.params.id);
    if (!site) {
      return res.status(404).json({ error: 'Tourist site not found' });
    }
    site = await Touristsite.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: true, data: site });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
