export interface FinancialData {
  period: string;
  incomeStatement: {
    operatingIncome: number;
    nonOperatingIncome: number;
    costs: number;
    adminExpenses: number;
    salesExpenses: number;
    interest: number;
    nonOperatingExpenses: number;
    taxes: number;
  };
  balanceSheet: {
    currentAssets: number;
    nonCurrentAssets: number;
    accountsReceivable: number;
    totalAssets: number;
    currentLiabilities: number;
    nonCurrentLiabilities: number;
    accountsPayable: number;
    totalLiabilities: number;
    equity: number;
  };
}

export interface CalculatedRatios {
  grossProfit: number;
  operatingProfit: number;
  netProfit: number;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  liquidity: number;
  debtRatio: number;
  interestCoverage: number;
  workingCapital: number;
}

export function calculateRatios(data: FinancialData): CalculatedRatios {
  const is = data.incomeStatement;
  const bs = data.balanceSheet;

  const grossProfit = is.operatingIncome - is.costs;
  const operatingProfit = grossProfit - (is.adminExpenses + is.salesExpenses);
  const netProfit = operatingProfit + is.nonOperatingIncome - is.interest - is.nonOperatingExpenses - is.taxes;

  const grossMargin = is.operatingIncome !== 0 ? (grossProfit / is.operatingIncome) * 100 : 0;
  const operatingMargin = is.operatingIncome !== 0 ? (operatingProfit / is.operatingIncome) * 100 : 0;
  const netMargin = is.operatingIncome !== 0 ? (netProfit / is.operatingIncome) * 100 : 0;

  const liquidity = (bs.currentLiabilities + bs.accountsPayable) !== 0 
    ? (bs.currentAssets + bs.accountsReceivable) / (bs.currentLiabilities + bs.accountsPayable) 
    : 0;
  const debtRatio = bs.totalAssets !== 0 ? (bs.totalLiabilities / bs.totalAssets) * 100 : 0;
  const interestCoverage = is.interest !== 0 ? operatingProfit / is.interest : 0;
  const workingCapital = (bs.currentAssets + bs.accountsReceivable) - (bs.currentLiabilities + bs.accountsPayable);

  return {
    grossProfit,
    operatingProfit,
    netProfit,
    grossMargin,
    operatingMargin,
    netMargin,
    liquidity,
    debtRatio,
    interestCoverage,
    workingCapital,
  };
}

export function calculateHorizontalAnalysis(data: FinancialData[]) {
  if (data.length < 2) return null;
  
  const results = [];
  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1];
    const curr = data[i];
    
    const variation = (current: number, previous: number) => 
      previous !== 0 ? ((current - previous) / previous) * 100 : 0;

    results.push({
      period: `${prev.period} vs ${curr.period}`,
      operatingIncomeVar: variation(curr.incomeStatement.operatingIncome, prev.incomeStatement.operatingIncome),
      netProfitVar: variation(calculateRatios(curr).netProfit, calculateRatios(prev).netProfit),
      assetsVar: variation(curr.balanceSheet.totalAssets, prev.balanceSheet.totalAssets),
    });
  }
  return results;
}
