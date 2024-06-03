import { Injectable } from '@angular/core';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = [];
  private storageKey = 'transactions';

  constructor() {
    this.loadTransactions();
  }

  private loadTransactions() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.transactions = JSON.parse(data);
    }
  }

  private saveTransactions() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.transactions));
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  addTransaction(transaction: Transaction) {
    transaction.id = new Date().getTime();
    this.transactions.push(transaction);
    this.saveTransactions();
  }

  editTransaction(updatedTransaction: Transaction) {
    const index = this.transactions.findIndex(t => t.id === updatedTransaction.id);
    if (index !== -1) {
      this.transactions[index] = updatedTransaction;
      this.saveTransactions();
    }
  }

  deleteTransaction(id: number) {
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.saveTransactions();
  }

  getSummary() {
    const totalIncome = this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses
    };
  }
}
