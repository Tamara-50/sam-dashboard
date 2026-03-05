export interface Software {
  id: string;
  name: string;
  vendor: string;
  version: string;
  category: string;
  licensedQuantity: number;
  installedQuantity: number;
  activeUsers: number;
  lastAccessDate: string;
  costPerLicense: number;
  licenseType: 'perpetual' | 'subscription' | 'concurrent';
  renewalDate?: string;
  complianceStatus: 'compliant' | 'over-licensed' | 'under-licensed';
}

export interface UsageRecord {
  softwareId: string;
  userId: string;
  userName: string;
  department: string;
  lastAccess: string;
  totalHoursUsed: number;
  daysInactive: number;
  deviceName: string;
}

export interface LicenseEntitlement {
  id: string;
  softwareId: string;
  agreementNumber: string;
  purchaseDate: string;
  expirationDate: string;
  quantity: number;
  costPerUnit: number;
  totalCost: number;
  vendor: string;
  maintenanceIncluded: boolean;
}

export const softwareInventory: Software[] = [
  {
    id: 'sw-001',
    name: 'Microsoft 365 E3',
    vendor: 'Microsoft',
    version: '2024',
    category: 'Productivity',
    licensedQuantity: 500,
    installedQuantity: 485,
    activeUsers: 420,
    lastAccessDate: '2026-02-19',
    costPerLicense: 36,
    licenseType: 'subscription',
    renewalDate: '2026-06-15',
    complianceStatus: 'compliant'
  },
  {
    id: 'sw-002',
    name: 'Adobe Creative Cloud',
    vendor: 'Adobe',
    version: '2025',
    category: 'Design',
    licensedQuantity: 100,
    installedQuantity: 145,
    activeUsers: 78,
    lastAccessDate: '2026-02-18',
    costPerLicense: 82,
    licenseType: 'subscription',
    renewalDate: '2026-08-01',
    complianceStatus: 'under-licensed'
  },
  {
    id: 'sw-003',
    name: 'Slack Business+',
    vendor: 'Salesforce',
    version: '2025',
    category: 'Communication',
    licensedQuantity: 600,
    installedQuantity: 580,
    activeUsers: 545,
    lastAccessDate: '2026-02-19',
    costPerLicense: 15,
    licenseType: 'subscription',
    renewalDate: '2026-04-30',
    complianceStatus: 'compliant'
  },
  {
    id: 'sw-004',
    name: 'AutoCAD',
    vendor: 'Autodesk',
    version: '2025',
    category: 'Engineering',
    licensedQuantity: 50,
    installedQuantity: 48,
    activeUsers: 22,
    lastAccessDate: '2026-01-05',
    costPerLicense: 220,
    licenseType: 'subscription',
    renewalDate: '2026-09-15',
    complianceStatus: 'over-licensed'
  },
  {
    id: 'sw-005',
    name: 'Salesforce CRM',
    vendor: 'Salesforce',
    version: 'Enterprise',
    category: 'CRM',
    licensedQuantity: 200,
    installedQuantity: 195,
    activeUsers: 180,
    lastAccessDate: '2026-02-19',
    costPerLicense: 165,
    licenseType: 'subscription',
    renewalDate: '2026-07-01',
    complianceStatus: 'compliant'
  },
  {
    id: 'sw-006',
    name: 'Zoom Business',
    vendor: 'Zoom',
    version: '2025',
    category: 'Communication',
    licensedQuantity: 300,
    installedQuantity: 290,
    activeUsers: 265,
    lastAccessDate: '2026-02-19',
    costPerLicense: 20,
    licenseType: 'subscription',
    renewalDate: '2026-05-15',
    complianceStatus: 'compliant'
  },
  {
    id: 'sw-007',
    name: 'Tableau Desktop',
    vendor: 'Salesforce',
    version: '2024.4',
    category: 'Analytics',
    licensedQuantity: 75,
    installedQuantity: 72,
    activeUsers: 35,
    lastAccessDate: '2025-12-10',
    costPerLicense: 70,
    licenseType: 'subscription',
    renewalDate: '2026-03-01',
    complianceStatus: 'over-licensed'
  },
  {
    id: 'sw-008',
    name: 'JetBrains IntelliJ IDEA',
    vendor: 'JetBrains',
    version: '2025.1',
    category: 'Development',
    licensedQuantity: 120,
    installedQuantity: 118,
    activeUsers: 105,
    lastAccessDate: '2026-02-19',
    costPerLicense: 60,
    licenseType: 'subscription',
    renewalDate: '2026-11-01',
    complianceStatus: 'compliant'
  },
  {
    id: 'sw-009',
    name: 'SAP S/4HANA',
    vendor: 'SAP',
    version: '2024',
    category: 'ERP',
    licensedQuantity: 150,
    installedQuantity: 148,
    activeUsers: 142,
    lastAccessDate: '2026-02-19',
    costPerLicense: 350,
    licenseType: 'subscription',
    renewalDate: '2026-12-31',
    complianceStatus: 'compliant'
  },
  {
    id: 'sw-010',
    name: 'Visio Professional',
    vendor: 'Microsoft',
    version: '2024',
    category: 'Productivity',
    licensedQuantity: 80,
    installedQuantity: 78,
    activeUsers: 25,
    lastAccessDate: '2025-11-20',
    costPerLicense: 15,
    licenseType: 'subscription',
    renewalDate: '2026-06-15',
    complianceStatus: 'over-licensed'
  },
  {
    id: 'sw-011',
    name: 'Figma Enterprise',
    vendor: 'Figma',
    version: '2025',
    category: 'Design',
    licensedQuantity: 60,
    installedQuantity: 58,
    activeUsers: 52,
    lastAccessDate: '2026-02-18',
    costPerLicense: 75,
    licenseType: 'subscription',
    renewalDate: '2026-10-01',
    complianceStatus: 'compliant'
  },
  {
    id: 'sw-012',
    name: 'Jira Software',
    vendor: 'Atlassian',
    version: 'Cloud',
    category: 'Project Management',
    licensedQuantity: 250,
    installedQuantity: 245,
    activeUsers: 230,
    lastAccessDate: '2026-02-19',
    costPerLicense: 14,
    licenseType: 'subscription',
    renewalDate: '2026-08-15',
    complianceStatus: 'compliant'
  },
  // Marketing Software
  {
    id: 'sw-013',
    name: 'HubSpot Marketing Hub',
    vendor: 'HubSpot',
    version: 'Enterprise',
    category: 'Marketing',
    licensedQuantity: 50,
    installedQuantity: 48,
    activeUsers: 42,
    lastAccessDate: '2026-02-19',
    costPerLicense: 120,
    licenseType: 'subscription',
    renewalDate: '2026-09-01',
    complianceStatus: 'compliant'
  },
  {
    id: 'sw-014',
    name: 'Marketo Engage',
    vendor: 'Adobe',
    version: '2024',
    category: 'Marketing',
    licensedQuantity: 25,
    installedQuantity: 28,
    activeUsers: 18,
    lastAccessDate: '2026-02-18',
    costPerLicense: 195,
    licenseType: 'subscription',
    renewalDate: '2026-07-15',
    complianceStatus: 'under-licensed'
  },
  {
    id: 'sw-015',
    name: 'Google Analytics 360',
    vendor: 'Google',
    version: '2025',
    category: 'Marketing',
    licensedQuantity: 15,
    installedQuantity: 15,
    activeUsers: 12,
    lastAccessDate: '2026-02-19',
    costPerLicense: 150,
    licenseType: 'subscription',
    renewalDate: '2026-12-31',
    complianceStatus: 'compliant'
  },
  // HR Software
  {
    id: 'sw-016',
    name: 'Workday Human Capital',
    vendor: 'Workday',
    version: '2024',
    category: 'HR',
    licensedQuantity: 300,
    installedQuantity: 295,
    activeUsers: 280,
    lastAccessDate: '2026-02-19',
    costPerLicense: 85,
    licenseType: 'subscription',
    renewalDate: '2026-06-30',
    complianceStatus: 'compliant'
  },
  {
    id: 'sw-017',
    name: 'BambooHR',
    vendor: 'BambooHR',
    version: '2025',
    category: 'HR',
    licensedQuantity: 100,
    installedQuantity: 95,
    activeUsers: 88,
    lastAccessDate: '2026-02-18',
    costPerLicense: 12,
    licenseType: 'subscription',
    renewalDate: '2026-04-30',
    complianceStatus: 'compliant'
  },
  {
    id: 'sw-018',
    name: 'LinkedIn Learning',
    vendor: 'LinkedIn',
    version: 'Enterprise',
    category: 'HR',
    licensedQuantity: 200,
    installedQuantity: 185,
    activeUsers: 142,
    lastAccessDate: '2026-02-17',
    costPerLicense: 35,
    licenseType: 'subscription',
    renewalDate: '2026-08-15',
    complianceStatus: 'compliant'
  },
  // AI Tools
  {
    id: 'sw-019',
    name: 'ChatGPT Plus',
    vendor: 'OpenAI',
    version: '2025',
    category: 'AI Tools',
    licensedQuantity: 150,
    installedQuantity: 148,
    activeUsers: 135,
    lastAccessDate: '2026-02-19',
    costPerLicense: 25,
    licenseType: 'subscription',
    renewalDate: '2026-05-01',
    complianceStatus: 'compliant'
  },
  {
    id: 'sw-020',
    name: 'Microsoft Copilot',
    vendor: 'Microsoft',
    version: '2025',
    category: 'AI Tools',
    licensedQuantity: 300,
    installedQuantity: 320,
    activeUsers: 285,
    lastAccessDate: '2026-02-19',
    costPerLicense: 40,
    licenseType: 'subscription',
    renewalDate: '2026-07-01',
    complianceStatus: 'under-licensed'
  },
  {
    id: 'sw-021',
    name: 'Jasper AI',
    vendor: 'Jasper',
    version: '2025',
    category: 'AI Tools',
    licensedQuantity: 35,
    installedQuantity: 32,
    activeUsers: 28,
    lastAccessDate: '2026-02-18',
    costPerLicense: 95,
    licenseType: 'subscription',
    renewalDate: '2026-10-15',
    complianceStatus: 'compliant'
  }
];

