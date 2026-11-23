# Rastreamento QH4, LP Marcheli

Slots comentados e idênticos em index.html, obrigado.html e 404.html (procure por `[QH4 SLOT`):

| Slot | Onde | O que colar |
|---|---|---|
| 1 | `<head>` | GTM (script) |
| 2 | `<head>` | Metatags de verificação de domínio |
| 3 | `<head>` | Meta Pixel direto (só sem GTM) |
| 4 | `<head>` | gtag Google Ads / GA4 direto (só sem GTM) |
| 5 | após `<body>` | GTM noscript |
| 6 | antes de `</body>` | Scripts de terceiros (Clarity, Hotjar, chat) |
| 7 | `assets/js/tracking.js` | WhatsApp, webhook, rótulos de conversão |
| 8 | obrigado.html | Conversão da página de obrigado |

## Eventos
- `whatsapp_click` (`wa_local`: header, hero, galeria, arquitetos, final, footer, flutuante)
- `form_start` (primeiro campo preenchido)
- `generate_lead` (envio válido; também dispara fbq Lead e conversão gtag se configurados)
- `thank_you_view` (obrigado.html)

## IVO
`<script src="https://app-validacao-lp-sapp-validacao-lp.vercel.app/api/t" data-lp="lp-marcheli" defer></script>` em index e obrigado.
