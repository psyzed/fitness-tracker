import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  maxDate: Date;

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); //Making sure the person is at least 18
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.signupForm.reset();
  }
}
