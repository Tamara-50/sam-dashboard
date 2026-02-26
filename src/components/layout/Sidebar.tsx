"use client"

import React, { useState } from 'react'
import { 
  LayoutDashboard, 
  Search, 
  FileCheck, 
  AlertTriangle, 
  DollarSign, 
  Recycle,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Package
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'discovery', label: 'Software Discovery', icon: Search },
  { 
    id: 'entitlements', 
    label: 'License Entitlements', 
    icon: FileCheck,
    hasSubmenu: true,
    submenu: [
      { id: 'entitlements', label: 'View Licenses' },
      { id: 'upload-licenses', label: 'Upload Licenses' }
    ]
  },
  { id: 'compliance', label: 'Compliance Position', icon: AlertTriangle },
  { id: 'cost-analysis', label: 'Cost Analysis', icon: DollarSign },
  { id: 'reclamation', label: 'License Reclamation', icon: Recycle },
]

const bottomNavItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
]

export function Sidebar({ activeView, onViewChange, collapsed, onToggleCollapse }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleSubmenu = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }
  return (
    <aside className={cn(
      "flex flex-col h-screen bg-slate-900 text-white transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img 
                  src="/wwt-logo.png" 
                  alt="WWT Logo" 
                  className="w-8 h-8 rounded-lg object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white">SAM Guardian</span>
            </div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img 
                  src="/wwt-logo.png" 
                  alt="WWT Logo" 
                  className="w-8 h-8 rounded-lg object-contain"
                />
              </div>
            </div>
          )}
        </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id || (item.submenu && item.submenu.some(sub => sub.id === activeView))
            const isExpanded = expandedItems.includes(item.id)
            const hasSubmenu = item.hasSubmenu
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => hasSubmenu ? toggleSubmenu(item.id) : onViewChange(item.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-white")} />
                  {!collapsed && (
                    <>
                      <span className="ml-3 text-sm font-medium flex-1 text-left">{item.label}</span>
                      {hasSubmenu && (
                        <ChevronDown 
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            isExpanded && "rotate-180"
                          )} 
                        />
                      )}
                    </>
                  )}
                </button>
                
                {/* Submenu */}
                {hasSubmenu && !collapsed && isExpanded && (
                  <ul className="mt-1 ml-4 space-y-1">
                    {item.submenu?.map((subItem) => {
                      const isSubActive = activeView === subItem.id
                      return (
                        <li key={subItem.id}>
                          <button
                            onClick={() => onViewChange(subItem.id)}
                            className={cn(
                              "w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm",
                              isSubActive
                                ? "bg-blue-500 text-white"
                                : "text-slate-400 hover:bg-slate-700 hover:text-white"
                            )}
                          >
                            {subItem.label}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-700 py-4">
        <ul className="space-y-1 px-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className="w-full flex items-center px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="ml-3 text-sm">{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Collapse Toggle */}
      <div className="border-t border-slate-700 p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!collapsed && <span className="ml-2 text-sm">Collapse</span>}
        </Button>
      </div>
    </aside>
  )
}
