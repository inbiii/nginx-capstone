import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MutualFundsInvestmentsComponent } from '../mutual-funds-investments/mutual-funds-investments.component';

@Component({
  selector: 'app-mutual-funds-buy-sell-dialog',
  templateUrl: './mutual-funds-buy-sell-dialog.component.html',
  styleUrls: ['./mutual-funds-buy-sell-dialog.component.scss'],
  template: 'passed in {{ data }}'
})
export class MutualFundsBuySellDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private mutualFundsInvestmentsComponent: MutualFundsInvestmentsComponent,
              private dialogRef: MatDialogRef<MutualFundsBuySellDialogComponent>) { }

  assetsAmountToBuy: number = 1;
  assetsAmountToSell: number = 1;
  assetsAllSell: boolean = false;

  // totalCost: any;
  // totalReturned: any;
  // totalReturnedAll: any;

  totalCost: number = this.assetsAmountToBuy * this.data.tempMutualFund.price;
  totalReturned: number = -1 * (this.assetsAmountToSell * this.data.tempMutualFund.price);
  totalReturnedAll: number = -1 * (this.data.tempMutualFund.initialInvestment + (this.data.tempInvestment.shares * this.data.tempMutualFund.price));

  tempInvestment: any;

  ngOnInit(): void {
    this.tempInvestment = this.data.tempInvestment;
    // this.totalCost = this.assetsAmountToBuy * this.data.tempMutualFund.price;
    // this.totalReturned = -1 * (this.assetsAmountToSell * this.data.tempMutualFund.price);
    // this.totalReturnedAll = -1 * (this.data.tempMutualFund.initialInvestment + (this.data.tempInvestment.shares * this.data.tempMutualFund.price));
  }

  buyInvestment() {
    var tempShares = this.tempInvestment.shares + this.assetsAmountToBuy;
    this.totalCost = parseFloat((<HTMLInputElement>document.getElementById("purchaseInputId")).value);
    var tempTotal = this.tempInvestment.totalInvested + this.totalCost;

    this.tempInvestment.shares = tempShares;
    this.tempInvestment.totalInvested = tempTotal;
    this.editInvestment();
  }

  sellInvestment() {
    var tempShares = this.tempInvestment.shares - this.assetsAmountToSell;

    if(this.assetsAllSell) {
      this.totalReturned = parseFloat((<HTMLInputElement>document.getElementById("sellInputIdAll")).value);
    }
    else {
      this.totalReturned = parseFloat((<HTMLInputElement>document.getElementById("sellInputId")).value);
    }
    
    var tempTotal = this.tempInvestment.totalInvested + this.totalReturned;

    if(tempShares == 0) {
      this.deleteInvestment();
    }
    else {
      this.tempInvestment.shares = tempShares;
      this.tempInvestment.totalInvested = tempTotal;
      this.editInvestment();
    }
  }

  assetsAll() {
    if(this.assetsAmountToSell == this.data.tempInvestment.shares) {
      return this.assetsAllSell == true;
    }
    else {
      return this.assetsAllSell == false;
    }
  }

  sellAllInvestment() {
    this.totalReturnedAll = parseFloat((<HTMLInputElement>document.getElementById("sellAllInputId")).value);
    this.deleteInvestment();
  }

  editInvestment() {
    this.mutualFundsInvestmentsComponent.editInvestment(this.tempInvestment);
    this.dialogRef.close("Congratulations on your edit!");
  }

  deleteInvestment() {
    this.mutualFundsInvestmentsComponent.deleteInvestment(this.tempInvestment.id);
    this.dialogRef.close("Congratulations on your delete!");
  }

}
