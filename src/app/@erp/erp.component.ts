import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@erp-core/services/token.service';
import { ILogged } from '@erp/core/interfaces/rh/employee.interface';

@Component({
  selector: 'app-erp',
  templateUrl: './erp.component.html',
  styleUrls: ['./erp.component.scss']
})
export class ErpComponent implements OnInit {

  constructor(
    private _router: Router,
    private _tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this._tokenService.token(localStorage.getItem('token')!).subscribe(
      ({ data }: ILogged) => {
        if(!data) {
          this._router.navigate(['app', 'auth', 'login']);
          localStorage.clear();
        }
      }
    )
  }
}
