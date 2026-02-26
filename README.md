# SAM Guardian - Software Asset Management Dashboard

A modern Software Asset Management (SAM) dashboard built with Next.js, React, TailwindCSS, and TypeScript. This tool combines software use discovery with license entitlements to show compliance position and cost analysis for unused and underutilized software.

## Features

- **Dashboard Overview**: High-level metrics including total software titles, compliance rate, annual costs, and underutilized licenses
- **Software Discovery**: Browse and search all discovered software with usage data, utilization rates, and compliance status
- **License Entitlements**: View all license agreements, costs, expiration dates, and vendor information
- **Compliance Position**: Visual compliance scoring with risk assessment for under-licensed and over-licensed software
- **Cost Analysis**: Detailed cost breakdown by category and vendor, with potential savings identification
- **License Reclamation**: Workflow for ITAM teams to identify and reclaim underutilized licenses (60+ days inactive)

## Key Metrics

- Software that has not been accessed in **60 days or more** is flagged as underutilized
- ITAM team can send notifications to users and reclaim unused licenses
- Real-time tracking of potential cost savings from license optimization

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd sam-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Charts**: Recharts (available for future enhancements)
- **Language**: TypeScript

## Project Structure

```
sam-dashboard/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardOverview.tsx
│   │   │   ├── SoftwareDiscovery.tsx
│   │   │   ├── LicenseEntitlements.tsx
│   │   │   ├── CompliancePosition.tsx
│   │   │   ├── CostAnalysis.tsx
│   │   │   └── LicenseReclamation.tsx
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   └── ui/
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── progress.tsx
│   │       └── tabs.tsx
│   ├── data/
│   │   └── mockData.ts
│   └── lib/
│       └── utils.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Mock Data

The application includes realistic mock data for demonstration purposes:
- 12 software titles across various categories
- 25+ usage records with varying activity levels
- 12 license entitlements with different vendors
- Compliance scenarios (compliant, over-licensed, under-licensed)

## License

MIT
