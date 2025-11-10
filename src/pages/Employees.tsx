import { useEffect, useMemo, useState } from 'react'
import { Plus, Search, MoreVertical, Edit, Trash2, Mail, Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from '../components/Modal'
import { loadFromStorage, saveToStorage } from '../lib/storage'

interface Employee {
  id: number
  name: string
  email: string
  phone: string
  department: string
  position: string
  salary: string
  status: 'Active' | 'Inactive'
}

const employeeSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone required'),
  department: z.string().min(1, 'Department required'),
  position: z.string().min(1, 'Position required'),
  salary: z.string().min(1, 'Salary required'),
  status: z.enum(['Active', 'Inactive']),
})

type EmployeeForm = z.infer<typeof employeeSchema>

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(
    loadFromStorage<Employee[]>('employees', [])
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    saveToStorage('employees', employees)
  }, [employees])

  const filteredEmployees = useMemo(() => employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  ), [employees, searchTerm])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      salary: '',
      status: 'Active',
    }
  })

  function openCreate() {
    setEditingEmployee(null)
    reset({
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      salary: '',
      status: 'Active',
    })
    setModalOpen(true)
  }

  function openEdit(emp: Employee) {
    setEditingEmployee(emp)
    reset({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      department: emp.department,
      position: emp.position,
      salary: emp.salary,
      status: emp.status,
    })
    setModalOpen(true)
  }

  function onSubmit(data: EmployeeForm) {
    if (editingEmployee) {
      setEmployees(prev => prev.map(e => e.id === editingEmployee.id ? { ...editingEmployee, ...data } : e))
    } else {
      const nextId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1
      setEmployees(prev => [...prev, { id: nextId, ...data }])
    }
    setModalOpen(false)
  }

  function deleteEmployee(id: number) {
    setEmployees(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">Manage your employee database</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Employee
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select className="input-field w-48">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>HR</option>
            <option>Finance</option>
          </select>
          <select className="input-field w-48">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          {employee.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {employee.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{employee.department}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{employee.position}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{employee.salary}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      employee.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(employee)} className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteEmployee(employee.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
          <span className="font-medium">{employees.length}</span> employees
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">
            1
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <div className="flex items-center justify-end gap-3">
            <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSubmit(onSubmit)}>Save</button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input className="input-field" {...register('name')} />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input className="input-field" type="email" {...register('email')} />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input className="input-field" {...register('phone')} />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input className="input-field" {...register('department')} />
            {errors.department && <p className="text-xs text-red-600 mt-1">{errors.department.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input className="input-field" {...register('position')} />
            {errors.position && <p className="text-xs text-red-600 mt-1">{errors.position.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input className="input-field" {...register('salary')} />
            {errors.salary && <p className="text-xs text-red-600 mt-1">{errors.salary.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="input-field" {...register('status')}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            {errors.status && <p className="text-xs text-red-600 mt-1">{errors.status.message}</p>}
          </div>
        </div>
      </Modal>
    </div>
  )
}

