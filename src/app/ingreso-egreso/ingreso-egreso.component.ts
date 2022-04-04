import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AppState } from '../app.reducer';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = "ingreso";
  cargando: boolean = false;
  uiSubcription: Subscription;

  constructor( private formBuilder: FormBuilder,
               private ieService: IngresoEgresoService,
               private store: Store<AppState> ) { }

  ngOnInit() {
    this.ingresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required ],
      monto: ['', Validators.required ]
    });

    this.uiSubcription = this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading )
  }

  ngOnDestroy(): void {
    this.uiSubcription.unsubscribe();
  }

  guardar() {
    if ( this.ingresoForm.invalid ) { return; }

    this.store.dispatch( uiActions.isLoading() );

    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );
    
    this.ieService.crearIngresoEgreso( ingresoEgreso )
      .then( () => {
        this.store.dispatch( uiActions.stopLoading() );
        this.ingresoForm.reset();
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch( error => {
        this.store.dispatch( uiActions.stopLoading() );
        Swal.fire('Error', error.message, 'error');
      });
  }

}
