import { Component, OnInit } from '@angular/core';
import { propertytype } from '../class/propertytype';
import { propertysubtype } from '../class/propertysubtype';
import { TypeService } from '../type.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { FormBuilder, FormGroup } from '@angular/forms';
import { postproperty } from '../class/postproerty';


@Component({
  selector: 'app-postproperty',
  templateUrl: './postproperty.component.html',
  styleUrls: ['./postproperty.component.css']
})
export class PostpropertyComponent implements OnInit{

  // addproperty:postproperty={
  //   name:''
  // };
  
  selectedPropertyType: propertytype = new propertytype(1,'');
  propertytypes: propertytype[] =[];
  propertysubtypes: propertysubtype[] = [];
  selectedSubType:any;
  choosenpropertytypeid:any;
  choosenpropertytypename:any;
  file:any;
  

  PhotoFileName="anonymous.png";
  PhotoPath=environment.PHOTO_URL;  
  personName: any;
  ownershipType: any;
  personAddress: any;
  street: any;
  city: any;
  state: any;
  zip: any;
  contactNumber: any;
  emailAddress: any;
  purpose: any;
  location: any;
  propertyType: any;
  propertySubtype: any;
  price: any;
  propertytitle: any;
  propertyDescription: any;
  mapURL: any;
  imageFileName: any;
  dimensions:any;

  constructor(private typeService: TypeService,private http:HttpClient ) { }

  ngOnInit() {
    this.propertytypes = this.typeService.getpropertytypes();
    this.onSelect(this.selectedPropertyType.id);    
  }

  onSelect(propertytypeid:any) {
    this.propertysubtypes = this.typeService.getpropertysubtypes().filter((item) => item.propertytypeid == propertytypeid);
  }

  imageUpload(event:any){
    this.file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',this.file, this.file.name);
    
    
    this.http.post(environment.API_URL+'Properties/SaveFile',formData)
    .subscribe((data:any)=>{
      this.PhotoFileName=data.toString();    
    });
  }

  submitForm(){
    this.choosenpropertytypeid = this.selectedPropertyType.id-1;
    this.choosenpropertytypename = this.propertytypes[this.choosenpropertytypeid].name;

    var val = {
      personName : this.personName,
      ownershipType : this.ownershipType,
      personAddress:this.personAddress,
      street:this.street,
      city:this.city,
      state:this.state,
      zip:this.zip,
      contactNumber:this.contactNumber,
      emailAddress:this.emailAddress,
      purpose:this.purpose,
      location:this.location,
      propertyType:this.choosenpropertytypename,
      propertySubtype:this.propertySubtype,
      price:this.price,
      propertytitle:this.propertytitle,
      propertyDescription:this.propertyDescription,
      mapURL:this.mapURL,
      imageFileName:this.file.name,
      dimensions:this.dimensions,

    };
    console.log("value : "+ val);
    console.log("Image Name" + val.imageFileName);
    console.log("post property button clicked");
    this.http.post(environment.API_URL+"Properties", val)
    .subscribe(res => { alert("Data added Successfully.")});
  }
}
