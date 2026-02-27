"use client"

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { SoftwareDiscovery } from '@/components/dashboard/SoftwareDiscovery'
import { LicenseEntitlements } from '@/components/dashboard/LicenseEntitlements'
import { CompliancePosition } from '@/components/dashboard/CompliancePosition'
import { CostAnalysis } from '@/components/dashboard/CostAnalysis'
import { LicenseReclamation } from '@/components/dashboard/LicenseReclamation'
import { Computers } from '@/components/dashboard/Computers'

const viewTitles: Record<string, string> = {
  'dashboard': 'Dashboard Overview',
  'discovery': 'Software Discovery',
  'entitlements': 'License Entitlements',
  'upload-licenses': 'Upload Licenses',
  'computers': 'Computers',
  'compliance': 'Compliance Position',
  'cost-analysis': 'Cost Analysis',
  'reclamation': 'License Reclamation',
  'settings': 'Settings',
  'help': 'Help & Support'
}

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />
      case 'discovery':
        return <SoftwareDiscovery />
      case 'entitlements':
        return <LicenseEntitlements />
      case 'upload-licenses':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Upload Licenses</h2>
              <p className="text-slate-500">License upload functionality coming soon...</p>
            </div>
          </div>
        )
      case 'computers':
        return <Computers />
      case 'compliance':
        return <CompliancePosition />
      case 'cost-analysis':
        return <CostAnalysis />
      case 'reclamation':
        return <LicenseReclamation />
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Settings</h2>
              <p className="text-slate-500">Settings page coming soon...</p>
            </div>
          </div>
        )
      case 'help':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Help & Support</h2>
              <p className="text-slate-500">Help documentation coming soon...</p>
            </div>
          </div>
        )
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar 
        activeView={activeView}
        onViewChange={setActiveView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={viewTitles[activeView] || 'Dashboard'} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
