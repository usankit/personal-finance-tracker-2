import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactions = this.transactionService.getTransactions();
  }

  deleteTransaction(id: number) {
    this.transactionService.deleteTransaction(id);
    this.transactions = this.transactionService.getTransactions();
  }
}
