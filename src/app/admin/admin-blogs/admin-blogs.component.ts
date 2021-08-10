import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscount } from 'src/app/shared/models/discount/discount.model';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
export class AdminBlogsComponent implements OnInit {
  public adminDiscounts: Array<IDiscount> = [];
  public discountForm!: FormGroup;
  public customImage = 'https://pizzaletta.com/storage/2019/10/gallery_3.jpg';
  isEdit = false;
  private editDiscountId = 0;

  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.loadDiscounts(),
      this.initDiscountForm()
  }

  loadDiscounts(): void {
    this.discountService.getJSONDiscounts().subscribe(
      data => {
        this.adminDiscounts = data;
      }, err => {
        console.log(err);
      }
    )
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      title: [null, Validators.required],
      text: [null, Validators.required],
      author: [null, Validators.required],
      image: this.customImage
    })
  }

  createDiscount(): void {
    console.log('i am')
    const newDiscount = this.discountForm.value;
    newDiscount.date = new Date();
    this.discountService.createJSONDiscount(newDiscount).subscribe(
      () => {
        this.loadDiscounts();
      }, err => {
        console.log(err);
      }
    )
    this.initDiscountForm();
  }


  deleteDiscount(discount: IDiscount): void {
    this.discountService.deleteJSONDiscount(discount.id as number).subscribe(
      () => {
        this.loadDiscounts();
      },
      err => {
        console.log(err)
      }
    )
  }

  editDiscount(discount: IDiscount): void {
    this.discountForm.patchValue({
      title: discount.title,
      text: discount.text,
      author: discount.author,
      date: discount.date,
      image: discount.image
    });
    this.editDiscountId = discount.id as number;
    this.isEdit = true;
  }

  updateDiscount(): void {
    const discount = this.discountForm.value;
    this.discountService.updateJSONDiscount(discount, this.editDiscountId).subscribe(
      () => {
        this.loadDiscounts()
      },
      err => {
        console.log(err)
      }
    );
    this.initDiscountForm();
    this.isEdit = false;
  }
}
