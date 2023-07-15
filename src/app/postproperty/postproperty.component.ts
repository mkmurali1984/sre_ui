import { Component, OnInit } from '@angular/core';
import { propertytype } from '../class/propertytype';
import { propertysubtype } from '../class/propertysubtype';
import { TypeService } from '../type.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { FormBuilder, FormGroup } from '@angular/forms';
import { postproperty } from '../class/postproerty';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-postproperty',
  templateUrl: './postproperty.component.html',
  styleUrls: ['./postproperty.component.css']
})
export class PostpropertyComponent implements OnInit {

  // addproperty:postproperty={
  //   name:''
  // };

  selectedPropertyType: propertytype = new propertytype(1, '');
  propertytypes: propertytype[] = [];
  propertysubtypes: propertysubtype[] = [];
  selectedSubType: any;
  choosenpropertytypeid: any;
  choosenpropertytypename: any;
  file: any;


  PhotoFileName = "anonymous.png";
  PhotoPath = environment.PHOTO_URL;
  personName: string | undefined;
  ownershipType: string |undefined;
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
  dimensions: any;

  constructor(private typeService: TypeService, private http: HttpClient) { }

  ngOnInit() {
    this.propertytypes = this.typeService.getpropertytypes();
    this.onSelect(this.selectedPropertyType.id);
  }

  onSelect(propertytypeid: any) {
    this.propertysubtypes = this.typeService.getpropertysubtypes().filter((item) => item.propertytypeid == propertytypeid);
  }

  imageUpload(event: any) {
    this.file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);


    this.http.post(environment.API_URL + 'Properties/SaveFile', formData)
      .subscribe((data: any) => {
        this.PhotoFileName = data.toString();
      });
  }

  validateSubmitForm(): boolean {
    if(this.personName == undefined || this.personName.length==0){
      Swal.fire({
        title: 'Warning!',
        text: "Person Name is Mandatory",
        icon: 'warning'        
      });
      return false;
    }
    else if(this.ownershipType == undefined || this.ownershipType.length==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "Ownership Type is Mandatory",
        icon: 'warning'        
      });      
      return false;
    }
    else if(this.contactNumber == undefined || this.contactNumber.length==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "contact Number is Mandatory",
        icon: 'warning'        
      });      
      return false;
    }
    else if(this.purpose == undefined || this.purpose.length==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "Purpose is Mandatory",
        icon: 'warning'        
      });      
      return false;
    }
    else if(this.location == undefined || this.location.length==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "location is Mandatory",
        icon: 'warning'        
      });      
      return false;
    }
    else if(this.propertyType == undefined || this.propertyType.length==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "Category is Mandatory",
        icon: 'warning'        
      });      
      return false;
    }
    else if(this.propertySubtype == undefined || this.propertySubtype.length==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "Property Type is Mandatory",
        icon: 'warning'        
      });      
      return false;
    }
    else if(this.price == undefined || this.price.length==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "Price is Mandatory",
        icon: 'warning'        
      });      
      return false;
    }
    else if(this.dimensions == undefined || this.dimensions.length==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "Property Dimension is Mandatory",
        icon: 'warning'        
      });      
      return false;
    }
    else if(this.propertytitle == undefined || this.propertytitle.length==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "Property title is Mandatory",
        icon: 'warning'        
      });      
      return false;
    }
    else if(this.mapURL == undefined || this.mapURL.length==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "Google map url is Mandatory",
        icon: 'warning'        
      });      
      return false;
    }
    else if(this.imageFileName == undefined || this.imageFileName.length==0)
    {
      Swal.fire({
        title: 'Warning!',
        text: "Property Picture is Mandatory",
        icon: 'warning'        
      });      
      return false;
    }
    return true;
  }

  submitForm() {

    debugger;    
      this.choosenpropertytypeid = this.selectedPropertyType.id - 1;
      this.choosenpropertytypename = this.propertytypes[this.choosenpropertytypeid].name;
      if (this.validateSubmitForm()) {
      var val = {
        personName: this.personName,
        ownershipType: this.ownershipType,
        personAddress: this.personAddress,
        street: this.street,
        city: this.city,
        state: this.state,
        zip: this.zip,
        contactNumber: this.contactNumber,
        emailAddress: this.emailAddress,
        purpose: this.purpose,
        location: this.location,
        propertyType: this.choosenpropertytypename,
        propertySubtype: this.propertySubtype,
        price: this.price,
        propertytitle: this.propertytitle,
        propertyDescription: this.propertyDescription,
        mapURL: this.mapURL,
        imageFileName: this.file.name,
        dimensions: this.dimensions,

      };

      console.log("value : " + val);
      console.log("Image Name" + val.imageFileName);
      console.log("post property button clicked");
      this.http.post(environment.API_URL + "Properties", val)
        .subscribe(res => { Swal.fire({
          title: 'Swati Real Estate',
          text: "Thank you for contacts us, your property is posted successfully.",
          icon: 'success'        
        });      });
    }
  }
}
