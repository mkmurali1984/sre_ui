import { Injectable } from '@angular/core';
import { propertytype } from './class/propertytype';
import { propertysubtype } from './class/propertysubtype';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor() { /* TODO document why this constructor is empty */  }

  getpropertytypes() {
    return [
      new propertytype(1, 'Residential' ),
      new propertytype(2, 'Commercial' ),     
      new propertytype(3, 'Agriculture Land' ),
    ];
  }

  getpropertysubtypes() {
    return [
      new propertysubtype(1, 2, 'Commercial Building' ),
      new propertysubtype(2, 2, 'Office Space' ),
      new propertysubtype(3, 2, 'Commercial Land'),
      new propertysubtype(4, 2, 'Godowns'),
      new propertysubtype(5, 1, 'House' ),
      new propertysubtype(6, 1, 'Villa'),
      new propertysubtype(7, 1, 'Apartment' ),
      new propertysubtype(8, 1, 'Plot' ),
      new propertysubtype(9, 3, 'Farm/Agriculture Land' )
     ];
   }
}
