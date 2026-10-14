import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import {
  PRODUCTS,
  SEED_INCIDENTS,
  SEVERITIES,
  STATUSES,
  type Incident,
  type Product,
  type Severity,
  type Status,
} from './data'

interface FormState {
  batchId: string
  product: Product | ''
  summary: string
  details: string
  severity: Severity | ''
  status: Status | ''
  owner: string
}

const EMPTY_FORM: FormState = {
  batchId: '',
  product: '',
  summary: '',
  details: '',
  severity: '',
  status: 'Open',
  owner: '',
}

const slug = (value: string) => value.toLowerCase().replace(/\s+/g, '-')

function Badge({ kind, value }: { kind: 'severity' | 'status'; value: string }) {
  return <span className={`badge ${kind}-${slug(value)}`}>{value}</span>
}

function App() {
  const [incidents, setIncidents] = useState<Incident[]>(SEED_INCIDENTS)
  const [product, setProduct] = useState('')
  const [severity, setSeverity] = useState('')
  const [status, setStatus] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const counts = useMemo(
    () => ({
      Open: incidents.filter((incident) => incident.status === 'Open').length,
      'On hold': incidents.filter((incident) => incident.status === 'On hold').length,
      Critical: incidents.filter((incident) => incident.severity === 'Critical').length,
      Closed: incidents.filter((incident) => incident.status === 'Closed').length,
    }),
    [incidents],
  )

  const filteredIncidents = incidents.filter(
    (incident) =>
      (!product || incident.product === product) &&
      (!severity || incident.severity === severity) &&
      (!status || incident.status === status),
  )
  const selectedIncident = incidents.find((incident) => incident.id === selectedId) ?? null

  function validate(currentForm: FormState) {
    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    if (!currentForm.batchId.trim()) nextErrors.batchId = 'Batch ID is required.'
    if (!currentForm.product) nextErrors.product = 'Select a product.'
    if (!currentForm.summary.trim()) nextErrors.summary = 'Issue summary is required.'
    if (!currentForm.details.trim()) nextErrors.details = 'Details are required.'
    if (!currentForm.severity) nextErrors.severity = 'Select a severity.'
    if (!currentForm.status) nextErrors.status = 'Select a status.'
    if (!currentForm.owner.trim()) nextErrors.owner = 'Owner is required.'
    return nextErrors
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const nextNumber = Math.max(...incidents.map((incident) => Number(incident.id.slice(3)))) + 1
    const incident: Incident = {
      id: `QI-${nextNumber}`,
      batchId: form.batchId.trim(),
      product: form.product as Product,
      summary: form.summary.trim(),
      details: form.details.trim(),
      severity: form.severity as Severity,
      status: form.status as Status,
      owner: form.owner.trim(),
      opened: new Date().toISOString().slice(0, 10),
    }

    setIncidents([incident, ...incidents])
    setForm(EMPTY_FORM)
    setErrors({})
    setShowForm(false)
    setSelectedId(incident.id)
  }

  function field<K extends keyof FormState>(
    key: K,
    label: string,
    inputType: 'text' | 'textarea' | 'select',
    options?: readonly string[],
  ) {
    const id = `field-${key}`
    const error = errors[key]
    const inputProperties = {
      id,
      value: form[key],
      required: true,
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
        {inputType === 'textarea' && <textarea rows={3} {...inputProperties} />}
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
            <p>Quality Operations - sample data</p>
          </div>
        </div>
        <button
          className="button primary"
          onClick={() => {
            setShowForm(true)
            setSelectedId(null)
          }}
        >
          + New incident
        </button>
      </header>

      <main id="main">
        <section aria-label="Summary" className="cards">
          {(Object.keys(counts) as (keyof typeof counts)[]).map((label) => (
            <div key={label} className={`card card-${slug(label)}`}>
              <span className="card-label">{label}</span>
              <span className="card-value">{counts[label]}</span>
            </div>
          ))}
        </section>

        <section aria-label="Filters" className="filters">
          <div className="field">
            <label htmlFor="filter-product">Product</label>
            <select
              id="filter-product"
              value={product}
              onChange={(event) => setProduct(event.target.value)}
            >
              <option value="">All products</option>
              {PRODUCTS.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="filter-severity">Severity</label>
            <select
              id="filter-severity"
              value={severity}
              onChange={(event) => setSeverity(event.target.value)}
            >
              <option value="">All severities</option>
              {SEVERITIES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
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
          <button
            className="button"
            onClick={() => {
              setProduct('')
              setSeverity('')
              setStatus('')
            }}
          >
            Clear filters
          </button>
        </section>

        <div className="layout">
          <section aria-label="Incidents" className="list">
            <p className="count" aria-live="polite">
              Showing {filteredIncidents.length} of {incidents.length} incidents
            </p>
            {filteredIncidents.length === 0 ? (
              <p className="empty">No incidents match the current filters.</p>
            ) : (
              <div className="table-wrap">
                <table>
                  <caption className="sr-only">Quality incidents</caption>
                  <thead>
                    <tr>
                      <th scope="col">Incident ID</th>
                      <th scope="col">Batch ID</th>
                      <th scope="col">Product</th>
                      <th scope="col">Issue summary</th>
                      <th scope="col">Severity</th>
                      <th scope="col">Status</th>
                      <th scope="col">Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIncidents.map((incident) => (
                      <tr
                        key={incident.id}
                        className={incident.id === selectedId ? 'selected' : ''}
                      >
                        <td data-label="Incident ID">
                          <button
                            className="link"
                            onClick={() => {
                              setSelectedId(incident.id)
                              setShowForm(false)
                            }}
                            aria-label={`View details for ${incident.id}`}
                          >
                            {incident.id}
                          </button>
                        </td>
                        <td data-label="Batch ID">{incident.batchId}</td>
                        <td data-label="Product">{incident.product}</td>
                        <td data-label="Issue">{incident.summary}</td>
                        <td data-label="Severity">
                          <Badge kind="severity" value={incident.severity} />
                        </td>
                        <td data-label="Status">
                          <Badge kind="status" value={incident.status} />
                        </td>
                        <td data-label="Owner">{incident.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {(selectedIncident || showForm) && (
            <aside className="panel" aria-label={showForm ? 'New incident form' : 'Incident detail'}>
              {showForm ? (
                <form onSubmit={submit} noValidate>
                  <h2>New incident</h2>
                  {field('batchId', 'Batch ID', 'text')}
                  {field('product', 'ZavaCore product', 'select', PRODUCTS)}
                  {field('summary', 'Issue summary', 'text')}
                  {field('details', 'Details', 'textarea')}
                  {field('severity', 'Severity', 'select', SEVERITIES)}
                  {field('status', 'Status', 'select', STATUSES)}
                  {field('owner', 'Owner', 'text')}
                  <div className="actions">
                    <button type="submit" className="button primary">Create incident</button>
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        setShowForm(false)
                        setErrors({})
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : selectedIncident && (
                <div>
                  <h2>{selectedIncident.id}</h2>
                  <p className="lead">{selectedIncident.summary}</p>
                  <dl>
                    <dt>Batch ID</dt><dd>{selectedIncident.batchId}</dd>
                    <dt>Product</dt><dd>{selectedIncident.product}</dd>
                    <dt>Severity</dt>
                    <dd><Badge kind="severity" value={selectedIncident.severity} /></dd>
                    <dt>Status</dt>
                    <dd><Badge kind="status" value={selectedIncident.status} /></dd>
                    <dt>Owner</dt><dd>{selectedIncident.owner}</dd>
                    <dt>Opened</dt><dd>{selectedIncident.opened}</dd>
                    <dt>Details</dt><dd>{selectedIncident.details}</dd>
                  </dl>
                  <button className="button" onClick={() => setSelectedId(null)}>
                    Close detail
                  </button>
                </div>
              )}
            </aside>
          )}
        </div>
      </main>
    </>
  )
}

export default App
