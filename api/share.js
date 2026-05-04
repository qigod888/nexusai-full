export default async function handler(req, res) {
  if (req.method === 'POST') {
    const id = 'chat_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    // TODO: Save to DB (Supabase / Vercel KV)
    return res.status(200).json({ 
      id,
      url: `/shared/${id}`,
      note: 'Connect DB for persistence'
    });
  }
  
  if (req.method === 'GET') {
    const { id } = req.query;
    // TODO: Load from DB
    return res.status(200).json({ ok: true, note: 'Share handler stub' });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
