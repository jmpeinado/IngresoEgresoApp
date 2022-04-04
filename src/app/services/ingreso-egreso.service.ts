import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
              private authServices: AuthService,
              private store: Store<AppState>) { }
  
  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
    const uid = this.authServices.user.uid;
    return this.firestore.doc(`${ uid }/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListeners( uid: string ) {
    return this.firestore.collection(`${ uid }/ingresos-egresos/items`).snapshotChanges()
      .pipe(
        map( snapshop => snapshop.map( doc => 
          ({ 
            uid: doc.payload.doc.id, 
            ...doc.payload.doc.data() as any
          }) 
        ))
      );
  }

  borrarIngresoEgreso( itemUid: string ) {
    const userUid = this.authServices.user.uid;
    return this.firestore.doc(`${ userUid }/ingresos-egresos/items/${ itemUid }`).delete();
  }
}
