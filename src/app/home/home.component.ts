import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  formdata: any;
  imagecode: string = "../../assets/images/profileimage.jpg";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.data = new FormGroup({
      firstName: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z]{1,20}$")])),
      lastName: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      phone: new FormControl("", Validators.compose([Validators.required])),
      state: new FormControl("", Validators.compose([Validators.required])),
      country: new FormControl("", Validators.compose([Validators.required])),
      rangeValue: new FormControl(10),
      tags: new FormControl(""),
      image: new FormControl("")
    })
  }

  submit(data: any) {
    data.image = this.imagecode;
    this.http.post("http://localhost:3000/users", data).subscribe((data: any) => {
      window.location.href = `/register/${data.id}`;
    });
  }


  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result != null)
        this.imagecode = reader.result.toString();
    }
  }
}