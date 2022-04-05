import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { AppStateWithIngresos } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[];
  ieSub: Subscription;

  constructor(private ieService: IngresoEgresoService,
              private store: Store<AppStateWithIngresos>) { }

  ngOnInit() {
    this.ieSub = this.store.select('ingresosEgresos').subscribe( ie => this.ingresosEgresos = ie.items );
  }

  ngOnDestroy(): void {
    this.ieSub.unsubscribe();
  }

  borrar( uid:string ) {
    this.ieService.borrarIngresoEgreso( uid )
      .then( () => Swal.fire('Borrado', 'Item borrado', 'success') )
      .catch( ( err ) => Swal.fire('Error de borrado', err.message, 'error') )
  }

}
