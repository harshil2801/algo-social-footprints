import { or } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { TimePicker } from '@syncfusion/ej2-calendars';
import { enableRipple } from '@syncfusion/ej2-base';
import { height } from '@amcharts/amcharts4/.internal/core/utils/Utils';
@Component({
  selector: 'app-new-streams',
  templateUrl: './new-streams.component.html',
  styleUrls: ['./new-streams.component.scss']
})
export class NewStreamsComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private atp: AmazingTimePickerService
    ) { }

    open(ev: any) {
      const amazingTimePicker = this.atp.open();
      amazingTimePicker.afterClose().subscribe(time => {
        console.log(time);
      });
    }

    

  ngOnInit(): void {
    enableRipple(false);
        // creates timepicker
let timeObject: TimePicker = new TimePicker({
  placeholder:'From',
  // define the custom class
  cssClass: 'e-custom-style',
  width:"247px",value: new Date("1/1/2018 2:00 AM")
});
timeObject.appendTo('#element');

timeObject.show();

// timeObject.appendTo('#element1');

let timeObject1: TimePicker = new TimePicker({
  placeholder:"To",
  cssClass:'e-custome-style',
  width:"247px", value: new Date("1/1/2018 2:00 AM")
});
timeObject1.appendTo("#element1");
timeObject1.show();
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        //handle: ['', [Validators.required, Validators.handle]]
        
      }
      
    );
    }

    get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
    }
  
    onSubmit(): void {
      this.submitted = true;
  
      if (this.form.invalid) {
        return;
      }
  
      console.log(JSON.stringify(this.form.value, null, 2));
    }
  
    onReset(): void {
      this.submitted = false;
      this.form.reset();
    }

  streamname : string;
  handle : any;
  hashtags : any;
  keywords : string;

  submit()
    {
      


     const sname= this.streamname;
     const handle= this.handle;
     const hashtags = this.hashtags;
     const keys = this.keywords;
    //  console.log(sname + "  " + handle + "  " + tags + "  " + keys);
    if(this.handle.charAt(0) == "@"){
      console.log(sname + "  " + handle + "  " + hashtags + "  " + keys);
    }else if(this.hashtags.charAt(0)=="#"){
      console.log(sname + "  " + handle + "  " + hashtags + "  " + keys);
    }
    else{
      console.log("error");
    }


    }

}
