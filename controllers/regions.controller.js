const Region = require("../models/region.js");

async function getAllRegions(req, res) {
  try {
    const regions = await Region.findAll();
    res.json(regions);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getRegionById(req, res) {
  try {
    const region = await Region.findByPk(parseInt(req.params.regionId));
    res.json(region);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function createRegion(req, res) {
  try {
    if (req.user.role !== "admin") {
      throw 'Unauthorized';
    } 

    const region = await Region.create(req.body);
    res.json(region);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function updateRegion(req, res) {
  try {
    if (req.user.role !== "admin") {
      throw 'Unauthorized';
    } 

    const updatedRegion = await Region.update(
      req.body,
      {
        where: {
          id: parseInt(req.params.regionId),
        },
      }
    );
    res.json(updatedRegion);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function deleteRegion(req, res) {
  try {
    if (req.user.role !== "admin") {
      throw 'Unauthorized';
    } 

    const region = await Region.destroy({
      where: {
        id: parseInt(req.params.regionId),
      },
    });
    res.json(region);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getAllRegions,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion,
};
