/* =====================================================================
   [QH4 SLOT 7] CONFIGURAÇÃO DE RASTREAMENTO E CONTATO
   Edite SÓ este bloco. O resto da LP lê daqui.
   ===================================================================== */
window.QH4_CFG = {
  // WhatsApp que recebe os leads (DDI + DDD + número, só dígitos)
  whatsapp: '5544997683366',

  // Mensagem padrão dos botões de WhatsApp
  waMensagem: 'Olá! Vim pelo site da Marcheli e gostaria de conversar sobre móveis planejados e marmoraria para a minha obra.',

  // Mensagem enviada após o formulário (modo com webhook / Apps Script)
  waMensagemForm: 'Olá, acabei de preencher o formulário no site. Aguardo mais informações.',

  // Webhook do Google Apps Script. DEIXE VAZIO se não houver.
  //  - vazio  : o formulário monta a mensagem completa e envia direto pro WhatsApp
  //  - preenchido : envia pro Apps Script, abre obrigado.html e redireciona pro WhatsApp
  webhook: '',

  // Rótulos de conversão (preencha se usar Google Ads direto, sem GTM)
  googleAdsConversion: '',   // ex.: 'AW-123456789/AbCdEfGhIjKl'
  metaPixelLeadEvent: 'Lead',

  // Tempo (ms) da página de obrigado antes de abrir o WhatsApp
  obrigadoDelay: 2500
};

/* ---------- dataLayer padronizado (não editar) ---------- */
window.dataLayer = window.dataLayer || [];
window.qh4Track = function (evento, extra) {
  var p = { event: evento };
  if (extra) { for (var k in extra) { p[k] = extra[k]; } }
  window.dataLayer.push(p);
  try {
    if (evento === 'generate_lead') {
      if (window.fbq) { window.fbq('track', window.QH4_CFG.metaPixelLeadEvent); }
      if (window.gtag && window.QH4_CFG.googleAdsConversion) {
        window.gtag('event', 'conversion', { send_to: window.QH4_CFG.googleAdsConversion });
      }
    }
  } catch (e) {}
};
window.qh4WaLink = function (msg) {
  return 'https://wa.me/' + window.QH4_CFG.whatsapp + '?text=' + encodeURIComponent(msg || window.QH4_CFG.waMensagem);
};
