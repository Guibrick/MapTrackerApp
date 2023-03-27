import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Package } from '../models/package';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.css']
})
export class PackagesListComponent implements OnInit {

  packages: Package[] = [];

  constructor(public packageService: PackageService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.packageService.getPackages();
  }

  loadPackage(packaging: Package) {
    this.packageService.package = Object.assign({}, packaging);
  }

  deletePackage(id: number) {
    if (confirm("Are you sure that you want to delete this package?")) {
      this.packageService.deletePackage(id).subscribe(p => {
        this.toastrService.warning("Package delete successfully.", "Delete.");
        this.packageService.getPackages();
        this.packageService.resetPackage();
      })
    }
  }
}
