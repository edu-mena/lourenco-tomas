import { useState, useRef, useCallback } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/* Validadores — cada um devolve uma mensagem de erro ou null */
export const rules = {
  required: (msg = 'Campo obrigatório.') => v => (String(v ?? '').trim() ? null : msg),
  email: (msg = 'Email inválido.') => v => (!v || EMAIL_RE.test(v.trim()) ? null : msg),
  minLength: (n, msg) => v =>
    !v || v.trim().length >= n ? null : (msg ?? `Escreva pelo menos ${n} caracteres.`),
}

function runRules(schema, values) {
  const errors = {}
  for (const [name, fieldRules] of Object.entries(schema)) {
    for (const rule of fieldRules) {
      const err = rule(values[name])
      if (err) { errors[name] = err; break }
    }
  }
  return errors
}

/*
 * Formulário controlado com validação "ao sair do campo":
 * os erros só aparecem depois de o campo ser tocado ou de uma tentativa de envio.
 */
export function useForm({ initial, schema, idPrefix }) {
  const [values, setValues] = useState(initial)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  const errors = runRules(schema, values)

  const setValue = useCallback((name, value) => {
    setValues(v => ({ ...v, [name]: value }))
  }, [])

  const errorFor = name => ((touched[name] || submitted) ? errors[name] : undefined)

  const field = name => {
    const id = `${idPrefix}-${name}`
    const error = errorFor(name)
    return {
      id,
      name,
      value: values[name] ?? '',
      onChange: e => setValue(name, e.target.value),
      onBlur: () => setTouched(t => ({ ...t, [name]: true })),
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `${id}-error` : undefined,
    }
  }

  const handleSubmit = onValid => e => {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length) {
      // Leva o utilizador ao primeiro campo com erro
      const first = Object.keys(schema).find(n => errors[n])
      formRef.current?.querySelector(`#${idPrefix}-${first}`)?.focus()
      return
    }
    onValid(values, e.nativeEvent?.submitter)
  }

  const reset = () => {
    setValues(initial)
    setTouched({})
    setSubmitted(false)
  }

  return { values, setValue, field, errorFor, handleSubmit, reset, formRef }
}
