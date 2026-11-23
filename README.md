# LP Marcheli Marmoraria e Móveis Planejados (Grupo Marcheli)

Landing page no padrão QH4. Cliente: Marcheli, Maringá e Sarandi (PR). Produto: Método Stones High Ticket.
HTML, CSS e JS puros, pronta para a Vercel (plano gratuito) ou Hostinger.

## Estrutura
```
index.html          LP principal
obrigado.html       Página de obrigado (abre o WhatsApp sozinha, só usada no modo webhook)
404.html            Erro 404 personalizado
robots.txt  sitemap.xml  site.webmanifest  vercel.json
assets/css/style.css
assets/js/tracking.js   (SLOT 7: WhatsApp, webhook, rótulos de conversão)
assets/js/main.js
assets/img/             imagens reais (jpg otimizado) + logo + ícones + og-image
TRACKING-QH4.md         guia dos slots e eventos
```

## Como publicar na Vercel
1. Vercel > Add New > Project > subir a pasta (ou arrastar o zip descompactado). Framework: Other, sem build.
2. Apontar o domínio e conferir o canonical (ver pendências).

## Pendências antes de publicar
- [ ] GTM / Pixel / Google Ads: colar nos slots comentados `[QH4 SLOT n]` (index, obrigado, 404).
- [ ] Domínio: o canonical, o sitemap, o robots e o og:url usam `https://marmorariamarcheli.com.br/`. Se a LP for para outro domínio ou subdomínio, trocar nesses arquivos.
- [ ] WhatsApp: já configurado para 44 99768-3366 (5544997683366) em `assets/js/tracking.js`.
- [ ] Webhook (Google Apps Script): `webhook` está vazio. Vazio = o formulário monta a mensagem completa e manda direto pro WhatsApp. Preenchido = envia pro Apps Script, abre a obrigado e redireciona pro WhatsApp com "Olá, acabei de preencher o formulário no site. Aguardo mais informações."
- [ ] Rodapé: link "QH4 Growth" aponta para https://www.instagram.com/qh4growth/ (conferir o @ da agência).
- [x] Logo: usado sem fundo (PNG transparente) e sem a linha "Móveis Tubulares". O descritor do briefing ("Móveis Planejados e Marmoraria") aparece em texto.
- [ ] Endereço físico não consta no briefing, então não foi incluído. Também não há depoimentos nem avaliações do GMN no material (só o link), portanto a LP não os exibe.
- [ ] Verificar o script do IVO (data-lp="lp-marcheli") no painel do validador.

## Fonte do conteúdo
Briefing + Site (Google Formulários, respondido pelo Everton Ribeiro), dados do contrato e resumo de atuação do cliente. Nada foi inventado: sem preços, sem promoções, sem showroom, sem garantias, sem depoimentos. Só imagens reais da Marcheli (nenhuma de banco ou IA).
Uso de dados do briefing: "mais de 33 anos de mercado", "cerca de 70% das vendas por indicação de arquitetos", horário seg a sex 8h às 18h, materiais (granitos, mármores, quartzitos, quartzo, lâminas ultracompactas), projeto por ambiente, entrega integrada com um cronograma e um responsável de cada área.
Tipografia/cores: cliente não definiu fonte nem paleta, então Poppins (títulos) + Inter (corpo) e paleta pedra, areia, grafite e bronze, derivada das fotos. Fundo mesclado (cliente respondeu "não sabemos").

## Eventos de rastreamento (dataLayer)
`whatsapp_click` (com `wa_local`: header, hero, galeria, arquitetos, final, footer, flutuante), `form_start`, `generate_lead`, `thank_you_view`.

## Checklist de SEO e entrega
- [x] Title e meta description com cidade e nicho
- [x] H1 com "Marmoraria" e "perto de você"
- [x] Open Graph completo + Twitter Card + og-image 1200x630
- [x] Canonical, robots.txt, sitemap.xml, site.webmanifest
- [x] JSON-LD HomeAndConstructionBusiness + FAQPage (só fatos do briefing)
- [x] width/height em todas as imagens, lazy-load e preload do hero
- [x] vercel.json, obrigado.html e 404.html personalizados (noindex)
- [x] Formulário com botão desabilitado até tudo válido
- [x] Botão flutuante de WhatsApp à direita
- [x] Script do IVO em index e obrigado (não na 404)
- [x] Rodapé "Desenvolvido por QH4 Growth"
