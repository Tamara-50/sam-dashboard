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
