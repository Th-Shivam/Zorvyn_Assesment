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
      categoryName: "Retail",
      merchant: "Apple Store - iPhone 15 Pro",
      subCategory: "Electronic Gadgets",
      date: "2023-10-12",
      amount: 124900,
      type: "Expense",
      icon: "shopping_bag",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      categoryName: "Salary",
      merchant: "Google Ireland Limited",
      subCategory: "Monthly Compensation",
      date: "2023-10-10",
      amount: 245000,
      type: "Income",
      icon: "payments",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      id: 3,
      categoryName: "Dining",
      merchant: "The Leela Palace - Megu",
      subCategory: "Business Dinner",
      date: "2023-10-08",
      amount: 12450,
      type: "Expense",
      icon: "restaurant",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      id: 4,
      categoryName: "Investments",
      merchant: "Dividend Payout - NIFTY 50",
      subCategory: "Quarterly Dividend",
      date: "2023-10-05",
      amount: 8200,
      type: "Income",
      icon: "monitoring",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      id: 5,
      categoryName: "Utilities",
      merchant: "AWS Infrastructure Cloud",
      subCategory: "Web Services",
      date: "2023-10-02",
      amount: 4250,
      type: "Expense",
      icon: "subscriptions",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600"
    }
  ]
};
