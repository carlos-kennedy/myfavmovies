const axios = require("axios");

module.exports = async function handler(req, res) {
  const { name, year } = req.query;

  try {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: process.env.API_KEY,
        t: name,
        y: year,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
};
