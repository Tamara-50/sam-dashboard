"use client"

import React from 'react'
import { 
  Monitor, 
  Server, 
  Cloud, 
  Laptop, 
  Smartphone,
  Cpu,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  HardDrive
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'

// Mock data for computer inventory
const computersByType = [
  { name: 'Desktops', value: 1247, percentage: 45 },
  { name: 'Laptops', value: 698, percentage: 25 },
  { name: 'Servers', value: 384, percentage: 14 },
  { name: 'Virtual Machines', value: 276, percentage: 10 },
  { name: 'Virtual Servers', value: 110, percentage: 4 },
  { name: 'Mobile Devices', value: 58, percentage: 2 }
]

const operatingSystems = [
  { name: 'Windows 11', value: 1456, percentage: 52 },
  { name: 'Windows 10', value: 892, percentage: 32 },
  { name: 'Windows Server', value: 234, percentage: 8 },
  { name: 'macOS', value: 128, percentage: 5 },
  { name: 'Linux', value: 56, percentage: 2 },
  { name: 'Other', value: 7, percentage: 1 }
]

const inventoryStatus = [
  { name: 'Active', value: 2341, percentage: 84, color: '#10b981' },
  { name: 'Inactive', value: 276, percentage: 10, color: '#f59e0b' },
  { name: 'Retired', value: 134, percentage: 5, color: '#ef4444' },
  { name: 'Lost/Stolen', value: 22, percentage: 1, color: '#8b5cf6' }
]

const manufacturers = [
  { name: 'Dell', value: 892, percentage: 32 },
  { name: 'HP', value: 678, percentage: 24 },
  { name: 'Lenovo', value: 567, percentage: 20 },
  { name: 'Apple', value: 234, percentage: 8 },
  { name: 'Microsoft', value: 198, percentage: 7 },
  { name: 'Cisco', value: 134, percentage: 5 },
  { name: 'Other', value: 70, percentage: 4 }
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
        <p className="font-medium text-slate-900">{payload[0].name}</p>
        <p className="text-sm text-slate-600">
          Count: <span className="font-semibold">{payload[0].value.toLocaleString()}</span>
        </p>
        <p className="text-sm text-slate-600">
          Percentage: <span className="font-semibold">{payload[0].payload.percentage}%</span>
        </p>
      </div>
    )
  }
  return null
}

const renderCustomLabel = (entry: any) => {
  return `${entry.percentage}%`
}

const getComputerIcon = (type: string) => {
  switch (type) {
    case 'Desktops': return <Monitor className="h-4 w-4" />
    case 'Laptops': return <Laptop className="h-4 w-4" />
    case 'Servers': return <Server className="h-4 w-4" />
    case 'Virtual Machines': 
    case 'Virtual Servers': return <Cloud className="h-4 w-4" />
    case 'Mobile Devices': return <Smartphone className="h-4 w-4" />
    default: return <Monitor className="h-4 w-4" />
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Active': return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'Inactive': return <AlertTriangle className="h-4 w-4 text-amber-500" />
    case 'Retired': return <XCircle className="h-4 w-4 text-red-500" />
    case 'Lost/Stolen': return <XCircle className="h-4 w-4 text-purple-500" />
    default: return <Package className="h-4 w-4" />
  }
}

export function Computers() {
  const totalComputers = computersByType.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Monitor className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Computers</p>
                <p className="text-2xl font-bold">{totalComputers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Devices</p>
                <p className="text-2xl font-bold">{inventoryStatus[0].value.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Server className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Servers</p>
                <p className="text-2xl font-bold">{(computersByType[2].value + computersByType[4].value).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Cloud className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Virtual Assets</p>
                <p className="text-2xl font-bold">{(computersByType[3].value + computersByType[4].value).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Computers by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-blue-600" />
              Computers by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={computersByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {computersByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {computersByType.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    {getComputerIcon(item.name)}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-muted-foreground">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Operating Systems */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-green-600" />
              Installed Operating Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={operatingSystems}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {operatingSystems.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {operatingSystems.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-muted-foreground">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-600" />
              Inventory Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {inventoryStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {inventoryStatus.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    {getStatusIcon(item.name)}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-muted-foreground">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Computer Manufacturers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-purple-600" />
              Computer Manufacturers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={manufacturers}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {manufacturers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {manufacturers.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-muted-foreground">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
