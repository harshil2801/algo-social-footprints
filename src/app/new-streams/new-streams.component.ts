import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-streams',
  templateUrl: './new-streams.component.html',
  styleUrls: ['./new-streams.component.scss']
})
export class NewStreamsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  streamname : string;
  handle : string;
  hashtags : string;
  keywords : string;

  submit()
    {
     const sname= this.streamname;
     const handle= this.handle;
     const tags = this.hashtags;
     const keys = this.keywords;
     console.log(sname + "  " + handle + "  " + tags + "  " + keys);
     return sname;
    }

}
