# Payroll Management System

A modern, responsive payroll management system built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 **Dashboard** - Overview of key metrics and recent payroll activities
- 👥 **Employee Management** - Complete employee database with search and filtering
- 💰 **Payroll Processing** - Process and manage employee payroll
- 📈 **Reports** - Generate and download various payroll reports
- ⚙️ **Settings** - Configure company and system settings

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **date-fns** - Date formatting

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/     # Reusable components (Layout, Sidebar, Header)
├── pages/         # Page components (Dashboard, Employees, etc.)
├── App.tsx        # Main app component with routing
├── main.tsx       # Entry point
└── index.css      # Global styles
```

## Features Overview

### Dashboard
- Key metrics and statistics
- Recent payroll activities
- Quick action buttons
- Next payroll schedule

### Employees
- Employee list with search and filters
- Employee details (name, email, phone, department, position, salary)
- Add, edit, and delete functionality
- Status indicators

### Payroll
- Payroll processing interface
- Payroll records table
- Status tracking (Completed, Pending, Processing)
- Export functionality

### Reports
- Multiple report types
- Custom report generator
- Recent reports list
- Export in various formats (PDF, Excel, CSV)

### Settings
- Company information
- Payroll settings
- Notification preferences
- Security settings

## Customization

The design uses a primary color scheme that can be customized in `tailwind.config.js`. The color palette is defined under the `primary` key.

## License

MIT

