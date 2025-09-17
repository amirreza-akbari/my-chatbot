export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const HF_TOKEN = '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';
  const MODEL = 'tiiuae/falcon-7b-instruct';

  try {
    const userInput = req.body.message;

    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: userInput })
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'ارتباط برقرار نشد ⚠️' });
    }

    const result = await response.json();
    const answer = result[0]?.generated_text || 'پاسخی دریافت نشد 😢';

    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: 'خطا در اتصال به مدل' });
  }
}
