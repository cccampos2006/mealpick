const DISH_TYPE_EMOJI = {
  soup: '🍲', salad: '🥗', breakfast: '🍳', dessert: '🍮',
  'main course': '🍽️', lunch: '🥙', dinner: '🍖',
  pasta: '🍝', pizza: '🍕', sandwich: '🥪', appetizer: '🥐',
};

function dishTypeToEmoji(dishTypes) {
  if (!dishTypes?.length) return '🍽️';
  return DISH_TYPE_EMOJI[dishTypes[0]] || '🍽️';
}

const FILLER_WORDS = new Set([
  'classic', 'creamy', 'spicy', 'easy', 'simple', 'homemade', 'best',
  'quick', 'slow', 'baked', 'fresh',
  'healthy', 'crispy', 'one', 'pot', 'pan',
]);

function extractKeyword(title) {
  const words = title.toLowerCase().split(/\s+/);
  const meaningful = words.filter(w => !FILLER_WORDS.has(w));
  return (meaningful.length > 0 ? meaningful : words).slice(0, 3).join(' ');
}

async function fetchPexelsImage(keyword) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return null;
  const params = new URLSearchParams({
    query: keyword + ' food',
    per_page: '1',
    orientation: 'portrait',
  });
  const res = await fetch(`https://api.pexels.com/v1/search?${params}`, {
    headers: { Authorization: key },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const photo = data.photos?.[0];
  if (!photo) return null;
  return {
    imagem: photo.src.large,
    pexelsPhotographer: photo.photographer,
    pexelsUrl: photo.url,
  };
}

function mapSpoonacularRecipe(result) {
  const pricePerServing = result.pricePerServing || 0;
  const nivelCusto = pricePerServing < 300 ? 1 : pricePerServing < 700 ? 2 : 3;

  const calorieEntry = result.nutrition?.nutrients?.find(n => n.name === 'Calories');
  const calorias = calorieEntry ? `${Math.round(calorieEntry.amount)} kcal` : '-- kcal';

  const ingredientes = (result.extendedIngredients || []).map(i =>
    `${i.amount ? i.amount + ' ' : ''}${i.unit ? i.unit + ' ' : ''}${i.name}`.trim()
  );

  const passos = result.analyzedInstructions?.[0]?.steps?.map(s => s.step) || [];

  return {
    nome: result.title,
    emoji: dishTypeToEmoji(result.dishTypes),
    imagem: result.image || null,
    tempo: `${result.readyInMinutes} min`,
    nivelCusto,
    calorias,
    ingredientes,
    passos,
    tags: result.diets || [],
    isAI: false,
  };
}

function buildSpoonacularUrl(tempo, ingredientes, restricoes) {
  const dietMap = { 'vegetariano': 'vegetarian', 'vegano': 'vegan' };
  const intoleranceMap = { 'sem lactose': 'dairy', 'sem glúten': 'gluten' };

  const diets = restricoes.filter(r => dietMap[r]).map(r => dietMap[r]);
  const diet = diets.includes('vegan') ? 'vegan' : (diets.includes('vegetarian') ? 'vegetarian' : '');
  const intolerances = restricoes.filter(r => intoleranceMap[r]).map(r => intoleranceMap[r]).join(',');

  const params = new URLSearchParams({
    apiKey: process.env.SPOONACULAR_API_KEY,
    maxReadyTime: tempo,
    maxIngredients: ingredientes,
    number: '3',
    sort: 'random',
    type: 'main course',
    addRecipeInformation: 'true',
    addRecipeNutrition: 'true',
    instructionsRequired: 'true',
    fillIngredients: 'true',
  });
  if (diet) params.set('diet', diet);
  if (intolerances) params.set('intolerances', intolerances);

  return `https://api.spoonacular.com/recipes/complexSearch?${params}`;
}

async function fetchSpoonacular(tempo, ingredientes, restricoes) {
  const url = buildSpoonacularUrl(tempo, ingredientes, restricoes);
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  const recipes = (data.results || []).map(mapSpoonacularRecipe);
  const enhanced = await Promise.all(recipes.map(async (recipe) => {
    const pexels = await fetchPexelsImage(extractKeyword(recipe.nome));
    return pexels ? { ...recipe, ...pexels } : recipe;
  }));
  return enhanced;
}

async function fetchGemini(needed, tempo, ingredientes, restricoes) {
  const restricoesTexto = restricoes.length > 0
    ? `As receitas devem ser ${restricoes.join(', ')}.`
    : 'Sem restrições alimentares específicas.';

  const prompt = `Sugere exactamente ${needed} receitas de refeições principais (almoço ou jantar) para as seguintes condições. NÃO incluas pequeno-almoços, sobremesas, aperitivos, bebidas nem acompanhamentos.
- Tempo máximo de preparação: ${tempo} minutos
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

  if (!geminiRes.ok) throw new Error(`Gemini error ${geminiRes.status}`);

  const data = await geminiRes.json();
  const text = data.candidates[0].content.parts[0].text;
  const recipes = JSON.parse(text.replace(/```json|```/g, '').trim());
  return recipes.map(r => ({ ...r, isAI: true }));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { tempo, ingredientes, restricoes } = req.body;

  try {
    let spoonacularRecipes = [];
    try {
      spoonacularRecipes = await fetchSpoonacular(tempo, ingredientes || '10', restricoes);
    } catch (_) {
      // Spoonacular failure → fall through to Gemini for all 3
    }

    const needed = 3 - spoonacularRecipes.length;
    let geminiRecipes = [];
    if (needed > 0) {
      geminiRecipes = await fetchGemini(needed, tempo, ingredientes || '10', restricoes);
    }

    return res.status(200).json([...spoonacularRecipes, ...geminiRecipes]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
