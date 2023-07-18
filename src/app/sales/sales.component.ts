import { Component, OnInit } from '@angular/core';
import { propertytype } from '../class/propertytype';
import { propertysubtype } from '../class/propertysubtype';
import { TypeService } from '../type.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent  implements OnInit {

  selectedPropertyType: propertytype = new propertytype(1,'');
  propertytypes: propertytype[] =[];
  propertysubtypes: propertysubtype[] = [];
  selectedSubType:any;
  choosenpropertytypeid:any;
  choosenpropertytypename:any;
  temppropertydata:any;
  propertiesdata:any=[];
  ImagePath= environment.PHOTO_URL;


  constructor(private typeService: TypeService,private http:HttpClient) { }

  
  getPropertiesData() {
    this.http.get<any>(environment.API_URL+'Properties')
    .subscribe(data => { 
      this.propertiesdata = data;
    });
  }

  ngOnInit() {
    this.propertytypes = this.typeService.getpropertytypes();
    this.onSelect(this.selectedPropertyType.id);
    
  }

  onSelect(propertytypeid:any) {
    this.propertysubtypes = this.typeService.getpropertysubtypes().filter((item) => item.propertytypeid == propertytypeid);
  }

  onSubTypeChange(){    

    this.choosenpropertytypeid = this.selectedPropertyType.id-1;
    this.choosenpropertytypename = this.propertytypes[this.choosenpropertytypeid].name;    
    
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('ApiKey',environment.API_KEY);
    let options = {headers : httpHeaders};

    this.http.get<any>(environment.API_URL+'Properties',options)
    .subscribe(data => { 
      this.propertiesdata = data.filter(a=>a.propertySubtype === this.selectedSubType && a.purpose.toLowerCase() === "sell" && a.isActive == true && a.isApproved == true);
    });    
    
  }  
}
