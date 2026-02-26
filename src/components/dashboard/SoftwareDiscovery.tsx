"use client"

import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
  Users,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { softwareInventory, usageRecords, type Software } from '@/data/mockData'

export function SoftwareDiscovery() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof Software>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const categories = ['all', ...new Set(softwareInventory.map(s => s.category))]

  const filteredSoftware = softwareInventory
    .filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.vendor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
      }
      return 0
    })

  const handleSort = (field: keyof Software) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getUsageForSoftware = (softwareId: string) => {
    return usageRecords.filter(r => r.softwareId === softwareId)
  }

  const getUtilizationRate = (software: Software) => {
    return Math.round((software.activeUsers / software.licensedQuantity) * 100)
  }

  const getComplianceBadge = (status: Software['complianceStatus']) => {
    switch (status) {
      case 'compliant':
        return <Badge variant="success">Compliant</Badge>
      case 'over-licensed':
        return <Badge variant="warning">Over-licensed</Badge>
      case 'under-licensed':
        return <Badge variant="destructive">Under-licensed</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search software by name or vendor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Software Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Discovered Software ({filteredSoftware.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-slate-700">
                      Software
                      {sortField === 'name' && (sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('licensedQuantity')} className="flex items-center gap-1 hover:text-slate-700">
                      Licensed
                      {sortField === 'licensedQuantity' && (sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('installedQuantity')} className="flex items-center gap-1 hover:text-slate-700">
                      Installed
                      {sortField === 'installedQuantity' && (sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('activeUsers')} className="flex items-center gap-1 hover:text-slate-700">
                      Active Users
                      {sortField === 'activeUsers' && (sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Utilization</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Compliance</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Access</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredSoftware.map((software) => {
                  const utilizationRate = getUtilizationRate(software)
                  const usage = getUsageForSoftware(software.id)
                  const isExpanded = expandedRow === software.id
                  
                  return (
                    <React.Fragment key={software.id}>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-sm">{software.name}</p>
                            <p className="text-xs text-slate-500">{software.vendor} • v{software.version}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant="secondary">{software.category}</Badge>
                        </td>
                        <td className="px-4 py-4 text-sm">{software.licensedQuantity}</td>
                        <td className="px-4 py-4 text-sm">{software.installedQuantity}</td>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-slate-400" />
                            {software.activeUsers}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={utilizationRate} 
                              className="w-16 h-2" 
                              indicatorClassName={utilizationRate < 50 ? 'bg-amber-500' : 'bg-green-500'}
                            />
                            <span className="text-xs text-slate-500">{utilizationRate}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">{getComplianceBadge(software.complianceStatus)}</td>
                        <td className="px-4 py-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(software.lastAccessDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setExpandedRow(isExpanded ? null : software.id)}
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-slate-50 dark:bg-slate-800/30">
                          <td colSpan={9} className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4 text-blue-500" />
                                  License Details
                                </h4>
                                <div className="text-sm space-y-1">
                                  <p><span className="text-slate-500">Type:</span> {software.licenseType}</p>
                                  <p><span className="text-slate-500">Cost/License:</span> ${software.costPerLicense}/mo</p>
                                  <p><span className="text-slate-500">Renewal:</span> {software.renewalDate}</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm">Recent Users ({usage.length})</h4>
                                <div className="space-y-1">
                                  {usage.slice(0, 3).map(u => (
                                    <div key={u.userId} className="text-sm flex items-center justify-between">
                                      <span>{u.userName}</span>
                                      <span className="text-xs text-slate-500">{u.department}</span>
                                    </div>
                                  ))}
                                  {usage.length > 3 && (
                                    <p className="text-xs text-blue-500 cursor-pointer">+{usage.length - 3} more</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-end justify-end">
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Full Details
                                </Button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
