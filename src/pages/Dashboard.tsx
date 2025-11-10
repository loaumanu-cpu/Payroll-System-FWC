import { DollarSign, Users, FileText, TrendingUp, Calendar, Clock } from 'lucide-react'
import { format } from 'date-fns'

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Employees',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Monthly Payroll',
      value: '$124,500',
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Tasks',
      value: '8',
      change: '-3',
      trend: 'down',
      icon: FileText,
      color: 'bg-orange-500',
    },
    {
      title: 'Growth Rate',
      value: '24%',
      change: '+4%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ]

  const recentPayrolls = [
    { id: 1, employee: 'Sarah Johnson', amount: '$4,500', date: '2024-01-15', status: 'Completed' },
    { id: 2, employee: 'Michael Chen', amount: '$3,800', date: '2024-01-15', status: 'Completed' },
    { id: 3, employee: 'Emily Davis', amount: '$5,200', date: '2024-01-15', status: 'Pending' },
    { id: 4, employee: 'David Wilson', amount: '$4,100', date: '2024-01-14', status: 'Completed' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your payroll.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Payrolls */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Payroll</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentPayrolls.map((payroll) => (
              <div key={payroll.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{payroll.employee}</p>
                    <p className="text-sm text-gray-500">{format(new Date(payroll.date), 'MMM dd, yyyy')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{payroll.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    payroll.status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {payroll.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full btn-primary flex items-center justify-center gap-2">
              <DollarSign className="w-5 h-5" />
              Process Payroll
            </button>
            <button className="w-full btn-secondary flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Add Employee
            </button>
            <button className="w-full btn-secondary flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              Generate Report
            </button>
            <button className="w-full btn-secondary flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule Payroll
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Next Payroll</p>
                <p className="text-xs text-blue-700">January 31, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

