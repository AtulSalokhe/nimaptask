import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  data: any;
  id: any;
  lastid: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);

    this.http.get('http://localhost:3000/users/'+ this.id).subscribe((data: any) => {
      console.log(data);
      this.data = data;

    })
  }

}
