"use client"

import React from 'react'
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  TrendingDown,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { softwareInventory, getComplianceSummary } from '@/data/mockData'

export function CompliancePosition() {
  const compliance = getComplianceSummary()
  const complianceRate = Math.round((compliance.compliant / compliance.total) * 100)

  const underLicensedSoftware = softwareInventory.filter(s => s.complianceStatus === 'under-licensed')
  const overLicensedSoftware = softwareInventory.filter(s => s.complianceStatus === 'over-licensed')

  const calculateRisk = (software: typeof softwareInventory[0]) => {
    const gap = software.installedQuantity - software.licensedQuantity
    const riskScore = (gap / software.licensedQuantity) * 100
    if (riskScore > 30) return { level: 'high', color: 'red' }
    if (riskScore > 15) return { level: 'medium', color: 'amber' }
    return { level: 'low', color: 'yellow' }
  }

  return (
    <div className="space-y-6">
      {/* Compliance Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Overall Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="none"
                    className="text-slate-200 dark:text-slate-700"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${complianceRate * 5.53} 553`}
                    className={complianceRate >= 90 ? 'text-green-500' : complianceRate >= 70 ? 'text-amber-500' : 'text-red-500'}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{complianceRate}%</span>
                  <span className="text-sm text-muted-foreground">Compliant</span>
                </div>
              </div>
              <div className="mt-6 w-full space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Compliant</span>
                  </div>
                  <span className="font-medium">{compliance.compliant}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>Over-licensed</span>
                  </div>
                  <span className="font-medium">{compliance.overLicensed}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Under-licensed</span>
                  </div>
                  <span className="font-medium">{compliance.underLicensed}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Under-Licensed Software - Optimization Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            {underLicensedSoftware.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
                <p className="text-lg font-medium">All Clear!</p>
                <p className="text-sm text-muted-foreground">No under-licensed software detected</p>
              </div>
            ) : (
              <div className="space-y-4">
                {underLicensedSoftware.map((software) => {
                  const gap = software.installedQuantity - software.licensedQuantity
                  const risk = calculateRisk(software)
                  const annualRiskCost = gap * software.costPerLicense * 12
                  
                  return (
                    <div key={software.id} className="p-4 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{software.name}</h4>
                          <p className="text-sm text-muted-foreground">{software.vendor}</p>
                        </div>
                        <Badge variant="destructive" className="uppercase text-xs">
                          {risk.level} risk
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Licensed</p>
                          <p className="text-lg font-semibold">{software.licensedQuantity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Installed</p>
                          <p className="text-lg font-semibold text-red-600">{software.installedQuantity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Gap</p>
                          <p className="text-lg font-semibold text-red-600">+{gap}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-red-200 dark:border-red-800">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Estimated Annual Risk: </span>
                          <span className="font-semibold text-red-600">${annualRiskCost.toLocaleString()}</span>
                        </div>
                        <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                          Purchase Licenses
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Over-Licensed Software */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-amber-500" />
            Over-Licensed Software - Optimization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {overLicensedSoftware.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
              <p className="text-lg font-medium">Optimized!</p>
              <p className="text-sm text-muted-foreground">No over-licensed software detected</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {overLicensedSoftware.map((software) => {
                const unusedLicenses = software.licensedQuantity - software.activeUsers
                const potentialSavings = unusedLicenses * software.costPerLicense * 12
                const utilizationRate = Math.round((software.activeUsers / software.licensedQuantity) * 100)
                
                return (
                  <div key={software.id} className="p-4 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{software.name}</h4>
                        <p className="text-sm text-muted-foreground">{software.vendor}</p>
                      </div>
                      <Badge variant="warning" className="text-xs">
                        {utilizationRate}% used
                      </Badge>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Licensed:</span>
                        <span className="font-medium">{software.licensedQuantity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Active Users:</span>
                        <span className="font-medium">{software.activeUsers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Unused:</span>
                        <span className="font-medium text-amber-600">{unusedLicenses}</span>
                      </div>
                    </div>
                    <Progress value={utilizationRate} className="h-2 mb-3" indicatorClassName="bg-amber-500" />
                    <div className="pt-3 border-t border-amber-200 dark:border-amber-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Potential Savings</p>
                          <p className="text-lg font-bold text-green-600">${(potentialSavings / 1000).toFixed(1)}K/yr</p>
                        </div>
                        <Button size="sm" variant="outline" className="border-amber-300 text-amber-600 hover:bg-amber-100">
                          Optimize
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compliance Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Compliance Trend (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {[
              { month: 'Sep', value: 78 },
              { month: 'Oct', value: 82 },
              { month: 'Nov', value: 85 },
              { month: 'Dec', value: 83 },
              { month: 'Jan', value: 88 },
              { month: 'Feb', value: complianceRate },
            ].map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full rounded-t-lg transition-all ${
                    item.value >= 90 ? 'bg-green-500' : item.value >= 80 ? 'bg-blue-500' : 'bg-amber-500'
                  }`}
                  style={{ height: `${item.value * 2}px` }}
                />
                <span className="text-xs text-muted-foreground">{item.month}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
