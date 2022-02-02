import { User } from './../model/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  itemCollection!: AngularFirestoreCollection<User>
  allUsers$!: Observable<any>

  constructor(
    private firestore: AngularFirestore
  ) {
    this.itemCollection = this.firestore.collection('users') //ezt kiemeltük, hogy a többi metódusban is felhasználhassuk
    this.allUsers$ = this.itemCollection.valueChanges({
      idField: 'ID'
    })
  }

  create(user: User): Promise<any> { //ezek promise-al térnek vissza
    return this.itemCollection.add( {...user} ) //a usert-t spread operátorral kell megadnom, ugyanis egy sima plain objektet vár a firebase, nem User típusút, az operátor átalakítja
  }

  update(user: any): Promise<any> {
    console.log(user)
    const id = user.ID //a nagybetűs ID lesz, amit kinyertünk az idField szűrővel
    console.log(id)
    delete user.id //a dupla adattárolás miatt töröljük
    return this.itemCollection.doc(id).update( {...user} )  //a doc metódussal megkeressük a kulcsot, majd frissítjük a kapott user-rel
  }

  delete(user: any): Promise<any> {
    return this.itemCollection.doc(user.ID).delete()
  }

}
