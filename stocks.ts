
// ----- Types -----

type Portfolio = {
  companies: Company[]
}

type Company = {
  ticker: string,
  shares: number
}

// ----- Custom errors -----

class ShareSaleException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

// ----- Portfolio functions -----

export function createPortfolio(): Portfolio {
  return {
    companies: []
  }
}

export function isPortfolioEmpty(portfolio: Portfolio): boolean {
  return portfolio.companies.length == 0;
} 

export function howManyTickers(portfolio: Portfolio): number {
  return portfolio.companies.length;
}

export function howManyShares(portfolio: Portfolio): number {
  return portfolio.companies.reduce((acc, company) => acc + company.shares, 0);
}

export function purchaseStock(ticker: string, shares: number, portfolio: Portfolio): Portfolio {
  if (shares <= 0) { // shares is invalid
    throw new Error('purchaseStock: share amount must be positive')
  }

  // Iterate through companies to see if ticker is already in portfolio
  for (const company of portfolio.companies) {
    if (company.ticker === ticker) { // Update existing ticker information
      company.shares += shares; 
      return portfolio;
    }
  }

  // Add new ticker is not in list
  portfolio.companies.push(
    {
      ticker, 
      shares
    }
  );
  return portfolio;
}

export function sellStock(ticker: string, shares: number, portfolio: Portfolio): Portfolio {
  if (shares <= 0) { // Invalid share amount
    throw new Error('sellStock: share amount must be positive')
  }

  // Iterate through companies to see if ticker is already in portfolio
  for (const company of portfolio.companies) {
    if (company.ticker === ticker) {
      if (shares == company.shares) { // Remove ticker from portofolio
        const companyIndex = portfolio.companies.findIndex(portfolioCompany => portfolioCompany == company);
        portfolio.companies.splice(companyIndex);
      } else if (shares > company.shares) { // invalid sell amount
        throw new ShareSaleException(`sellStock: Insufficient balance`);
      } else { // update company share amount
        company.shares -= shares; 
      }
      return portfolio;
    }
  }
  
  // Ticker is not in portofilio
  throw new Error(`sellStock: Portfolio does not contain shares of ${ticker}`);
}

