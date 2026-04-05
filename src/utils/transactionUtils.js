export const TRANSACTION_TYPES = ['Income', 'Expense'];

export const parseTransactionDate = (value) => {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

export const formatSignedCurrency = (type, amount) =>
  `${type === 'Income' ? '+' : '-'}${formatCurrency(amount)}`;

export const formatTransactionDate = (value, options = { day: '2-digit', month: 'short', year: 'numeric' }) => {
  const date = parseTransactionDate(value);
  return date ? date.toLocaleDateString('en-US', options) : 'Invalid date';
};

export const getMonthKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

export const getMonthLabel = (date) =>
  date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

export const isSameMonth = (date, comparisonDate) =>
  date.getMonth() === comparisonDate.getMonth() && date.getFullYear() === comparisonDate.getFullYear();

export const getPreviousMonthDate = (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1);

export const getDateRangeStart = (range, now = new Date()) => {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (range === '30D') {
    start.setDate(start.getDate() - 29);
    return start;
  }

  if (range === '6M') {
    return new Date(now.getFullYear(), now.getMonth() - 5, 1);
  }

  return new Date(now.getFullYear(), now.getMonth() - 11, 1);
};

export const getCategoryColor = (categoryName) => {
  const palette = [
    '#4f46e5',
    '#e11d48',
    '#0d9488',
    '#ea580c',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#65a30d',
    '#f59e0b',
    '#64748b',
  ];

  const safeName = categoryName || 'Other';
  const hash = safeName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[hash % palette.length];
};

export const getTransactionVisuals = (categoryName, type) => {
  if (type === 'Income') {
    return {
      icon: 'payments',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    };
  }

  const iconMap = {
    Dining: { icon: 'restaurant', iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
    Travel: { icon: 'flight', iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
    Utilities: { icon: 'bolt', iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
    Shopping: { icon: 'shopping_bag', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    Electronics: { icon: 'devices', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
    Entertainment: { icon: 'movie', iconBg: 'bg-pink-50', iconColor: 'text-pink-600' },
    Salary: { icon: 'account_balance_wallet', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    Investments: { icon: 'monitoring', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  };

  return iconMap[categoryName] || {
    icon: 'receipt_long',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  };
};

export const getTransactionMetrics = (transactions) => {
  const now = new Date();
  const currentMonth = [];
  const previousMonth = [];
  const expenses = [];
  const income = [];

  transactions.forEach((transaction) => {
    const parsedDate = parseTransactionDate(transaction.date);
    if (!parsedDate) return;

    if (transaction.type === 'Income') {
      income.push(transaction);
    } else {
      expenses.push(transaction);
    }

    if (isSameMonth(parsedDate, now)) {
      currentMonth.push(transaction);
    } else if (isSameMonth(parsedDate, getPreviousMonthDate(now))) {
      previousMonth.push(transaction);
    }
  });

  const currentMonthIncome = currentMonth.reduce(
    (sum, transaction) => sum + (transaction.type === 'Income' ? transaction.amount : 0),
    0
  );
  const currentMonthExpense = currentMonth.reduce(
    (sum, transaction) => sum + (transaction.type === 'Expense' ? transaction.amount : 0),
    0
  );
  const previousMonthIncome = previousMonth.reduce(
    (sum, transaction) => sum + (transaction.type === 'Income' ? transaction.amount : 0),
    0
  );
  const previousMonthExpense = previousMonth.reduce(
    (sum, transaction) => sum + (transaction.type === 'Expense' ? transaction.amount : 0),
    0
  );

  const totalIncome = income.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalExpense = expenses.reduce((sum, transaction) => sum + transaction.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const categoryTotals = expenses.reduce((accumulator, transaction) => {
    accumulator[transaction.categoryName] = (accumulator[transaction.categoryName] || 0) + transaction.amount;
    return accumulator;
  }, {});

  const topCategoryEntry = Object.entries(categoryTotals).sort(([, first], [, second]) => second - first)[0];
  const topCategoryAmount = topCategoryEntry ? topCategoryEntry[1] : 0;
  const savingsRate = totalIncome > 0 ? Math.round(((netBalance / totalIncome) * 100)) : 0;

  return {
    now,
    totalIncome,
    totalExpense,
    netBalance,
    currentMonthIncome,
    currentMonthExpense,
    previousMonthIncome,
    previousMonthExpense,
    monthlyNet: currentMonthIncome - currentMonthExpense,
    previousMonthlyNet: previousMonthIncome - previousMonthExpense,
    topCategory: topCategoryEntry ? topCategoryEntry[0] : 'N/A',
    topCategoryAmount,
    categoryTotals,
    savingsRate,
    averageExpense: expenses.length
      ? Math.round(totalExpense / expenses.length)
      : 0,
  };
};

export const getTrendData = (transactions, range, now = new Date()) => {
  const startDate = getDateRangeStart(range, now);
  const points = [];

  if (range === '30D') {
    for (let index = 0; index < 30; index += 1) {
      const pointDate = new Date(startDate);
      pointDate.setDate(startDate.getDate() + index);
      points.push({
        key: pointDate.toISOString().slice(0, 10),
        label: pointDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
        value: 0,
      });
    }
  } else {
    const monthCount = range === '6M' ? 6 : 12;
    for (let index = 0; index < monthCount; index += 1) {
      const pointDate = new Date(startDate.getFullYear(), startDate.getMonth() + index, 1);
      points.push({
        key: getMonthKey(pointDate),
        label: pointDate.toLocaleDateString('en-US', { month: 'short' }),
        value: 0,
      });
    }
  }

  transactions.forEach((transaction) => {
    const parsedDate = parseTransactionDate(transaction.date);
    if (!parsedDate || parsedDate < startDate || parsedDate > now) return;

    const pointKey = range === '30D' ? transaction.date : getMonthKey(parsedDate);
    const point = points.find((entry) => entry.key === pointKey);
    if (!point) return;

    point.value += transaction.type === 'Income' ? transaction.amount : -transaction.amount;
  });

  let runningBalance = 0;
  const data = points.map((point) => {
    runningBalance += point.value;
    return runningBalance;
  });

  return {
    labels: points.map((point) => point.label),
    data,
  };
};

export const getMonthlyComparison = (transactions, now = new Date()) => {
  const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const previousMonthDate = getPreviousMonthDate(now);

  const initialValue = {
    current: { income: 0, expense: 0, label: getMonthLabel(currentMonthDate) },
    previous: { income: 0, expense: 0, label: getMonthLabel(previousMonthDate) },
  };

  return transactions.reduce((accumulator, transaction) => {
    const parsedDate = parseTransactionDate(transaction.date);
    if (!parsedDate) return accumulator;

    const target = isSameMonth(parsedDate, currentMonthDate)
      ? accumulator.current
      : isSameMonth(parsedDate, previousMonthDate)
        ? accumulator.previous
        : null;

    if (!target) return accumulator;

    if (transaction.type === 'Income') {
      target.income += transaction.amount;
    } else {
      target.expense += transaction.amount;
    }

    return accumulator;
  }, initialValue);
};
