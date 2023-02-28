import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  package: Package = new Package();
  packages: Package[] = [];
  apiUrl: "https://localhost:7062/api/Packages";

  getPackages() {
    return this.http.get(this.apiUrl).subscribe(p => {
      this.packages = p as Package[];
    })
  }

  postPackage(packaging: Package) {
    return this.http.post(this.apiUrl, packaging);
  }

  putPackage(packaging: Package) {
    return this.http.put(this.apiUrl + '/' + packaging.DeliveryId, packaging);
  }

  deletePackage(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  resetPackage() {
    this.package = {
      DeliveryId: null,
      Product: '',
      ProductType: '',
      Size: '',
      LastName: '',
      FirstName: '',
      StreetName: '',
      StreetNumber: null,
      Zip: '',
      City: ''
    }
  }
}
