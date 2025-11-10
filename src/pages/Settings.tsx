import { Save, Building2, DollarSign, Bell, Shield } from 'lucide-react'

export default function Settings() {
  const settingsSections = [
    {
      title: 'Company Information',
      icon: Building2,
      fields: [
        { label: 'Company Name', value: 'Acme Corporation', type: 'text' },
        { label: 'Tax ID', value: '12-3456789', type: 'text' },
        { label: 'Address', value: '123 Business St, City, State 12345', type: 'text' },
        { label: 'Phone', value: '+1 (555) 123-4567', type: 'tel' },
        { label: 'Email', value: 'contact@acme.com', type: 'email' },
      ],
    },
    {
      title: 'Payroll Settings',
      icon: DollarSign,
      fields: [
        { label: 'Pay Period', value: 'Bi-weekly', type: 'select', options: ['Weekly', 'Bi-weekly', 'Monthly'] },
        { label: 'Pay Day', value: 'Friday', type: 'select', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
        { label: 'Currency', value: 'USD', type: 'select', options: ['USD', 'EUR', 'GBP'] },
        { label: 'Default Tax Rate', value: '22%', type: 'text' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      fields: [
        { label: 'Email Notifications', value: 'true', type: 'checkbox' },
        { label: 'Payroll Reminders', value: 'true', type: 'checkbox' },
        { label: 'Report Generation', value: 'false', type: 'checkbox' },
        { label: 'Employee Updates', value: 'true', type: 'checkbox' },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      fields: [
        { label: 'Two-Factor Authentication', value: 'false', type: 'checkbox' },
        { label: 'Session Timeout', value: '30 minutes', type: 'select', options: ['15 minutes', '30 minutes', '1 hour', '2 hours'] },
        { label: 'Password Policy', value: 'Strong', type: 'select', options: ['Basic', 'Strong', 'Very Strong'] },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your payroll system settings</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section) => {
          const Icon = section.icon
          return (
            <div key={section.title} className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.fields.map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select className="input-field">
                        {field.options?.map((option) => (
                          <option key={option} selected={option === field.value}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox' ? (
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked={field.value === 'true'}
                          className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-600">Enable</span>
                      </label>
                    ) : (
                      <input
                        type={field.type}
                        defaultValue={field.value}
                        className="input-field"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Danger Zone */}
      <div className="card border-2 border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-red-900">Danger Zone</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Irreversible and destructive actions. Please proceed with caution.
        </p>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium transition-colors">
            Reset All Settings
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

