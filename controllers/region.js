const Region = require('../models/Region');

//Description: Get all Regions
//route:       GET /api/v1/Regions
//access:      Public
exports.getRegions = async (req, res, next) => {
  try {
    const regions = await Region.find({});
    res
      .status(200)
      .json({ success: true, data: regions })
      .populate({ path: 'touristsites' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Description: Get single Region
//route:       GET /api/v1/Regions/:id
//access:      Public
exports.getRegion = async (req, res, next) => {
  try {
    const region = await Region.findById(req.params.id).populate({
      path: 'touristsites',
    });
    if (!region) {
      return res.status(404).json({ error: 'Tourist region not found' });
    }
    res.status(200).json({ success: true, data: region });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Description: Create Region
//route:       POST /api/v1/Regions/:id
//access:      Private
exports.createRegion = async (req, res, next) => {
  try {
    const region = await Region.create(req.body);
    res.status(200).json({ success: true, data: region });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Description: Update Region
//route:       PUT /api/v1/Regions/:id
//access:      Private
exports.updateRegion = async (req, res, next) => {
  console.log(req.body);
  try {
    let region = await Region.findById(req.params.id);
    if (!region) {
      return res.status(404).json({ error: 'Tourist region not found' });
    }
    region = await Region.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: region });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Description: Delete Region
//route:       DELETE /api/v1/Regions/:id
//access:      Private
exports.deleteRegion = async (req, res, next) => {
  try {
    let region = await Region.findById(req.params.id);
    if (!region) {
      return res.status(404).json({ error: 'Tourist region not found' });
    }
    region = await Region.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: true, data: region });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
