import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

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
    const transations = this.transactions;
    let income = 0;
    let outcome = 0;
    let total = 0;

    transations.map(transation => {
      if (transation.type === 'income') {
        income += transation.value;
        total += transation.value;
      } else {
        outcome += transation.value;
        total -= transation.value;
      }

      return null;
    });

    const balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
