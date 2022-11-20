const express = require("express");
const router = express.Router();

const axios = require("axios");

router.get("/comics", async (req, res) => {
  try {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 100;
    const title = req.query.title || "";
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&title=${title}`
    );
    const comics = response.data;
    res.status(200).json(comics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/characters", async (req, res) => {
  try {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 100;
    const name = req.query.name || "";
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&name{name}`
    );
    const characters = response.data;
    res.status(200).json(characters);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    const comicsContainingCharacter = response.data;
    res.status(200).json(comicsContainingCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    const infosOfCharacter = response.data;
    res.status(200).json(infosOfCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
