import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, curr) => {
        let accumulated;
        if (curr.type === 'income') {
          accumulated = {
            income: acc.income + curr.value,
            outcome: acc.outcome,
            total: acc.total + curr.value,
          };
        } else {
          accumulated = {
            income: acc.income,
            outcome: acc.outcome + curr.value,
            total: acc.total - curr.value,
          };
        }

        return accumulated;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
