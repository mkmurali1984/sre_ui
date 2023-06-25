import { Component } from '@angular/core';

import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homecontent',
  templateUrl: './homecontent.component.html',
  styleUrls: ['./homecontent.component.css']
})

export class HomecontentComponent {
  
  constructor(private http:HttpClient ){}

  propertiesdata:any=[];
  ImagePath= environment.PHOTO_URL;

  ngOnInit():void{
    this.getPropertiesData();
  }

  getPropertiesData() {
    this.http.get<any>(environment.API_URL+'Properties')
    .subscribe(data => { 
      this.propertiesdata = data.filter(a=>a.isActive == true && a.isApproved == true);
    });
  }

}
