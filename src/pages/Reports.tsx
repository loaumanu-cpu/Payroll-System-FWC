import { Download, FileText, TrendingUp, Calendar, BarChart3 } from 'lucide-react'

export default function Reports() {
  const reportTypes = [
    {
      title: 'Payroll Summary',
      description: 'Overview of all payroll transactions',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Tax Reports',
      description: 'Tax deductions and filings',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Employee Reports',
      description: 'Employee salary and benefits',
      icon: BarChart3,
      color: 'bg-purple-500',
    },
    {
      title: 'Monthly Reports',
      description: 'Monthly payroll summaries',
      icon: Calendar,
      color: 'bg-orange-500',
    },
  ]

  const recentReports = [
    { id: 1, name: 'Payroll Summary - January 2024', date: '2024-01-31', type: 'PDF', size: '2.4 MB' },
    { id: 2, name: 'Tax Report - Q4 2023', date: '2024-01-15', type: 'PDF', size: '1.8 MB' },
    { id: 3, name: 'Employee Benefits Report', date: '2024-01-10', type: 'Excel', size: '3.2 MB' },
    { id: 4, name: 'Payroll Summary - December 2023', date: '2023-12-31', type: 'PDF', size: '2.1 MB' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and download payroll reports</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export All
        </button>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon
          return (
            <div key={report.title} className="card hover:shadow-md transition-shadow cursor-pointer">
              <div className={`${report.color} p-4 rounded-lg w-fit mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Generate Report →
              </button>
            </div>
          )
        })}
      </div>

      {/* Recent Reports */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">{report.date}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{report.type}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{report.size}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Report Generator */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Generate Custom Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="input-field">
              <option>Payroll Summary</option>
              <option>Tax Report</option>
              <option>Employee Report</option>
              <option>Benefits Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select className="input-field">
              <option>Last Month</option>
              <option>Last Quarter</option>
              <option>Last Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select className="input-field">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select className="input-field">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Sales</option>
              <option>HR</option>
              <option>Finance</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button className="btn-primary">Generate Report</button>
        </div>
      </div>
    </div>
  )
}

