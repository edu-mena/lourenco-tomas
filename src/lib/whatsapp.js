import { WA_NUMBER, CONTACT_EMAIL } from '../data/content'

/* Número e email vêm das definições do admin (SiteContentProvider chama
   setContactConfig); até lá valem os do código. */
let contact = { whatsappNumber: WA_NUMBER, email: CONTACT_EMAIL }
export function setContactConfig(c) {
  contact = { whatsappNumber: c.whatsappNumber || WA_NUMBER, email: c.email || CONTACT_EMAIL }
}

export function waLink(text) {
  return `https://wa.me/${contact.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

export function mailLink(subject, body) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/* rows: [label, value][] — linhas vazias são omitidas; `message` vai no fim, separado */
export function buildMessage(title, rows, message) {
  const lines = [`*${title}*`, '']
  rows.forEach(([label, value]) => { if (value) lines.push(`${label}: ${value}`) })
  if (message) lines.push('', message)
  return lines.join('\n')
}

/* Abre o WhatsApp numa nova janela. Devolve false se o browser bloquear o popup. */
export function openWhatsApp(text) {
  // Sem a flag 'noopener' porque com ela window.open devolve sempre null
  const win = window.open(waLink(text), '_blank')
  if (win) win.opener = null
  return !!win
}
