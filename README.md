# ZORVYN Finance Dashboard

A premium, interactive frontend implementation of the ZORVYN Financial Dashboard, built with React, Tailwind CSS, and Chart.js.

## Overview
This project meets requirements for building a clean, responsive, and interactive financial dashboard. It converts premium UI designs from the ZORVYN project into scalable React components with pixel-perfect accuracy.

## Features
- **Dashboard Overview**: Displays total balance, income, expenses, and implements dynamic Data visualizations including a linear gradient wealth trajectory and spending custom doughnut charts.
- **Transactions Management**: Includes a responsive table view with full functional **Search, Filter (Income vs Expense), Date, and Sorting logic** (High to low magnitude).
- **Role-Based UI control**: Features a toggleable frontend Context simulating **Viewer** vs **Admin** environments. Add/Edit operations and modals are cleanly hidden when in Viewer Mode without complex inline logic.
- **Transactions State**: Uses React Context to track transactions actively throughout the app. You can click on "Add Entry" logically submitting it via a premium glass-morphic modal state which will instantly update your local table.
- **Insights Generation**: Modular sections providing simple contextualized insights referencing current spending patterns.
- **Responsive Architecture**: Gracefully degrades complex table components into stacked cards mapping perfectly via Tailwind configuration on smaller devices.

## Tech Stack
- **React (Vite)**
- **Tailwind CSS v3** (Custom Mesh gradients, box shadows, and theming specific to the design)
- **Chart.js (`react-chartjs-2`)**
- **Vanilla Context API** (for Role simulation & Transaction states)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## Development Approach
- **Component Modularity**: Isolated logic into functional segments like `TransactionsHeader.jsx` handling inputs, `TransactionsTable.jsx` mapping elements securely, and `TransactionModal.jsx` handling forms.
- **Clean Structure**: Used `src/context/` for application layer state. Used `src/data/mockData.js` as the seed configuration database avoiding cluttered files.
- **High-Fidelity Matching**: Replaced baseline React structures exclusively adhering to the design criteria including Custom shadow rendering, specific Font variations (`Material Symbols Outlined`), and exact grid gaps maintaining CSS uniformity.
- **Graceful Fault Tolerance**: Created an `EmptyState.jsx` explicitly falling back cleanly visually validating if queries return blank lists.

---
*Developed for frontend UI assignment evaluation.*
