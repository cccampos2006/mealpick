module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { tempo, pessoas, ingredientes, restricoes } = req.body;

  const restricoesTexto = restricoes.length > 0
    ? `As receitas devem ser ${restricoes.join(', ')}.`
    : 'Sem restrições alimentares específicas.';

  const prompt = `Sugere exactamente 3 receitas de cozinha para as seguintes condições:
- Tempo máximo de preparação: ${tempo} minutos
- Número de pessoas: ${pessoas}
- Máximo de ingredientes: ${ingredientes} (NÃO contes sal, pimenta, azeite ou água)
- ${restricoesTexto}

Responde APENAS com um array JSON válido, sem texto adicional, sem markdown, sem backticks.
Cada receita deve ter exactamente esta estrutura:
{
  "nome": "Nome da receita",
  "emoji": "1 emoji representativo",
  "tempo": "X min",
  "nivelCusto": 1,
  "calorias": "XXX kcal",
  "ingredientes": ["ingrediente 1 com quantidade", "ingrediente 2 com quantidade"],
  "passos": ["Passo 1 detalhado", "Passo 2 detalhado"],
  "tags": ["tag1", "tag2"]
}

Regras: NÃO incluas sal, pimenta, azeite ou água nos ingredientes. Receitas realistas e portuguesas. nivelCusto deve ser 1 (barato), 2 (médio) ou 3 (caro).`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 4096 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const details = await geminiRes.text();
      return res.status(geminiRes.status).json({ error: `Gemini error ${geminiRes.status}`, details });
    }

    const data = await geminiRes.json();
    const text = data.candidates[0].content.parts[0].text;
    const recipes = JSON.parse(text.replace(/```json|```/g, '').trim());

    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
