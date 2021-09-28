import { Component, OnInit } from "@angular/core";
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../api.service";

import { BlockData } from '../block-data';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  responseData: any[]

  public liveCollapsed = false;
  
  blocks: BlockData[];

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    public rest: ApiService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }

  ngOnInit() {
    this.blocks = [];
  }

  addCard() {
    console.log("here")
    this.blocks.push({
      blockHash: Math.random().toString(36).substring(2),
      blockNumber: this.blocks.length + 1,
      previousBlock: "0000",
      transactions: [
        {
          sender: 'sender',
          recipient: 'recipient',
          amount: 1,
          fee: 200
        }
      ]
    });
  }

  clearCards() {
    this.blocks.length = 0;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
      this.rest
        .gettweets(
          JSON.stringify({
            from: `${this.fromDate["year"]}-${"09"}-${this.fromDate["day"]}`,
            to: `${this.toDate["year"]}-${"09"}-${this.toDate["day"]}`,
          })
        )
        .subscribe((data) => {
          data = JSON.parse(data);
          this.responseData = data['key1'];

          //console.log(data);
          //console.log(this.responseData);
          console.log(data);
        });
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
