import {createPortfolio, isPortfolioEmpty, howManyTickers, purchaseStock, sellStock, howManyShares} from "./stocks";

let emptyPortfolio = {
  companies: []
}

let p1 = {
  companies: [
    {
      ticker: 'ABC', 
      shares: 7
    }
  ]
}

let p2 = {
  companies: [
    {
      ticker: 'ABC', 
      shares: 7
    }, 
    {
      ticker: 'AAA',
      shares: 8
    }
  ]
}

test('createPortfolio', () => {
  const target = emptyPortfolio;
  const results = createPortfolio();
  expect(results).toStrictEqual(target);
});

describe('portfolio reading functions', () => {
  test('isPortfolioEmpty - empty', () => {
    const target = true;
    const result = isPortfolioEmpty(emptyPortfolio);
    expect(result).toBe(target);
  });
  
  test('isPortfolioEmpty - not empty', () => {
    const target = false;
    const result = isPortfolioEmpty(p1);
    expect(result).toBe(target);
  });
  
  test('howManyTickers - 0', () => {
    const target = 0;
    const result = howManyTickers(emptyPortfolio);
    expect(result).toBe(target);
  });
  
  test('howManyTickers - 1', () => {
    const target = 1;
    const result = howManyTickers(p1);
    expect(result).toBe(target);
  });
  
  test('howManyTickers - 2', () => {
    const target = 2;
    const result = howManyTickers(p2);
    expect(result).toBe(target);
  });

  test('howManyShares - 0', () => {
    const target = 0;
    const result = howManyShares(emptyPortfolio);
    expect(result).toBe(target);
  });
  
  test('howManyShares - 1 company', () => {
    const target = 7;
    const result = howManyShares(p1);
    expect(result).toBe(target);
  });
  
  test('howManyShares - multiple companies', () => {
    const target = 15;
    const result = howManyShares(p2);
    expect(result).toBe(target);
  });
})

describe('portfolio modification functions', () => {
  beforeEach(() => {
    emptyPortfolio = {
      companies: []
    }
    
    p1 = {
      companies: [
        {
          ticker: 'ABC', 
          shares: 7
        }
      ]
    }
    
    p2 = {
      companies: [
        {
          ticker: 'ABC', 
          shares: 7
        }, 
        {
          ticker: 'AAA',
          shares: 8
        }
      ]
    }
  });

  test('purchaseStock - new stock', () => {
    const target = p1;
    const result = purchaseStock('ABC', 7, p1);
    expect(result).toStrictEqual(target);
  });
  
  test('purchaseStock - existing stock', () => {
    const target = {
      companies: [
        {
          ticker: 'ABC', 
          shares: 9
        }
      ]
    };
    const result = purchaseStock('ABC', 2, p1);
    expect(result).toStrictEqual(target);
  });
  
  test('purchaseStock - existing stock and multiple stocks in portfolio', () => {
    const target = {
      companies: [
        {
          ticker: 'ABC', 
          shares: 9
        },
        {
          ticker: 'AAA', 
          shares: 8
        }
      ]
    };
    const result = purchaseStock('ABC', 2, p2);
    expect(result).toStrictEqual(target);
  });
  
  test('purchaseStock - new stock and multiple stocks in portfolio', () => {
    const target = {
      companies: [
        {
          ticker: 'ABC', 
          shares: 7
        },
        {
          ticker: 'AAA', 
          shares: 8
        },
        {
          ticker: 'SSS', 
          shares: 90
        }
      ]
    };
    const result = purchaseStock('SSS', 90, p2);
    expect(result).toStrictEqual(target);
  });

  test('purchaseStock - error: purchasing 0 shares', () => {
    expect(() => {
      purchaseStock('ABC', 0, p2);
    }).toThrow(
      new Error('purchaseStock: share amount must be positive')
    );
  });

  test('purchaseStock - error: purchasing negative shares', () => {
    expect(() => {
      purchaseStock('ABC', 0, p2);
    }).toThrow(
      new Error('purchaseStock: share amount must be positive')
    );
  });

  test('sellStock - exists, single stock, complete sell', () => {
    const target = {
      companies: []
    };
    const result = sellStock('ABC', 7, p1);
    expect(result).toStrictEqual(target);
  });

  test('sellStock - exists, multiple stocks, incomplete sell', () => {
    const target = {
      companies: [
        {
          ticker: 'ABC',
          shares: 7
        },
        {
          ticker: 'AAA', 
          shares: 2
        }
      ]
    };
    const result = sellStock('AAA', 6, p2);
    expect(result).toStrictEqual(target);
  });

  test('sellStock - error: Insufficient balance', () => {
    expect(() => {
      sellStock('AAA', 100, p2);
    }).toThrow(
      new Error('sellStock: Insufficient balance')
    );
  });

  test('sellStock - error: Insufficient balance', () => {
    expect(() => {
      sellStock('TTT', 100, p2);
    }).toThrow(
      new Error('sellStock: Portfolio does not contain shares of TTT')
    );
  });

  test('sellStock - error: selling 0 shares', () => {
    expect(() => {
      sellStock('AAA', 0, p2);
    }).toThrow(
      new Error('sellStock: share amount must be positive')
    );
  });

  test('sellStock - error: selling negative shares', () => {
    expect(() => {
      sellStock('ABC', -3, p2);
    }).toThrow(
      new Error('sellStock: share amount must be positive')
    );
  });
  
})