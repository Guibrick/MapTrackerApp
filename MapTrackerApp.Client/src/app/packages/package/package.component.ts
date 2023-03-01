import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  constructor(public packageService: PackageService, private toastrService: ToastrService) { }

  ngOnInit(): void { }

  resetPackageForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.packageService.resetPackage();
  }

  submitPackageForm(form: NgForm) {
    if (form.value.DeliveryId == null) {
      form.value.DeliveryId = 0;
      this.packageService.postPackage(form.value).subscribe(p => {
        this.toastrService.success("Package added successfully.", " Add Package");
        this.packageService.getPackages();
        this.resetPackageForm(form);
      })
    }
    else {
      this.packageService.putPackage(form.value).subscribe(p => {
        this.toastrService.info("Package updated successfully.", "Update Package");
        this.packageService.getPackages();
        this.resetPackageForm(form);
      })
    }
  }
}
