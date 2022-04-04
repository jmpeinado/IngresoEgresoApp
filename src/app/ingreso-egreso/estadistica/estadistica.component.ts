import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  numIngresos: number = 0;
  numEgresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    
    this.store.select('ingresosEgresos')
      .subscribe( ({items}) => this.generarEstadisticas( items ) )
  }

  generarEstadisticas( items: IngresoEgreso[] ) {

    this.numIngresos = 0;
    this.numEgresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;

    items.forEach( item => {
      if ( item.tipo === 'ingreso') {
        this.totalIngresos += Number(item.monto);
        this.numIngresos ++;
      } else {
        this.totalEgresos += Number(item.monto);
        this.numEgresos ++;
      }
    } )
  }

}
