export interface Incident {
  id: string
  issue: string
}

export type NewIncident = Pick<Incident, 'issue'>

// Task 3 connects these functions to the environment's generated Dataverse service.
export async function loadIncidents(): Promise<Incident[]> {
  throw new Error('Dataverse connection required. Complete Task 3 before testing.')
}

export async function createIncident(incident: NewIncident): Promise<Incident> {
  throw new Error(`Cannot save "${incident.issue}": connect Dataverse in Task 3 first.`)
}
