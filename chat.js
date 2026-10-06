export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message) return res.status(400).json({ error: 'Geen vraag ontvangen.' });
  if (message.length > 1200) return res.status(400).json({ error: 'Je bericht is te lang.' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'De assistent is nog niet geconfigureerd. Je kunt ons wel mailen via lesloyzakelijk@gmail.com.' });
  }

  const system = `Je bent de vriendelijke digitale assistent van Lesloy Visuals, een fotografiebedrijf van Lesley Samuels in Nederland. Antwoord in het Nederlands, kort, menselijk en behulpzaam. Gebruik alleen onderstaande bekende informatie en verzin geen prijzen, beschikbaarheid, reviews, portfolio-informatie of afspraken.

BEDRIJF
- Naam: Lesloy Visuals
- Fotograaf: Lesley Samuels
- Instagram: @lesley.0492
- E-mail: lesloyzakelijk@gmail.com
- Website: https://lesloyvisuals.nl

DIENSTEN EN PRIJZEN
- Portrait: Mini €35, Standard €50, Premium €75
- Automotive: Basic €50, Premium €75, extra auto +€25
- Events: 2 uur €100, 4 uur €175, 8 uur €300
- Custom/Creative vanaf €50
- Weddings: prijs op maat
- Launch Offer: €50, ongeveer 60 minuten, 15 bewerkte foto's, beperkt beschikbaar

DUO
- Lesloy Visuals werkt samen met fotograaf Jayden van Smit Works.
- Lesley en Jayden zijn afzonderlijk te boeken, maar ook samen als fotografieduo.
- Duo voor shoots, events, automotive en creatieve producties.
- Instagram Smit Works: @smit_works
- Voor een duo-aanvraag: stuur via de contactpagina of mail naar lesloyzakelijk@gmail.com.

REGELS
- Als iemand wil boeken: verwijs naar https://lesloyvisuals.nl/contact
- Als iemand vraagt naar duo: leg kort uit dat Lesley + Jayden samen te boeken zijn.
- Als informatie ontbreekt: zeg dat eerlijk en verwijs naar contact/e-mail.
- Geef geen juridisch, medisch of financieel advies.
- Doe niet alsof je Lesley of Jayden bent; je bent de website-assistent.`;

  try {
    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: [
          { role: 'system', content: [{ type: 'input_text', text: system }] },
          { role: 'user', content: [{ type: 'input_text', text: message }] }
        ],
        max_output_tokens: 350
      })
    });

    const data = await r.json();
    if (!r.ok) {
      console.error('OpenAI error', data);
      return res.status(502).json({ error: 'De assistent kan nu even niet antwoorden. Probeer het straks opnieuw.' });
    }

    const text = data.output_text || (data.output || []).flatMap(item => item.content || []).map(c => c.text || '').filter(Boolean).join('\n');
    if (!text) return res.status(502).json({ error: 'Ik kon geen antwoord ophalen. Probeer het opnieuw.' });
    return res.status(200).json({ answer: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Er ging iets mis. Mail ons gerust via lesloyzakelijk@gmail.com.' });
  }
}
