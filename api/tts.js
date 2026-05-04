export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const ELEVEN_KEY = process.env.ELEVENLABS_API_KEY;
  if (!ELEVEN_KEY) {
    return res.status(200).json({ 
      ok: false,
      note: 'Add ELEVENLABS_API_KEY to ENV for production TTS'
    });
  }
  
  // TODO: Real ElevenLabs API integration
  return res.status(200).json({ ok: true, note: 'TTS stub' });
}
