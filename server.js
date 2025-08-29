require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public")); // coloque seus arquivos estáticos aqui

app.get("/api/movies", async (req, res) => {
  const { name, year } = req.query;
  try {
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: process.env.API_KEY,
        t: name,
        y: year,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
