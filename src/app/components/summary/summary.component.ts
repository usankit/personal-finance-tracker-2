import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  totalIncome = 0;
  totalExpenses = 0;
  balance = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.updateSummary();
  }

  updateSummary() {
    const summary = this.transactionService.getSummary();
    this.totalIncome = summary.totalIncome;
    this.totalExpenses = summary.totalExpenses;
    this.balance = summary.balance;
  }
}
