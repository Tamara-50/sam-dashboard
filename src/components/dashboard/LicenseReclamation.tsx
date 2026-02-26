"use client"

import React, { useState } from 'react'
import { 
  Recycle, 
  Clock,
  User,
  Mail,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Send,
  Filter,
  Download,
  ChevronRight,
  ChevronDown,
  ArrowLeft
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  softwareInventory, 
  usageRecords,
  getUnderutilizedUsers,
  calculatePotentialSavings
} from '@/data/mockData'

type ReclamationStatus = 'pending' | 'notified' | 'reclaimed' | 'retained'

interface ReclamationCandidate {
  userId: string
  userName: string
  department: string
  softwareId: string
  softwareName: string
  daysInactive: number
  lastAccess: string
  costPerMonth: number
  status: ReclamationStatus
  deviceName: string
}

export function LicenseReclamation() {
  const underutilizedUsers = getUnderutilizedUsers()
  const monthlyPotentialSavings = calculatePotentialSavings()
  
  const [candidates, setCandidates] = useState<ReclamationCandidate[]>(() => {
    return underutilizedUsers.map(user => {
      const software = softwareInventory.find(s => s.id === user.softwareId)
      return {
        userId: user.userId,
        userName: user.userName,
        department: user.department,
        softwareId: user.softwareId,
        softwareName: software?.name || 'Unknown',
        daysInactive: user.daysInactive,
        lastAccess: user.lastAccess,
        costPerMonth: software?.costPerLicense || 0,
        status: 'pending' as ReclamationStatus,
        deviceName: user.deviceName
      }
    })
  })

  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState<ReclamationStatus | 'all'>('all')
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'tiles' | 'detail'>('tiles')

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([])
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.userId))
    }
  }

  const handleSelectCandidate = (userId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSendNotification = () => {
    setCandidates(prev => 
      prev.map(c => 
        selectedCandidates.includes(c.userId) && c.status === 'pending'
          ? { ...c, status: 'notified' as ReclamationStatus }
          : c
      )
    )
    setSelectedCandidates([])
  }

  const handleReclaimLicenses = () => {
    setCandidates(prev => 
      prev.map(c => 
        selectedCandidates.includes(c.userId) && (c.status === 'pending' || c.status === 'notified')
          ? { ...c, status: 'reclaimed' as ReclamationStatus }
          : c
      )
    )
    setSelectedCandidates([])
  }

  const handleSelectSoftware = (softwareId: string) => {
    setSelectedSoftware(softwareId)
    setViewMode('detail')
    setSelectedCandidates([])
  }

  const handleBackToTiles = () => {
    setSelectedSoftware(null)
    setViewMode('tiles')
    setSelectedCandidates([])
  }

  const filteredCandidates = candidates.filter(c => 
    filterStatus === 'all' || c.status === filterStatus
  )

  // Group candidates by software for tile view
  const candidatesBySoftware = filteredCandidates.reduce((acc, candidate) => {
    if (!acc[candidate.softwareId]) {
      acc[candidate.softwareId] = {
        softwareId: candidate.softwareId,
        softwareName: candidate.softwareName,
        candidates: [],
        totalCostPerMonth: 0,
        statusCounts: { pending: 0, notified: 0, reclaimed: 0, retained: 0 }
      }
    }
    acc[candidate.softwareId].candidates.push(candidate)
    acc[candidate.softwareId].totalCostPerMonth += candidate.costPerMonth
    acc[candidate.softwareId].statusCounts[candidate.status]++
    return acc
  }, {} as Record<string, {
    softwareId: string
    softwareName: string
    candidates: ReclamationCandidate[]
    totalCostPerMonth: number
    statusCounts: Record<ReclamationStatus, number>
  }>)

  const selectedSoftwareData = selectedSoftware ? candidatesBySoftware[selectedSoftware] : null

  const statusCounts = {
    pending: candidates.filter(c => c.status === 'pending').length,
    notified: candidates.filter(c => c.status === 'notified').length,
    reclaimed: candidates.filter(c => c.status === 'reclaimed').length,
    retained: candidates.filter(c => c.status === 'retained').length,
  }

  const reclaimedSavings = candidates
    .filter(c => c.status === 'reclaimed')
    .reduce((sum, c) => sum + c.costPerMonth, 0) * 12

  const getStatusBadge = (status: ReclamationStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>
      case 'notified':
        return <Badge variant="warning">User Notified</Badge>
      case 'reclaimed':
        return <Badge variant="success">Reclaimed</Badge>
      case 'retained':
        return <Badge variant="outline">Retained</Badge>
    }
  }

  const getInactivityBadge = (days: number) => {
    if (days >= 120) return <Badge variant="destructive">{days} days</Badge>
    if (days >= 90) return <Badge variant="warning">{days} days</Badge>
    return <Badge variant="secondary">{days} days</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">{statusCounts.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Users Notified</p>
                <p className="text-2xl font-bold">{statusCounts.notified}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Recycle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Licenses Reclaimed</p>
                <p className="text-2xl font-bold">{statusCounts.reclaimed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Savings</p>
                <p className="text-2xl font-bold text-green-600">${reclaimedSavings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reclamation Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reclamation Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Progress toward annual savings goal</span>
              <span className="font-medium">${reclaimedSavings.toLocaleString()} / ${(monthlyPotentialSavings * 12).toLocaleString()}</span>
            </div>
            <Progress 
              value={(reclaimedSavings / (monthlyPotentialSavings * 12)) * 100} 
              className="h-3"
              indicatorClassName="bg-green-500"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{Math.round((reclaimedSavings / (monthlyPotentialSavings * 12)) * 100)}% complete</span>
              <span>${((monthlyPotentialSavings * 12) - reclaimedSavings).toLocaleString()} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content - Tiles or Detail View */}
      {viewMode === 'tiles' ? (
        <>
          {/* Actions Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as ReclamationStatus | 'all')}
                    className="px-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending Review</option>
                    <option value="notified">User Notified</option>
                    <option value="reclaimed">Reclaimed</option>
                    <option value="retained">Retained</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Software Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(candidatesBySoftware).map((software) => {
              const totalUsers = software.candidates.length
              const annualSavings = software.totalCostPerMonth * 12
              const avgDaysInactive = Math.round(
                software.candidates.reduce((sum, c) => sum + c.daysInactive, 0) / totalUsers
              )
              
              return (
                <Card key={software.softwareId} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{software.softwareName}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {totalUsers} underutilized license{totalUsers !== 1 ? 's' : ''} - 60+ Days Inactive
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSelectSoftware(software.softwareId)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Status Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30">
                        <p className="text-2xl font-bold text-amber-600">{software.statusCounts.pending}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                        <p className="text-2xl font-bold text-blue-600">{software.statusCounts.notified}</p>
                        <p className="text-xs text-muted-foreground">Notified</p>
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Avg. Inactive:</span>
                        <span className="font-medium">{avgDaysInactive} days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Monthly Cost:</span>
                        <span className="font-medium">${software.totalCostPerMonth.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Annual Savings:</span>
                        <span className="font-bold text-green-600">${annualSavings.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Reclamation Progress</span>
                        <span>{Math.round((software.statusCounts.reclaimed / totalUsers) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(software.statusCounts.reclaimed / totalUsers) * 100} 
                        className="h-2"
                        indicatorClassName="bg-green-500"
                      />
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full" 
                      onClick={() => handleSelectSoftware(software.softwareId)}
                    >
                      View Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      ) : (
        /* Detail View */
        <>
          {selectedSoftwareData && (
            <>
              {/* Detail Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleBackToTiles}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Tiles
                    </Button>
                    <div className="h-6 w-px bg-slate-300 dark:bg-slate-600" />
                    <div>
                      <CardTitle className="text-xl">{selectedSoftwareData.softwareName}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedSoftwareData.candidates.length} underutilized licenses
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Detail Actions Bar */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedCandidates.length} selected
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={selectedCandidates.length === 0}
                        onClick={() => {
                          setCandidates(prev => 
                            prev.map(c => 
                              selectedCandidates.includes(c.userId) && c.status === 'pending'
                                ? { ...c, status: 'notified' as ReclamationStatus }
                                : c
                            )
                          )
                          setSelectedCandidates([])
                        }}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Notification
                      </Button>
                      <Button 
                        size="sm"
                        disabled={selectedCandidates.length === 0}
                        onClick={() => {
                          setCandidates(prev => 
                            prev.map(c => 
                              selectedCandidates.includes(c.userId) && (c.status === 'pending' || c.status === 'notified')
                                ? { ...c, status: 'reclaimed' as ReclamationStatus }
                                : c
                            )
                          )
                          setSelectedCandidates([])
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Recycle className="h-4 w-4 mr-2" />
                        Reclaim Licenses
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Detail Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Underutilized Licenses - 60+ Days Inactive
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="px-4 py-3 text-left">
                            <input
                              type="checkbox"
                              checked={selectedCandidates.length === selectedSoftwareData.candidates.length && selectedSoftwareData.candidates.length > 0}
                              onChange={() => {
                                if (selectedCandidates.length === selectedSoftwareData.candidates.length) {
                                  setSelectedCandidates([])
                                } else {
                                  setSelectedCandidates(selectedSoftwareData.candidates.map(c => c.userId))
                                }
                              }}
                              className="rounded border-slate-300"
                            />
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">User</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Days Inactive</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Last Access</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Monthly Cost</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {selectedSoftwareData.candidates.map((candidate) => (
                          <tr key={candidate.userId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-4">
                              <input
                                type="checkbox"
                                checked={selectedCandidates.includes(candidate.userId)}
                                onChange={() => {
                                  setSelectedCandidates(prev => 
                                    prev.includes(candidate.userId) 
                                      ? prev.filter(id => id !== candidate.userId)
                                      : [...prev, candidate.userId]
                                  )
                                }}
                                className="rounded border-slate-300"
                                disabled={candidate.status === 'reclaimed' || candidate.status === 'retained'}
                              />
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                  <User className="h-4 w-4 text-slate-500" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{candidate.userName}</p>
                                  <p className="text-xs text-muted-foreground">{candidate.department}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              {getInactivityBadge(candidate.daysInactive)}
                            </td>
                            <td className="px-4 py-4 text-sm text-muted-foreground">
                              {new Date(candidate.lastAccess).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-4">
                              <span className="font-semibold">${candidate.costPerMonth}</span>
                              <span className="text-xs text-muted-foreground">/mo</span>
                            </td>
                            <td className="px-4 py-4">
                              {getStatusBadge(candidate.status)}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1">
                                {candidate.status === 'pending' && (
                                  <>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => {
                                        setCandidates(prev => 
                                          prev.map(c => c.userId === candidate.userId ? { ...c, status: 'notified' } : c)
                                        )
                                      }}
                                    >
                                      <Mail className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-green-600"
                                      onClick={() => {
                                        setCandidates(prev => 
                                          prev.map(c => c.userId === candidate.userId ? { ...c, status: 'reclaimed' } : c)
                                        )
                                      }}
                                    >
                                      <Recycle className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                                {candidate.status === 'notified' && (
                                  <>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-green-600"
                                      onClick={() => {
                                        setCandidates(prev => 
                                          prev.map(c => c.userId === candidate.userId ? { ...c, status: 'reclaimed' } : c)
                                        )
                                      }}
                                    >
                                      <Recycle className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => {
                                        setCandidates(prev => 
                                          prev.map(c => c.userId === candidate.userId ? { ...c, status: 'retained' } : c)
                                        )
                                      }}
                                    >
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                                {(candidate.status === 'reclaimed' || candidate.status === 'retained') && (
                                  <span className="text-xs text-muted-foreground">—</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  )
}
