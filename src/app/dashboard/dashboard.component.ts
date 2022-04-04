import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import * as ieActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  authSubs: Subscription;
  ieSubs: Subscription;

  constructor(private store: Store<AppState>,
              private ieService: IngresoEgresoService) { }

  ngOnInit() {
    this.authSubs = this.store.select('auth')
      .pipe(
        filter( ({ user }) => user != null )
      )
      .subscribe( ({ user }) => {
        this.ieSubs = this.ieService.initIngresosEgresosListeners( user.uid )
          .subscribe( ieFirebase => {
            this.store.dispatch( ieActions.setItems({ items: ieFirebase }) );
          });
    });
  }

  ngOnDestroy(): void {
    this.ieSubs.unsubscribe();
    this.authSubs.unsubscribe();

  }

}
