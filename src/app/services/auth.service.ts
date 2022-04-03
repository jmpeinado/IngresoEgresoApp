import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { setUser, unSetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubsscription: Subscription;

  constructor( public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {

    this.auth.authState.subscribe( fuser => {
      //console.log( fuser );

      if ( fuser ) {
        this.userSubsscription = this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges()
          .subscribe( firestoreUser => {

            const usuario = Usuario.fromFirebase( firestoreUser );
            this.store.dispatch( setUser({ user: usuario }) );

        });
      } else {
        this.userSubsscription.unsubscribe();
        this.store.dispatch( unSetUser() );
      }
    })

  }



  crearUsuario( nombre:string, email: string, password: string ) {

    // console.log({ nombre, email, password });
    return this.auth.createUserWithEmailAndPassword( email, password )
            .then( ({ user }) => {

              const newUser = new Usuario( user.uid, nombre, user.email );

              return this.firestore.doc(`${ user.uid }/usuario`).set({ ...newUser });

            });

  }

  loginUsuario( email:string, password:string) {
    return this.auth.signInWithEmailAndPassword( email, password );
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null )
    );
  }

}
