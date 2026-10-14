export type Product = 'ZavaCore Field' | 'ZavaCore Systems'
export type Severity = 'Low' | 'Medium' | 'High' | 'Critical'
export type Status = 'Open' | 'Under observation' | 'On hold' | 'Closed'

export interface Incident {
  id: string
  batchId: string
  product: Product
  summary: string
  details: string
  severity: Severity
  status: Status
  owner: string
  opened: string
}

export const PRODUCTS: Product[] = ['ZavaCore Field', 'ZavaCore Systems']
export const SEVERITIES: Severity[] = ['Low', 'Medium', 'High', 'Critical']
export const STATUSES: Status[] = ['Open', 'Under observation', 'On hold', 'Closed']

export const SEED_INCIDENTS: Incident[] = [
  {
    id: 'QI-1001',
    batchId: 'B-24-0615',
    product: 'ZavaCore Field',
    summary: 'Housing seal gap exceeds tolerance',
    details: 'Inline inspection found a 0.4 mm gap on 3% of sampled units. Containment sort in progress.',
    severity: 'Critical',
    status: 'On hold',
    owner: 'Avery Chen',
    opened: '2026-09-28',
  },
  {
    id: 'QI-1002',
    batchId: 'B-24-0617',
    product: 'ZavaCore Systems',
    summary: 'Firmware checksum mismatch on test rig',
    details: 'Two units failed checksum validation during end-of-line test. Rig calibration under review.',
    severity: 'High',
    status: 'Open',
    owner: 'Jordan Patel',
    opened: '2026-09-30',
  },
  {
    id: 'QI-1003',
    batchId: 'B-24-0620',
    product: 'ZavaCore Field',
    summary: 'Cosmetic scratch on casing finish',
    details: 'Minor surface marks traced to a packing fixture. Monitoring next three batches.',
    severity: 'Low',
    status: 'Under observation',
    owner: 'Sam Rivera',
    opened: '2026-10-02',
  },
  {
    id: 'QI-1004',
    batchId: 'B-24-0622',
    product: 'ZavaCore Systems',
    summary: 'Connector torque drift at station 4',
    details: 'Torque readings drifted upward over a shift. Tool recalibrated; verifying stability.',
    severity: 'Medium',
    status: 'Under observation',
    owner: 'Mia Okafor',
    opened: '2026-10-05',
  },
  {
    id: 'QI-1005',
    batchId: 'B-24-0609',
    product: 'ZavaCore Field',
    summary: 'Label misprint on carton',
    details: 'Wrong revision code printed. Labels replaced and printer template corrected.',
    severity: 'Low',
    status: 'Closed',
    owner: 'Avery Chen',
    opened: '2026-09-20',
  },
  {
    id: 'QI-1006',
    batchId: 'B-24-0612',
    product: 'ZavaCore Systems',
    summary: 'Thermal sensor out-of-range readings',
    details: 'Supplier lot produced readings outside spec. Lot returned; replacement verified.',
    severity: 'Critical',
    status: 'Closed',
    owner: 'Jordan Patel',
    opened: '2026-09-22',
  },
  {
    id: 'QI-1007',
    batchId: 'B-24-0625',
    product: 'ZavaCore Field',
    summary: 'Intermittent power-on failure in cold soak',
    details: 'Failures at -10 C soak. Root cause analysis scheduled; shipments held pending results.',
    severity: 'High',
    status: 'On hold',
    owner: 'Sam Rivera',
    opened: '2026-10-08',
  },
]
