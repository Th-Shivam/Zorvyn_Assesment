export const dashboardData = {
  user: {
    name: "Shivam Singh",
    tier: "Premium Tier",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhTarRJSd86cCR7YQ5qhwJPnuP0Hg8-YKgwnCFEoJ8yaiWp0_J93vDTnGoe9-6e3zDQWrp44ClymPR0i3YoJoMJi-mOeFnPUiRwwfRRYrMjArKOrHp8LlXcsQkJZkjWch4pKTJO6lcbXEuNkwTQzhKjOGpxaJHTTC9PmNXlctg07rZcOE5c8oH9fRc_zQbOUcnLhoZQEt3TmynhWnHNVD5uTFrwVamzKDX7_Cq5iBzqkUQjY8TxdadSMDdQQ9K6hljfelk8lMLqOk"
  },
  metrics: {
    balance: {
      amount: "4,28,500",
      decimals: ".00",
      change: "+14.2%",
      milestone: {
        percent: "72",
        goal: "₹6,00,000"
      }
    },
    income: {
      amount: "84,200",
      todayChange: "+₹12.4k today",
      budgetAvg: "₹72,000"
    },
    spend: {
      amount: "32,150",
      budgetDiff: "2.4% vs budget",
      prevMonth: "₹28,400"
    }
  },
  charts: {
    balanceTrend: {
      dates: ["01 May", "14 May", "28 May"],
      data: [350000, 310000, 360000, 330000, 394200, 370000, 428500] // sample spline
    },
    spendingByCategory: {
      total: "₹32k",
      categories: [
        { name: "Shopping", percentage: 45, color: "#4f46e5" },
        { name: "Bills & Rent", percentage: 30, color: "#005338" },
        { name: "Travel", percentage: 15, color: "#ba1a1a" }
      ]
    }
  },
  insights: [
    {
      id: 1,
      type: "warning",
      icon: "restaurant",
      title: "Spending Spike",
      description: "Your dining expenses are <span class='font-bold text-slate-600'>15% higher</span> than your 3-month average."
    },
    {
      id: 2,
      type: "alert",
      icon: "electric_bolt",
      title: "Subscription Alert",
      description: "Unused <span class='font-bold text-slate-600'>Adobe Creative</span> billing detected. Cancel to save ₹2,400."
    },
    {
      id: 3,
      type: "reward",
      icon: "savings",
      title: "Efficiency Reward",
      description: "You've hit your weekly goal! We recommend a <span class='font-bold text-slate-600'>₹5,000 auto-invest</span>."
    }
  ],
  transactions: [
    {
      id: 1,
      merchant: "Apple Store",
      category: "Electronics • MacBook M3 Pro",
      date: "14 May, 2024",
      amount: "-₹1,24,900",
      icon: "laptop_mac",
      isPositive: false
    },
    {
      id: 2,
      merchant: "Acme Corp Inc.",
      category: "Salary • Performance Bonus",
      date: "12 May, 2024",
      amount: "+₹82,000",
      icon: "wallet",
      isPositive: true
    },
    {
      id: 3,
      merchant: "Tata Power",
      category: "Utility • Home Electricity",
      date: "10 May, 2024",
      amount: "-₹4,250",
      icon: "bolt",
      isPositive: false
    },
    {
      id: 4,
      merchant: "Indigo Airways",
      category: "Travel \u2022 BOM-DXB Route",
      date: "08 May, 2024",
      amount: "-\u20b912,400",
      icon: "flight_takeoff",
      isPositive: false
    }
  ],
  premiumTransactions: [
    {
      id: 1,
      categoryName: "Salary",
      merchant: "Zorvyn Technologies Pvt. Ltd.",
      subCategory: "Monthly Compensation",
      date: "2026-04-01",
      amount: 185000,
      type: "Income",
      icon: "payments",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      id: 2,
      categoryName: "Investments",
      merchant: "Nippon India Mutual Fund",
      subCategory: "STP Redemption",
      date: "2026-04-03",
      amount: 22000,
      type: "Income",
      icon: "monitoring",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      id: 3,
      categoryName: "Shopping",
      merchant: "Apple Store - AirPods Pro",
      subCategory: "Accessories",
      date: "2026-04-04",
      amount: 24900,
      type: "Expense",
      icon: "shopping_bag",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      id: 4,
      categoryName: "Dining",
      merchant: "Third Wave Coffee",
      subCategory: "Client Meeting",
      date: "2026-04-05",
      amount: 1850,
      type: "Expense",
      icon: "restaurant",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      id: 5,
      categoryName: "Utilities",
      merchant: "BESCOM Electricity",
      subCategory: "Home Utilities",
      date: "2026-04-06",
      amount: 4620,
      type: "Expense",
      icon: "bolt",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      id: 6,
      categoryName: "Travel",
      merchant: "Uber Intercity",
      subCategory: "Airport Transfer",
      date: "2026-03-21",
      amount: 2850,
      type: "Expense",
      icon: "flight",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: 7,
      categoryName: "Salary",
      merchant: "Zorvyn Technologies Pvt. Ltd.",
      subCategory: "Monthly Compensation",
      date: "2026-03-01",
      amount: 180000,
      type: "Income",
      icon: "payments",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      id: 8,
      categoryName: "Entertainment",
      merchant: "BookMyShow",
      subCategory: "Weekend Plans",
      date: "2026-03-10",
      amount: 3200,
      type: "Expense",
      icon: "movie",
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600"
    },
    {
      id: 9,
      categoryName: "Dining",
      merchant: "Olive Beach",
      subCategory: "Dinner",
      date: "2026-03-14",
      amount: 5400,
      type: "Expense",
      icon: "restaurant",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      id: 10,
      categoryName: "Utilities",
      merchant: "Airtel Broadband",
      subCategory: "Internet Bill",
      date: "2026-02-18",
      amount: 1499,
      type: "Expense",
      icon: "bolt",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      id: 11,
      categoryName: "Salary",
      merchant: "Zorvyn Technologies Pvt. Ltd.",
      subCategory: "Monthly Compensation",
      date: "2026-02-01",
      amount: 178000,
      type: "Income",
      icon: "payments",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      id: 12,
      categoryName: "Shopping",
      merchant: "Amazon India",
      subCategory: "Work Desk Setup",
      date: "2026-01-25",
      amount: 11800,
      type: "Expense",
      icon: "shopping_bag",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      id: 13,
      categoryName: "Travel",
      merchant: "IndiGo Airlines",
      subCategory: "Bengaluru to Pune",
      date: "2025-12-16",
      amount: 9400,
      type: "Expense",
      icon: "flight",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: 14,
      categoryName: "Salary",
      merchant: "Zorvyn Technologies Pvt. Ltd.",
      subCategory: "Monthly Compensation",
      date: "2025-12-01",
      amount: 176000,
      type: "Income",
      icon: "payments",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      id: 15,
      categoryName: "Investments",
      merchant: "Axis Direct",
      subCategory: "Dividend Credit",
      date: "2025-11-11",
      amount: 12400,
      type: "Income",
      icon: "monitoring",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      id: 16,
      categoryName: "Entertainment",
      merchant: "Netflix",
      subCategory: "Annual Subscription",
      date: "2025-10-04",
      amount: 6499,
      type: "Expense",
      icon: "movie",
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600"
    },
    {
      id: 17,
      categoryName: "Salary",
      merchant: "Zorvyn Technologies Pvt. Ltd.",
      subCategory: "Monthly Compensation",
      date: "2025-09-01",
      amount: 172000,
      type: "Income",
      icon: "payments",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      id: 18,
      categoryName: "Shopping",
      merchant: "Croma",
      subCategory: "Monitor Upgrade",
      date: "2025-08-22",
      amount: 28999,
      type: "Expense",
      icon: "devices",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      id: 19,
      categoryName: "Utilities",
      merchant: "AWS",
      subCategory: "Cloud Hosting",
      date: "2025-07-19",
      amount: 7320,
      type: "Expense",
      icon: "bolt",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      id: 20,
      categoryName: "Salary",
      merchant: "Zorvyn Technologies Pvt. Ltd.",
      subCategory: "Monthly Compensation",
      date: "2025-06-01",
      amount: 168000,
      type: "Income",
      icon: "payments",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      id: 21,
      categoryName: "Dining",
      merchant: "The Leela Palace - Megu",
      subCategory: "Team Dinner",
      date: "2025-05-15",
      amount: 8450,
      type: "Expense",
      icon: "restaurant",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600"
    }
  ]
};
