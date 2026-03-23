const generateRevenueSources = (total, ratios) => {
  const sources = [
    { name: "Court Rentals", color: "#0052cc" },
    { name: "Private Coaching", color: "#3b82f6" },
    { name: "Youth Clinics", color: "#60a5fa" },
    { name: "Leagues & Tournaments", color: "#93c5fd" },
  ];
  return sources.map((src, i) => {
    const value = Math.round(total * ratios[i]);
    const percentage = Math.round(ratios[i] * 100);
    return { ...src, value, percentage };
  });
};

const generateTransactions = (count, basePrice) => {
  const types = ["Court Rental", "Private Lesson", "Youth Clinic", "Pro Shop", "Tournament Fee"];
  const statuses = ["Paid", "Paid", "Paid", "Paid", "Pending", "Failed"];
  const names = ["Alex Johnson", "Sarah Smith", "Mike Brower", "Emily Davis", "Chris Wilson", "Jessica Lee", "David Chen", "Amanda Torres"];
  
  const txs = [];
  for (let i = 0; i < count; i++) {
    const typeIdx = Math.floor(Math.random() * types.length);
    const amount = typeIdx === 3 ? (Math.random() * 30 + 10) : (Math.random() * basePrice + 50);
    txs.push({
      id: `TXN-${Math.floor(Math.random() * 89999) + 10000}`,
      date: `Mar ${Math.floor(Math.random() * 28 + 1)}, 2026`,
      customer: names[Math.floor(Math.random() * names.length)],
      type: types[typeIdx],
      amount: `$${amount.toFixed(2)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  // Sort transactions nicely by mock date
  return txs.sort((a,b) => parseInt(a.date.split(' ')[1]) - parseInt(b.date.split(' ')[1])).reverse();
};

export const clients = [
  {
    id: 1,
    name: "Northside Volleyball Center",
    kpis: { revenue: "$85,400", growth: "+12.4%", margin: "14.2%", utilization: "88%" },
    monthlyRevenue: [
      { month: 'Apr', val: 68, rev: "68,000" }, { month: 'May', val: 70, rev: "70,200" }, { month: 'Jun', val: 75, rev: "75,500" },
      { month: 'Jul', val: 78, rev: "78,100" }, { month: 'Aug', val: 82, rev: "82,400" }, { month: 'Sep', val: 80, rev: "80,000" },
      { month: 'Oct', val: 85, rev: "85,600" }, { month: 'Nov', val: 88, rev: "88,200" }, { month: 'Dec', val: 70, rev: "70,500" },
      { month: 'Jan', val: 72, rev: "72,100" }, { month: 'Feb', val: 76, rev: "76,300" }, { month: 'Mar', val: 85, rev: "85,400" }
    ],
    revenueSources: generateRevenueSources(85400, [0.55, 0.20, 0.15, 0.10]),
    transactions: generateTransactions(8, 150)
  },
  {
    id: 2,
    name: "Elevate Volleyball Hub",
    kpis: { revenue: "$62,100", growth: "+45.0%", margin: "22.5%", utilization: "62%" },
    monthlyRevenue: [
      { month: 'Apr', val: 20, rev: "20,100" }, { month: 'May', val: 22, rev: "22,500" }, { month: 'Jun', val: 25, rev: "25,000" },
      { month: 'Jul', val: 30, rev: "30,800" }, { month: 'Aug', val: 35, rev: "35,200" }, { month: 'Sep', val: 38, rev: "38,400" },
      { month: 'Oct', val: 42, rev: "42,100" }, { month: 'Nov', val: 45, rev: "45,000" }, { month: 'Dec', val: 40, rev: "40,500" },
      { month: 'Jan', val: 50, rev: "50,200" }, { month: 'Feb', val: 55, rev: "55,800" }, { month: 'Mar', val: 62, rev: "62,100" }
    ],
    revenueSources: generateRevenueSources(62100, [0.40, 0.15, 0.35, 0.10]),
    transactions: generateTransactions(8, 120)
  },
  {
    id: 3,
    name: "Summit Spike Athletics",
    kpis: { revenue: "$54,000", growth: "+1.2%", margin: "28.0%", utilization: "74%" },
    monthlyRevenue: [
      { month: 'Apr', val: 53, rev: "53,200" }, { month: 'May', val: 54, rev: "54,100" }, { month: 'Jun', val: 53, rev: "53,500" },
      { month: 'Jul', val: 52, rev: "52,800" }, { month: 'Aug', val: 53, rev: "53,900" }, { month: 'Sep', val: 54, rev: "54,000" },
      { month: 'Oct', val: 53, rev: "53,600" }, { month: 'Nov', val: 54, rev: "54,200" }, { month: 'Dec', val: 52, rev: "52,900" },
      { month: 'Jan', val: 53, rev: "53,100" }, { month: 'Feb', val: 53, rev: "53,700" }, { month: 'Mar', val: 54, rev: "54,000" }
    ],
    revenueSources: generateRevenueSources(54000, [0.45, 0.30, 0.05, 0.20]),
    transactions: generateTransactions(8, 90)
  }
];
