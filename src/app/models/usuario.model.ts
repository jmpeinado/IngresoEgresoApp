

export class Usuario {

    static fromFirebase( firestoreUser ) {
        
        return new Usuario( 
            firestoreUser.uid, 
            firestoreUser.nombre, 
            firestoreUser.email 
        );
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ){}

}
