import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import {
  PRODUCTS,
  loadIncidents,
  createIncident,
  STATUSES,
  type Incident,
  type Product,
} from './data'

interface FormState {
  batchId: string
  product: Product | ''
  summary: string
}

const EMPTY_FORM: FormState = {
  batchId: '',
  product: '',
  summary: '',
}

const slug = (value: string) => value.toLowerCase().replace(/\s+/g, '-')

function App() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)
  const [saving, setSaving] = useState(false)
  const [dataError, setDataError] = useState('')
  const [status, setStatus] = useState('')
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true
    loadIncidents()
      .then((rows) => {
        if (!active) return
        setIncidents(rows)
        setConnected(true)
      })
      .catch((error: unknown) => {
        if (active) setDataError(error instanceof Error ? error.message : String(error))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const filteredIncidents = incidents.filter(
    (incident) => !status || incident.status === status,
  )

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (saving || !connected) return
    setNotice('')
    const batchId = form.batchId.trim()
    const summary = form.summary.trim()
    const product = PRODUCTS.find((item) => item === form.product)
    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    if (!batchId) nextErrors.batchId = 'Batch ID is required.'
    if (!product) nextErrors.product = 'Select a product.'
    if (!summary) nextErrors.summary = 'Issue is required.'
    setErrors(nextErrors)
    if (!batchId || !product || !summary) return

    setSaving(true)
    setDataError('')
    try {
      const incident = await createIncident({ batchId, product, summary, status: 'Open' })
      setIncidents((rows) => [incident, ...rows])
      setForm(EMPTY_FORM)
      setErrors({})
      setNotice('Incident saved to Dataverse with status Open. Select All statuses to see every incident.')
    } catch (error: unknown) {
      setDataError(error instanceof Error ? error.message : String(error))
    } finally {
      setSaving(false)
    }
  }

  function field<K extends keyof FormState>(
    key: K,
    label: string,
    inputType: 'text' | 'select',
    options?: readonly string[],
  ) {
    const id = `field-${key}`
    const error = errors[key]
    const inputProperties = {
      id,
      value: form[key],
      required: true,
      disabled: !connected || saving,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `${id}-error` : undefined,
      onChange: (event: { target: { value: string } }) =>
        setForm({ ...form, [key]: event.target.value }),
    }

    return (
      <div className="field">
        <label htmlFor={id}>
          {label} <span aria-hidden="true">*</span>
        </label>
        {inputType === 'text' && <input type="text" {...inputProperties} />}
        {inputType === 'select' && (
          <select {...inputProperties}>
            <option value="">Select...</option>
            {options?.map((option) => <option key={option}>{option}</option>)}
          </select>
        )}
        {error && (
          <p className="error" id={`${id}-error`} role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="topbar">
        <div className="brand">
          <span className="logo" aria-hidden="true">Z</span>
          <div>
            <h1>Zava Quality Incident Tracker</h1>
            <p>Quality incidents stored in Dataverse</p>
          </div>
        </div>
      </header>

      <main id="main">
        {dataError && <p className="error" role="alert">{dataError}</p>}
        {loading && <p role="status">Loading incidents from Dataverse...</p>}
        <section aria-label="Filter incidents" className="filters">
          <div className="field">
            <label htmlFor="filter-status">Status</label>
            <select
              id="filter-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">All statuses</option>
              {STATUSES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </section>

        <div className="layout">
          <section aria-label="Incidents" className="list">
            {connected && <p className="count" aria-live="polite">
              Showing {filteredIncidents.length} of {incidents.length} incidents
            </p>}
            {!connected ? (
              <p className="empty">{loading ? 'Connecting to Dataverse...' : 'Connect Dataverse before adding incidents.'}</p>
            ) : filteredIncidents.length === 0 ? (
              <p className="empty">{incidents.length === 0 ? 'No incidents yet. Add your first incident.' : 'No incidents match the current filters.'}</p>
            ) : (
              <div className="table-wrap">
                <table>
                  <caption className="sr-only">Quality incidents</caption>
                  <thead>
                    <tr>
                      <th scope="col">Batch ID</th>
                      <th scope="col">Product</th>
                      <th scope="col">Issue</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIncidents.map((incident) => (
                      <tr key={incident.id}>
                        <td data-label="Batch ID">{incident.batchId}</td>
                        <td data-label="Product">{incident.product}</td>
                        <td data-label="Issue">{incident.summary}</td>
                        <td data-label="Status">
                          <span className={`badge status-${slug(incident.status)}`}>
                            {incident.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <aside className="panel" aria-label="New incident form">
            <form onSubmit={submit} noValidate>
              <h2>New incident</h2>
              {field('batchId', 'Batch ID', 'text')}
              {field('product', 'Product', 'select', PRODUCTS)}
              {field('summary', 'Issue', 'text')}
              <button type="submit" className="button primary" disabled={!connected || saving}>
                {saving ? 'Saving...' : 'Create incident'}
              </button>
              <p role="status">{notice}</p>
            </form>
          </aside>
        </div>
      </main>
    </>
  )
}

export default App
