import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '@erp-core/services/product.service';
import { IProduct } from '@erp-core/interfaces/product.interface';
import { IResponse } from '@erp-core/interfaces/response.interface';
declare var $: any;

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  public token = localStorage.getItem('token');
  public products: Array<IProduct> = [];
  public productsSearch: Array<IProduct> = [];

  public itemsPerPage = 1;
  public total = 1;
  public pages = 1;
  public page = 1;
  public nextPage;
  public prevPage;

  public filter = '';
  public loadStatus = false;
  public loadData = false;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute
  ) {

    this.nextPage = 1;
    this.prevPage = 1;

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._route.params.forEach((params: Params) => {
      let page = +params['page'];
      this.page = page;

      if (!page) {
        page = 1;
      } else {
        this.nextPage = page + 1;
        this.prevPage = page - 1;
        if (this.prevPage === 0) {
          this.prevPage = 1;
        }
      }

      this._productService.getProducts(this.token, page).subscribe(
        (response: IResponse) => {
          this.itemsPerPage = response.itemsPerPage;
          this.total = response.total;
          this.pages = response.pages;
          this.products = response.data;
          this.productsSearch = this.products;
          console.log(this.products)
        }
      )

    });
  }

  search() {
    if (this.filter) {
      this.loadData = true;
      const term = new RegExp(this.filter, 'i');
      this.products = this.productsSearch.filter(product => term.test(product.description) || term.test(product.customerPart) || term.test(product.sku));
      this.loadData = false;
    } else {
      this.products = this.productsSearch;
    }
  }

  setStatus(id: any, status: any) {
    this.loadStatus = true;
    this._productService.editStatusProduct(id, { status }, this.token).subscribe(
      () => {
        this.loadStatus = false;
        $('#delete-' + id).modal('hide');
        this.getProducts();
      }
    );
  }
  
}