export const usageRecords: UsageRecord[] = [
  // Microsoft 365 - Active users
  { softwareId: 'sw-001', userId: 'u-001', userName: 'John Smith', department: 'Sales', lastAccess: '2026-02-19', totalHoursUsed: 245, daysInactive: 0, deviceName: 'LAPTOP-JS001' },
  { softwareId: 'sw-001', userId: 'u-002', userName: 'Sarah Johnson', department: 'Marketing', lastAccess: '2026-02-19', totalHoursUsed: 312, daysInactive: 0, deviceName: 'LAPTOP-SJ002' },
  { softwareId: 'sw-001', userId: 'u-003', userName: 'Mike Chen', department: 'Engineering', lastAccess: '2026-02-18', totalHoursUsed: 180, daysInactive: 1, deviceName: 'LAPTOP-MC003' },
  // Microsoft 365 - Underutilized
  { softwareId: 'sw-001', userId: 'u-004', userName: 'Emily Davis', department: 'HR', lastAccess: '2025-12-15', totalHoursUsed: 45, daysInactive: 66, deviceName: 'LAPTOP-ED004' },
  { softwareId: 'sw-001', userId: 'u-005', userName: 'Robert Wilson', department: 'Finance', lastAccess: '2025-11-28', totalHoursUsed: 22, daysInactive: 83, deviceName: 'LAPTOP-RW005' },
  
  // Adobe Creative Cloud - Active
  { softwareId: 'sw-002', userId: 'u-006', userName: 'Lisa Anderson', department: 'Design', lastAccess: '2026-02-18', totalHoursUsed: 520, daysInactive: 1, deviceName: 'WORKSTATION-LA006' },
  { softwareId: 'sw-002', userId: 'u-007', userName: 'David Martinez', department: 'Marketing', lastAccess: '2026-02-19', totalHoursUsed: 380, daysInactive: 0, deviceName: 'LAPTOP-DM007' },
  // Adobe - Underutilized
  { softwareId: 'sw-002', userId: 'u-008', userName: 'Jennifer Brown', department: 'Sales', lastAccess: '2025-12-01', totalHoursUsed: 15, daysInactive: 80, deviceName: 'LAPTOP-JB008' },
  { softwareId: 'sw-002', userId: 'u-009', userName: 'Chris Taylor', department: 'HR', lastAccess: '2025-11-15', totalHoursUsed: 8, daysInactive: 96, deviceName: 'LAPTOP-CT009' },
  
  // AutoCAD - Many underutilized
  { softwareId: 'sw-004', userId: 'u-010', userName: 'Tom Harris', department: 'Engineering', lastAccess: '2026-02-17', totalHoursUsed: 680, daysInactive: 2, deviceName: 'WORKSTATION-TH010' },
  { softwareId: 'sw-004', userId: 'u-011', userName: 'Amanda White', department: 'Engineering', lastAccess: '2025-12-20', totalHoursUsed: 120, daysInactive: 61, deviceName: 'WORKSTATION-AW011' },
  { softwareId: 'sw-004', userId: 'u-012', userName: 'Kevin Lee', department: 'Engineering', lastAccess: '2025-11-30', totalHoursUsed: 45, daysInactive: 81, deviceName: 'WORKSTATION-KL012' },
  { softwareId: 'sw-004', userId: 'u-013', userName: 'Rachel Green', department: 'Facilities', lastAccess: '2025-10-15', totalHoursUsed: 12, daysInactive: 127, deviceName: 'LAPTOP-RG013' },
  { softwareId: 'sw-004', userId: 'u-014', userName: 'Steve Rogers', department: 'Operations', lastAccess: '2025-09-20', totalHoursUsed: 5, daysInactive: 152, deviceName: 'LAPTOP-SR014' },
  
  // Tableau - Underutilized
  { softwareId: 'sw-007', userId: 'u-015', userName: 'Nancy Drew', department: 'Analytics', lastAccess: '2026-02-15', totalHoursUsed: 420, daysInactive: 4, deviceName: 'LAPTOP-ND015' },
  { softwareId: 'sw-007', userId: 'u-016', userName: 'Peter Parker', department: 'Finance', lastAccess: '2025-12-10', totalHoursUsed: 85, daysInactive: 71, deviceName: 'LAPTOP-PP016' },
  { softwareId: 'sw-007', userId: 'u-017', userName: 'Mary Jane', department: 'Marketing', lastAccess: '2025-11-25', totalHoursUsed: 30, daysInactive: 86, deviceName: 'LAPTOP-MJ017' },
  { softwareId: 'sw-007', userId: 'u-018', userName: 'Bruce Wayne', department: 'Executive', lastAccess: '2025-10-30', totalHoursUsed: 18, daysInactive: 112, deviceName: 'LAPTOP-BW018' },
  
  // Visio - Many underutilized
  { softwareId: 'sw-010', userId: 'u-019', userName: 'Clark Kent', department: 'IT', lastAccess: '2026-02-10', totalHoursUsed: 150, daysInactive: 9, deviceName: 'LAPTOP-CK019' },
  { softwareId: 'sw-010', userId: 'u-020', userName: 'Diana Prince', department: 'Operations', lastAccess: '2025-11-20', totalHoursUsed: 25, daysInactive: 91, deviceName: 'LAPTOP-DP020' },
  { softwareId: 'sw-010', userId: 'u-021', userName: 'Barry Allen', department: 'Engineering', lastAccess: '2025-10-05', totalHoursUsed: 10, daysInactive: 137, deviceName: 'LAPTOP-BA021' },
  { softwareId: 'sw-010', userId: 'u-022', userName: 'Hal Jordan', department: 'Sales', lastAccess: '2025-09-15', totalHoursUsed: 3, daysInactive: 157, deviceName: 'LAPTOP-HJ022' },
  
  // Salesforce CRM - Active
  { softwareId: 'sw-005', userId: 'u-023', userName: 'Tony Stark', department: 'Sales', lastAccess: '2026-02-19', totalHoursUsed: 890, daysInactive: 0, deviceName: 'LAPTOP-TS023' },
  { softwareId: 'sw-005', userId: 'u-024', userName: 'Natasha Romanoff', department: 'Sales', lastAccess: '2026-02-19', totalHoursUsed: 720, daysInactive: 0, deviceName: 'LAPTOP-NR024' },
  // Salesforce - Underutilized
  { softwareId: 'sw-005', userId: 'u-025', userName: 'Clint Barton', department: 'Support', lastAccess: '2025-12-18', totalHoursUsed: 40, daysInactive: 63, deviceName: 'LAPTOP-CB025' },
  // Marketing Software - Active users
  { softwareId: 'sw-013', userId: 'u-026', userName: 'Lisa Park', department: 'Marketing', lastAccess: '2026-02-19', totalHoursUsed: 180, daysInactive: 0, deviceName: 'LAPTOP-LP026' },
  { softwareId: 'sw-013', userId: 'u-027', userName: 'Tom Wilson', department: 'Marketing', lastAccess: '2026-02-18', totalHoursUsed: 220, daysInactive: 1, deviceName: 'LAPTOP-TW027' },
  { softwareId: 'sw-014', userId: 'u-028', userName: 'Jennifer Lee', department: 'Marketing', lastAccess: '2026-02-19', totalHoursUsed: 95, daysInactive: 0, deviceName: 'LAPTOP-JL028' },
  { softwareId: 'sw-015', userId: 'u-029', userName: 'David Brown', department: 'Marketing', lastAccess: '2026-02-17', totalHoursUsed: 120, daysInactive: 2, deviceName: 'LAPTOP-DB029' },
  // HR Software - Active users
  { softwareId: 'sw-016', userId: 'u-030', userName: 'Patricia Miller', department: 'HR', lastAccess: '2026-02-19', totalHoursUsed: 85, daysInactive: 0, deviceName: 'LAPTOP-PM030' },
  { softwareId: 'sw-016', userId: 'u-031', userName: 'Robert Taylor', department: 'HR', lastAccess: '2026-02-18', totalHoursUsed: 92, daysInactive: 1, deviceName: 'LAPTOP-RT031' },
  { softwareId: 'sw-017', userId: 'u-032', userName: 'Maria Garcia', department: 'HR', lastAccess: '2026-02-19', totalHoursUsed: 45, daysInactive: 0, deviceName: 'LAPTOP-MG032' },
  { softwareId: 'sw-018', userId: 'u-033', userName: 'James Anderson', department: 'HR', lastAccess: '2026-02-16', totalHoursUsed: 28, daysInactive: 3, deviceName: 'LAPTOP-JA033' },
  // AI Tools - Active users
  { softwareId: 'sw-019', userId: 'u-034', userName: 'Nancy White', department: 'Engineering', lastAccess: '2026-02-19', totalHoursUsed: 65, daysInactive: 0, deviceName: 'LAPTOP-NW034' },
  { softwareId: 'sw-019', userId: 'u-035', userName: 'Kevin Martinez', department: 'Marketing', lastAccess: '2026-02-19', totalHoursUsed: 48, daysInactive: 0, deviceName: 'LAPTOP-KM035' },
  { softwareId: 'sw-020', userId: 'u-036', userName: 'Susan Davis', department: 'Sales', lastAccess: '2026-02-19', totalHoursUsed: 72, daysInactive: 0, deviceName: 'LAPTOP-SD036' },
  { softwareId: 'sw-020', userId: 'u-037', userName: 'Chris Johnson', department: 'Engineering', lastAccess: '2026-02-18', totalHoursUsed: 88, daysInactive: 1, deviceName: 'LAPTOP-CJ037' },
  { softwareId: 'sw-021', userId: 'u-038', userName: 'Amanda Thompson', department: 'Design', lastAccess: '2026-02-19', totalHoursUsed: 55, daysInactive: 0, deviceName: 'LAPTOP-AT038' },
  // AI Tools - Underutilized
  { softwareId: 'sw-019', userId: 'u-039', userName: 'Brian Rodriguez', department: 'Finance', lastAccess: '2025-12-10', totalHoursUsed: 12, daysInactive: 71, deviceName: 'LAPTOP-BR039' },
  { softwareId: 'sw-018', userId: 'u-040', userName: 'Karen Lewis', department: 'Operations', lastAccess: '2025-11-20', totalHoursUsed: 8, daysInactive: 81, deviceName: 'LAPTOP-KL040' }
];

