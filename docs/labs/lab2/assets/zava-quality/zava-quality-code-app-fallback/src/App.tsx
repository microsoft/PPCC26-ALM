import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import { loadIncidents, createIncident, type Incident } from './data'

function App() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)
  const [saving, setSaving] = useState(false)
  const [dataError, setDataError] = useState('')
  const [issue, setIssue] = useState('')
  const [fieldError, setFieldError] = useState('')
  const [notice, setNotice] = useState('')
  const [attempt, setAttempt] = useState(0)

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
  }, [attempt])

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (saving || !connected) return
    setNotice('')
    const value = issue.trim()
    if (!value || value.length > 100) {
      setFieldError(!value ? 'Issue is required.' : 'Use no more than 100 characters.')
      return
    }

    setSaving(true)
    setFieldError('')
    setDataError('')
    try {
      const incident = await createIncident({ issue: value })
      setIncidents((rows) => [incident, ...rows])
      setIssue('')
      setNotice('Incident saved to Dataverse. Reload to verify persistence.')
    } catch (error: unknown) {
      setDataError(error instanceof Error ? error.message : String(error))
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="topbar">
        <div className="brand">
          <span className="logo" aria-hidden="true">Z</span>
          <div>
            <h1>Zava Quality Incident Tracker</h1>
            <p>One Issue field. Real Dataverse records.</p>
          </div>
        </div>
      </header>

      <main id="main">
        {dataError && <p className="error" role="alert">{dataError}</p>}
        {loading && <p role="status">Loading incidents from Dataverse...</p>}
        {!loading && !connected && (
          <button type="button" className="button" onClick={() => {
            setLoading(true)
            setConnected(false)
            setDataError('')
            setAttempt((value) => value + 1)
          }}>
            Retry connection
          </button>
        )}
        <div className="layout">
          <section aria-label="Incidents" className="list">
            {!connected ? (
              <p className="empty">
                {loading ? 'Connecting to Dataverse...' : 'Connect Dataverse before adding incidents.'}
              </p>
            ) : (
              <>
                <p className="count" aria-live="polite">{incidents.length} incidents</p>
                {incidents.length === 0 ? (
                  <p className="empty">No incidents yet. Add your first incident.</p>
                ) : (
                  <div className="table-wrap">
                    <table>
                      <caption className="sr-only">Quality incidents</caption>
                      <thead><tr><th scope="col">Issue</th></tr></thead>
                      <tbody>
                        {incidents.map((incident) => (
                          <tr key={incident.id}><td data-label="Issue">{incident.issue}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </section>

          <aside className="panel" aria-label="New incident form">
            <form onSubmit={submit} noValidate>
              <h2>New incident</h2>
              <div className="field">
                <label htmlFor="issue">Issue <span aria-hidden="true">*</span></label>
                <input
                  id="issue"
                  value={issue}
                  maxLength={100}
                  required
                  disabled={!connected || saving}
                  aria-invalid={fieldError ? true : undefined}
                  aria-describedby={fieldError ? 'issue-error' : undefined}
                  onChange={(event) => setIssue(event.target.value)}
                />
                {fieldError && <p id="issue-error" className="error" role="alert">{fieldError}</p>}
              </div>
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
