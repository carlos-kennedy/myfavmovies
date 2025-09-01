import axios from "axios";
export default async function handler(req, res) {
  const { name, year } = req.query;
  if (!name) {
    return res.status(400).json({ error: "O parâmetro 'name' é obrigatório" });
  }
  try {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: process.env.API_KEY,
        t: name,
        y: year,
      },
      validateStatus: () => true, // para tratar manualmente status HTTP
    });
    // Se a resposta não for JSON válido, axios já lança erro, mas vamos garantir:
    if (typeof response.data !== "object") {
      return res.status(502).json({ error: "Resposta inválida da API OMDB" });
    }
    // Verifica se a API OMDB retornou erro
    if (response.data.Response === "False") {
      return res
        .status(404)
        .json({ error: response.data.Error || "Filme não encontrado" });
    }
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Erro na requisição OMDB:", error.message);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
}
