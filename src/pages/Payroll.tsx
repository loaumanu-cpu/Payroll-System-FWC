import { useState } from 'react'
import { Calendar, DollarSign, CheckCircle2, Clock, Download, Filter } from 'lucide-react'
import { format } from 'date-fns'

interface PayrollRecord {
  id: number
  employee: string
  period: string
  grossPay: string
  deductions: string
  netPay: string
  status: 'Completed' | 'Pending' | 'Processing'
  date: string
}

export default function Payroll() {
  const [payrolls] = useState<PayrollRecord[]>([
    {
      id: 1,
      employee: 'Sarah Johnson',
      period: 'Jan 1-15, 2024',
      grossPay: '$4,800',
      deductions: '$300',
      netPay: '$4,500',
      status: 'Completed',
      date: '2024-01-15',
    },
    {
      id: 2,
      employee: 'Michael Chen',
      period: 'Jan 1-15, 2024',
      grossPay: '$4,100',
      deductions: '$300',
      netPay: '$3,800',
      status: 'Completed',
      date: '2024-01-15',
    },
    {
      id: 3,
      employee: 'Emily Davis',
      period: 'Jan 1-15, 2024',
      grossPay: '$5,500',
      deductions: '$300',
      netPay: '$5,200',
      status: 'Pending',
      date: '2024-01-15',
    },
    {
      id: 4,
      employee: 'David Wilson',
      period: 'Jan 1-15, 2024',
      grossPay: '$4,400',
      deductions: '$300',
      netPay: '$4,100',
      status: 'Completed',
      date: '2024-01-15',
    },
  ])

  const stats = [
    { label: 'Total Payroll', value: '$17,600', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Completed', value: '3', icon: CheckCircle2, color: 'bg-blue-500' },
    { label: 'Pending', value: '1', icon: Clock, color: 'bg-orange-500' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll</h1>
          <p className="text-gray-600 mt-1">Process and manage employee payroll</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Process Payroll
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Payroll Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Payroll Records</h2>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrolls.map((payroll) => (
                <tr key={payroll.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payroll.employee}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payroll.period}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payroll.grossPay}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payroll.deductions}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{payroll.netPay}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      payroll.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : payroll.status === 'Pending'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {payroll.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(payroll.date), 'MMM dd, yyyy')}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

