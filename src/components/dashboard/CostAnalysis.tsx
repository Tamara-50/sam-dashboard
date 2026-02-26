"use client"

import React from 'react'
import { 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  softwareInventory, 
  licenseEntitlements,
  getUnderutilizedUsers,
  calculatePotentialSavings,
  getTotalLicenseCost
} from '@/data/mockData'

export function CostAnalysis() {
  const totalAnnualCost = getTotalLicenseCost()
  const monthlyAverage = totalAnnualCost / 12
  const underutilizedUsers = getUnderutilizedUsers()
  const monthlyPotentialSavings = calculatePotentialSavings()
  const annualPotentialSavings = monthlyPotentialSavings * 12

  const costByCategory = softwareInventory.reduce((acc, software) => {
    const annualCost = software.licensedQuantity * software.costPerLicense * 12
    acc[software.category] = (acc[software.category] || 0) + annualCost
    return acc
  }, {} as Record<string, number>)

  const costByVendor = softwareInventory.reduce((acc, software) => {
    const annualCost = software.licensedQuantity * software.costPerLicense * 12
    acc[software.vendor] = (acc[software.vendor] || 0) + annualCost
    return acc
  }, {} as Record<string, number>)

  const sortedCategories = Object.entries(costByCategory)
    .sort(([, a], [, b]) => b - a)
  
  const sortedVendors = Object.entries(costByVendor)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const categoryColors = [
    'bg-blue-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-orange-500',
    'bg-indigo-500'
  ]

  return (
    <div className="space-y-6">
      {/* Cost Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual License Cost</p>
                <p className="text-2xl font-bold">${(totalAnnualCost / 1000000).toFixed(2)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Average</p>
                <p className="text-2xl font-bold">${(monthlyAverage / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <TrendingDown className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Potential Savings</p>
                <p className="text-2xl font-bold text-green-600">${(annualPotentialSavings / 1000).toFixed(1)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <PieChart className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cost Per User</p>
                <p className="text-2xl font-bold">
                  ${Math.round(totalAnnualCost / softwareInventory.reduce((sum, s) => sum + s.activeUsers, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cost by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedCategories.map(([category, cost], index) => {
                const percentage = (cost / totalAnnualCost) * 100
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${categoryColors[index % categoryColors.length]}`} />
                        <span className="font-medium">{category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{percentage.toFixed(1)}%</span>
                        <span className="font-semibold">${(cost / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2" 
                      indicatorClassName={categoryColors[index % categoryColors.length]}
                    />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* By Vendor */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Vendors by Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedVendors.map(([vendor, cost], index) => {
                const percentage = (cost / totalAnnualCost) * 100
                return (
                  <div key={vendor} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {vendor.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{vendor}</p>
                        <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}% of total spend</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${(cost / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-muted-foreground">/year</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Underutilized Software Cost */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-green-500" />
            Underutilized Software - Reclamation Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Potential Annual Savings</p>
                <p className="text-3xl font-bold text-green-600">${(annualPotentialSavings / 1000).toFixed(1)}K</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Underutilized Licenses</p>
                <p className="text-3xl font-bold">{underutilizedUsers.length}</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Software</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Underutilized</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Cost/License</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Annual Waste</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {softwareInventory
                  .filter(s => {
                    const underutilized = underutilizedUsers.filter(u => u.softwareId === s.id)
                    return underutilized.length > 0
                  })
                  .map(software => {
                    const underutilized = underutilizedUsers.filter(u => u.softwareId === software.id)
                    const annualWaste = underutilized.length * software.costPerLicense * 12
                    return (
                      <tr key={software.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium">{software.name}</p>
                            <p className="text-xs text-muted-foreground">{software.vendor}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                            {underutilized.length} licenses
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm">${software.costPerLicense}/mo</td>
                        <td className="px-4 py-4">
                          <span className="font-semibold text-red-600">${annualWaste.toLocaleString()}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1 text-red-500">
                            <ArrowUpRight className="h-4 w-4" />
                            <span className="text-sm">+{Math.round(Math.random() * 10 + 5)}%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cost Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Monthly Cost Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[
              { month: 'Sep', value: 142000 },
              { month: 'Oct', value: 148000 },
              { month: 'Nov', value: 145000 },
              { month: 'Dec', value: 152000 },
              { month: 'Jan', value: 158000 },
              { month: 'Feb', value: monthlyAverage },
            ].map((item, index) => {
              const maxValue = 180000
              const height = (item.value / maxValue) * 200
              const isCurrentMonth = index === 5
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className={`w-full rounded-t-lg transition-all ${
                      isCurrentMonth ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                    style={{ height: `${height}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                  <span className={`text-sm font-medium ${isCurrentMonth ? 'text-blue-600' : ''}`}>
                    ${(item.value / 1000).toFixed(0)}K
                  </span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-red-500" />
              <span className="text-muted-foreground">YoY Change:</span>
              <span className="font-medium text-red-500">+8.2%</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowDownRight className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">After Optimization:</span>
              <span className="font-medium text-green-500">-${(annualPotentialSavings / 12 / 1000).toFixed(1)}K/mo</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