export const licenseEntitlements: LicenseEntitlement[] = [
  {
    id: 'ent-001',
    softwareId: 'sw-001',
    agreementNumber: 'MS-EA-2024-001',
    purchaseDate: '2024-06-15',
    expirationDate: '2027-06-14',
    quantity: 500,
    costPerUnit: 36,
    totalCost: 216000,
    vendor: 'Microsoft',
    maintenanceIncluded: true
  },
  {
    id: 'ent-002',
    softwareId: 'sw-002',
    agreementNumber: 'ADOBE-VIP-2024-045',
    purchaseDate: '2024-08-01',
    expirationDate: '2025-07-31',
    quantity: 100,
    costPerUnit: 82,
    totalCost: 98400,
    vendor: 'Adobe',
    maintenanceIncluded: true
  },
  {
    id: 'ent-003',
    softwareId: 'sw-003',
    agreementNumber: 'SLACK-ENT-2024-012',
    purchaseDate: '2024-04-30',
    expirationDate: '2025-04-29',
    quantity: 600,
    costPerUnit: 15,
    totalCost: 108000,
    vendor: 'Salesforce',
    maintenanceIncluded: true
  },
  {
    id: 'ent-004',
    softwareId: 'sw-004',
    agreementNumber: 'ADSK-SUB-2024-089',
    purchaseDate: '2024-09-15',
    expirationDate: '2025-09-14',
    quantity: 50,
    costPerUnit: 220,
    totalCost: 132000,
    vendor: 'Autodesk',
    maintenanceIncluded: true
  },
  {
    id: 'ent-005',
    softwareId: 'sw-005',
    agreementNumber: 'SF-ENT-2024-156',
    purchaseDate: '2024-07-01',
    expirationDate: '2025-06-30',
    quantity: 200,
    costPerUnit: 165,
    totalCost: 396000,
    vendor: 'Salesforce',
    maintenanceIncluded: true
  },
  {
    id: 'ent-006',
    softwareId: 'sw-006',
    agreementNumber: 'ZOOM-BUS-2024-078',
    purchaseDate: '2024-05-15',
    expirationDate: '2025-05-14',
    quantity: 300,
    costPerUnit: 20,
    totalCost: 72000,
    vendor: 'Zoom',
    maintenanceIncluded: false
  },
  {
    id: 'ent-007',
    softwareId: 'sw-007',
    agreementNumber: 'TAB-ENT-2024-034',
    purchaseDate: '2024-03-01',
    expirationDate: '2025-02-28',
    quantity: 75,
    costPerUnit: 70,
    totalCost: 63000,
    vendor: 'Salesforce',
    maintenanceIncluded: true
  },
  {
    id: 'ent-008',
    softwareId: 'sw-008',
    agreementNumber: 'JB-ALL-2024-201',
    purchaseDate: '2024-11-01',
    expirationDate: '2025-10-31',
    quantity: 120,
    costPerUnit: 60,
    totalCost: 86400,
    vendor: 'JetBrains',
    maintenanceIncluded: true
  },
  {
    id: 'ent-009',
    softwareId: 'sw-009',
    agreementNumber: 'SAP-S4-2024-445',
    purchaseDate: '2024-01-01',
    expirationDate: '2025-12-31',
    quantity: 150,
    costPerUnit: 350,
    totalCost: 630000,
    vendor: 'SAP',
    maintenanceIncluded: true
  },
  {
    id: 'ent-010',
    softwareId: 'sw-010',
    agreementNumber: 'MS-VISIO-2024-002',
    purchaseDate: '2024-06-15',
    expirationDate: '2025-06-14',
    quantity: 80,
    costPerUnit: 15,
    totalCost: 14400,
    vendor: 'Microsoft',
    maintenanceIncluded: true
  },
  {
    id: 'ent-011',
    softwareId: 'sw-011',
    agreementNumber: 'FIG-ENT-2024-067',
    purchaseDate: '2024-10-01',
    expirationDate: '2025-09-30',
    quantity: 60,
    costPerUnit: 75,
    totalCost: 54000,
    vendor: 'Figma',
    maintenanceIncluded: true
  },
  {
    id: 'ent-012',
    softwareId: 'sw-012',
    agreementNumber: 'ATL-JIRA-2024-123',
    purchaseDate: '2024-08-15',
    expirationDate: '2025-08-14',
    quantity: 250,
    costPerUnit: 14,
    totalCost: 42000,
    vendor: 'Atlassian',
    maintenanceIncluded: true
  },
  // Marketing Software Entitlements
  {
    id: 'ent-013',
    softwareId: 'sw-013',
    agreementNumber: 'HUBSPOT-ENT-2024-078',
    purchaseDate: '2024-09-01',
    expirationDate: '2025-08-31',
    quantity: 50,
    costPerUnit: 120,
    totalCost: 72000,
    vendor: 'HubSpot',
    maintenanceIncluded: true
  },
  {
    id: 'ent-014',
    softwareId: 'sw-014',
    agreementNumber: 'ADOBE-MKT-2024-023',
    purchaseDate: '2024-07-15',
    expirationDate: '2025-07-14',
    quantity: 25,
    costPerUnit: 195,
    totalCost: 58500,
    vendor: 'Adobe',
    maintenanceIncluded: true
  },
  {
    id: 'ent-015',
    softwareId: 'sw-015',
    agreementNumber: 'GOOG-GA360-2024-045',
    purchaseDate: '2024-01-01',
    expirationDate: '2025-12-31',
    quantity: 15,
    costPerUnit: 150,
    totalCost: 27000,
    vendor: 'Google',
    maintenanceIncluded: true
  },
  // HR Software Entitlements
  {
    id: 'ent-016',
    softwareId: 'sw-016',
    agreementNumber: 'WORKDAY-HCM-2024-112',
    purchaseDate: '2024-06-30',
    expirationDate: '2025-06-29',
    quantity: 300,
    costPerUnit: 85,
    totalCost: 306000,
    vendor: 'Workday',
    maintenanceIncluded: true
  },
  {
    id: 'ent-017',
    softwareId: 'sw-017',
    agreementNumber: 'BAMBOO-HR-2024-067',
    purchaseDate: '2024-04-30',
    expirationDate: '2025-04-29',
    quantity: 100,
    costPerUnit: 12,
    totalCost: 14400,
    vendor: 'BambooHR',
    maintenanceIncluded: false
  },
  {
    id: 'ent-018',
    softwareId: 'sw-018',
    agreementNumber: 'LINKEDIN-LRN-2024-089',
    purchaseDate: '2024-08-15',
    expirationDate: '2025-08-14',
    quantity: 200,
    costPerUnit: 35,
    totalCost: 84000,
    vendor: 'LinkedIn',
    maintenanceIncluded: true
  },
  // AI Tools Entitlements
  {
    id: 'ent-019',
    softwareId: 'sw-019',
    agreementNumber: 'OPENAI-PLUS-2024-156',
    purchaseDate: '2024-05-01',
    expirationDate: '2025-04-30',
    quantity: 150,
    costPerUnit: 25,
    totalCost: 45000,
    vendor: 'OpenAI',
    maintenanceIncluded: false
  },
  {
    id: 'ent-020',
    softwareId: 'sw-020',
    agreementNumber: 'MS-COPILOT-2024-234',
    purchaseDate: '2024-07-01',
    expirationDate: '2025-06-30',
    quantity: 300,
    costPerUnit: 40,
    totalCost: 144000,
    vendor: 'Microsoft',
    maintenanceIncluded: true
  },
  {
    id: 'ent-021',
    softwareId: 'sw-021',
    agreementNumber: 'JASPER-AI-2024-045',
    purchaseDate: '2024-10-15',
    expirationDate: '2025-10-14',
    quantity: 35,
    costPerUnit: 95,
    totalCost: 39900,
    vendor: 'Jasper',
    maintenanceIncluded: false
  }
];

// Helper functions
export function getUnderutilizedUsers(daysThreshold: number = 60): UsageRecord[] {
  return usageRecords.filter(record => record.daysInactive >= daysThreshold);
}

export function calculatePotentialSavings(): number {
  const underutilized = getUnderutilizedUsers();
  return underutilized.reduce((total, record) => {
    const software = softwareInventory.find(s => s.id === record.softwareId);
    return total + (software?.costPerLicense || 0);
  }, 0);
}

export function getComplianceSummary() {
  const compliant = softwareInventory.filter(s => s.complianceStatus === 'compliant').length;
  const overLicensed = softwareInventory.filter(s => s.complianceStatus === 'over-licensed').length;
  const underLicensed = softwareInventory.filter(s => s.complianceStatus === 'under-licensed').length;
  return { compliant, overLicensed, underLicensed, total: softwareInventory.length };
}

export function getTotalLicenseCost(): number {
  return licenseEntitlements.reduce((total, ent) => total + ent.totalCost, 0);
}

export function getMonthlyLicenseCost(): number {
  return getTotalLicenseCost() / 12;
}
