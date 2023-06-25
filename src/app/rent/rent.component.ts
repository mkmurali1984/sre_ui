import { Component, OnInit } from '@angular/core';
import { propertytype } from '../class/propertytype';
import { propertysubtype } from '../class/propertysubtype';
import { TypeService } from '../type.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit{
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
   
    
    this.http.get<any>(environment.API_URL+'Properties')
    .subscribe(data => { 
      this.propertiesdata = data.filter(a=>a.propertySubtype.toLowerCase()=== this.selectedSubType.toLowerCase() && a.purpose.toLowerCase() === "rent" && a.isActive == true && a.isApproved == true);
    });    
    
  }  

}
