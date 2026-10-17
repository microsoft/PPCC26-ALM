export type Product = 'ZavaCore Field' | 'ZavaCore Systems'
export type Status = 'Open' | 'On hold' | 'Closed'

export interface Incident {
  id: string
  batchId: string
  product: Product
  summary: string
  status: Status
}

export const PRODUCTS: Product[] = ['ZavaCore Field', 'ZavaCore Systems']
export const STATUSES: Status[] = ['Open', 'On hold', 'Closed']

export type NewIncident = Omit<Incident, 'id'>

// Task 4 replaces these connection points with the environment's generated service.
export async function loadIncidents(): Promise<Incident[]> {
  throw new Error('Dataverse connection required. Complete Task 4, Step 3 before testing.')
}

export async function createIncident(incident: NewIncident): Promise<Incident> {
  throw new Error(`Cannot save batch ${incident.batchId}: connect Dataverse in Task 4, Step 3.`)
}
