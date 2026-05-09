// api/search.js
import bookData from '../public/book.json';

// Косинусное сходство для двух массивов чисел
function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] ** 2;
    nb += b[i] ** 2;
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { queryEmbedding, topK = 4 } = req.body || {};
    if (!queryEmbedding || !Array.isArray(queryEmbedding)) {
      res.status(400).json({ error: 'queryEmbedding is required' });
      return;
    }

    // считаем similarity для каждого чанка
    const scored = bookData.map(item => ({
      text: item.text,
      score: cosineSim(queryEmbedding, item.emb)
    }));

    // сортируем по убыванию и берём topK
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, topK);

    const context = top.map((s, idx) =>
      `Фрагмент ${idx + 1}:\n${s.text}`
    ).join('\n\n---\n\n');

    res.status(200).json({ context });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'search_failed', message: e.message });
  }
}
