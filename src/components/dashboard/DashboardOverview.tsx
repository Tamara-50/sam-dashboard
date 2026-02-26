"use client"

import React from 'react'
import { 
  Package, 
  FileCheck, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Clock,
  Users
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  softwareInventory, 
  getComplianceSummary, 
  getTotalLicenseCost,
  getUnderutilizedUsers,
  calculatePotentialSavings
} from '@/data/mockData'

export function DashboardOverview() {
  const compliance = getComplianceSummary()
  const totalCost = getTotalLicenseCost()
  const underutilized = getUnderutilizedUsers()
  const potentialSavings = calculatePotentialSavings()
  
  const totalLicenses = softwareInventory.reduce((sum, s) => sum + s.licensedQuantity, 0)
  const activeUsers = softwareInventory.reduce((sum, s) => sum + s.activeUsers, 0)
  const utilizationRate = Math.round((activeUsers / totalLicenses) * 100)

  const stats = [
    {
      title: 'Total Software Titles',
      value: softwareInventory.length,
      icon: Package,
      change: '+2 this month',
      trend: 'up',
      color: 'blue'
    },
    {
      title: 'License Compliance',
      value: `${Math.round((compliance.compliant / compliance.total) * 100)}%`,
      icon: FileCheck,
      change: `${compliance.underLicensed} under-licensed`,
      trend: compliance.underLicensed > 0 ? 'down' : 'up',
      color: compliance.underLicensed > 0 ? 'amber' : 'green'
    },
    {
      title: 'Annual License Cost',
      value: `$${(totalCost / 1000).toFixed(0)}K`,
      icon: DollarSign,
      change: `$${(potentialSavings * 12 / 1000).toFixed(1)}K potential savings`,
      trend: 'neutral',
      color: 'emerald'
    },
    {
      title: 'Underutilized Licenses',
      value: underutilized.length,
      icon: Clock,
      change: '60+ days inactive',
      trend: 'down',
      color: 'red'
    }
  ]

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-600',
    green: 'bg-green-500/10 text-green-600',
    amber: 'bg-amber-500/10 text-amber-600',
    emerald: 'bg-emerald-500/10 text-emerald-600',
    red: 'bg-red-500/10 text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2 text-xs">
                      {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500 mr-1" />}
                      {stat.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500 mr-1" />}
                      <span className="text-muted-foreground">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Compliance & Utilization Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Compliant</span>
              <div className="flex items-center gap-2">
                <Progress value={(compliance.compliant / compliance.total) * 100} className="w-32" indicatorClassName="bg-green-500" />
                <Badge variant="success">{compliance.compliant}</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Over-licensed</span>
              <div className="flex items-center gap-2">
                <Progress value={(compliance.overLicensed / compliance.total) * 100} className="w-32" indicatorClassName="bg-amber-500" />
                <Badge variant="warning">{compliance.overLicensed}</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Under-licensed</span>
              <div className="flex items-center gap-2">
                <Progress value={(compliance.underLicensed / compliance.total) * 100} className="w-32" indicatorClassName="bg-red-500" />
                <Badge variant="destructive">{compliance.underLicensed}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* License Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              License Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-slate-200 dark:text-slate-700"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${utilizationRate * 4.4} 440`}
                    className="text-blue-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{utilizationRate}%</span>
                  <span className="text-xs text-muted-foreground">Utilized</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{activeUsers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-600">{totalLicenses.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Licenses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Software by Cost */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Software by Annual Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {softwareInventory
              .sort((a, b) => (b.licensedQuantity * b.costPerLicense) - (a.licensedQuantity * a.costPerLicense))
              .slice(0, 5)
              .map((software) => {
                const annualCost = software.licensedQuantity * software.costPerLicense * 12
                const maxCost = softwareInventory[0].licensedQuantity * softwareInventory[0].costPerLicense * 12
                const percentage = (annualCost / maxCost) * 100
                
                return (
                  <div key={software.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Package className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{software.name}</p>
                          <p className="text-xs text-muted-foreground">{software.vendor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(annualCost / 1000).toFixed(1)}K</p>
                        <p className="text-xs text-muted-foreground">{software.licensedQuantity} licenses</p>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-1.5" />
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
