"use client"

import React, { useState } from 'react'
import { 
  FileText, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Building2,
  Search
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { licenseEntitlements, softwareInventory } from '@/data/mockData'

export function LicenseEntitlements() {
  const [searchTerm, setSearchTerm] = useState('')

  const getExpirationStatus = (expirationDate: string) => {
    const today = new Date()
    const expDate = new Date(expirationDate)
    const daysUntilExpiration = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiration < 0) return { status: 'expired', label: 'Expired', variant: 'destructive' as const }
    if (daysUntilExpiration <= 30) return { status: 'critical', label: `${daysUntilExpiration} days`, variant: 'destructive' as const }
    if (daysUntilExpiration <= 90) return { status: 'warning', label: `${daysUntilExpiration} days`, variant: 'warning' as const }
    return { status: 'ok', label: `${daysUntilExpiration} days`, variant: 'success' as const }
  }

  const getSoftwareName = (softwareId: string) => {
    return softwareInventory.find(s => s.id === softwareId)?.name || 'Unknown'
  }

  const filteredEntitlements = licenseEntitlements.filter(ent => {
    const softwareName = getSoftwareName(ent.softwareId)
    return softwareName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ent.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ent.agreementNumber.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const totalValue = licenseEntitlements.reduce((sum, ent) => sum + ent.totalCost, 0)
  const expiringWithin90Days = licenseEntitlements.filter(ent => {
    const status = getExpirationStatus(ent.expirationDate)
    return status.status === 'warning' || status.status === 'critical'
  }).length

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Agreements</p>
                <p className="text-2xl font-bold">{licenseEntitlements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${(totalValue / 1000000).toFixed(2)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold">{expiringWithin90Days}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vendors</p>
                <p className="text-2xl font-bold">{new Set(licenseEntitlements.map(e => e.vendor)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by software, vendor, or agreement number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Entitlements List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredEntitlements.map((entitlement) => {
          const expirationInfo = getExpirationStatus(entitlement.expirationDate)
          const softwareName = getSoftwareName(entitlement.softwareId)
          
          return (
            <Card key={entitlement.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{softwareName}</h3>
                    <p className="text-sm text-muted-foreground">{entitlement.vendor}</p>
                  </div>
                  <Badge variant={expirationInfo.variant}>
                    {expirationInfo.status === 'expired' ? 'Expired' : `Expires: ${expirationInfo.label}`}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span className="text-muted-foreground">Agreement:</span>
                      <span className="font-medium">{entitlement.agreementNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-muted-foreground">Purchased:</span>
                      <span>{new Date(entitlement.purchaseDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-slate-400" />
                      <span className="text-muted-foreground">Total Cost:</span>
                      <span className="font-medium">${entitlement.totalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {entitlement.maintenanceIncluded ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                      <span className="text-muted-foreground">Maintenance:</span>
                      <span>{entitlement.maintenanceIncluded ? 'Included' : 'Not Included'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{entitlement.quantity}</p>
                      <p className="text-xs text-muted-foreground">Licenses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">${entitlement.costPerUnit}</p>
                      <p className="text-xs text-muted-foreground">Per Unit/Mo</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
