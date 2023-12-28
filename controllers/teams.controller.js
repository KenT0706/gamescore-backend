const Team = require("../models/team");

async function getAllTeams(req, res) {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getTeamById(req, res) {
  try {
    const team = await Team.findByPk(parseInt(req.params.teamId));
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function createTeam(req, res) {
  try {
    if (req.user.role !== "admin") {
      throw 'Unauthorized';
    } 

    const team = await Team.create(req.body);
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function updateTeam(req, res) {
  try {
    if (req.user.role !== "admin") {
      throw 'Unauthorized';
    } 

    const updatedTeam = await Team.update(
      req.body,
      {
        where: {
          id: parseInt(req.params.teamId),
        },
      }
    );
    res.json(updatedTeam);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function deleteTeam(req, res) {
  try {
    if (req.user.role !== "admin") {
      throw 'Unauthorized';
    } 

    const team = await Team.destroy({
      where: {
        id: parseInt(req.params.teamId),
      },
   
    });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
