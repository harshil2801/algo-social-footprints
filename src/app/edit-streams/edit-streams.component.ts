import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
@Component({
  selector: 'app-edit-streams',
  templateUrl: './edit-streams.component.html',
  styleUrls: ['./edit-streams.component.scss']
})
export class EditStreamsComponent implements OnInit {

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

