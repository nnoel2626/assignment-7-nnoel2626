import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';

import { catchError, tap, map } from 'rxjs/operators';
import { Equipment } from '@app/_models';
import { Observable, of, throwError } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class RentalShopService {
  // track maxId value, will be incremented when we create()
  maxId = 3;
  private apiurl = environment.apiUrl;
  equipmentUrl = environment.equipmentUrl;

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // two basic read methods follow: list and "getOne"
  listEquipment() {
    return this.http.get(this.apiurl + 'api/rentalshop')
      .pipe(
        tap(heroes => console.log('fetched equipment')),
        catchError(this.handleError('getEquipment', []))
      );
  };

  getEquipment(id) {
    return this.http.get(this.apiurl + 'api/rentalshop/' + id).pipe(
      tap(_ => console.log(`fetched equipment id=${id}`)),
      catchError(this.handleError<Equipment>(`getEquipment id=${id}`))
    );;
  }

  // Other CRUD methods TBD`
  createEquipment(equipment: FormData) {
    return this.http.post(this.apiurl + 'api/rentalshop/create', FormData).pipe(
      tap((equipment: Equipment) => console.log(`added equipment`)),
      catchError(this.handleError<Equipment>('addEquipment'))
    );;
  }

  updateEquipment(id, data) {
    return this.http.put(this.apiurl + 'api/rentalshop/update/' + id, data)
      .pipe(
        tap(_ => console.log(`updated equipment id=${id}`)),
        catchError(this.handleError<any>('updateEquipment'))
      );
  }

  deleteEquipment(id) {
    return this.http.delete(this.apiurl + 'api/rentalshop/delete/' + id)
      .pipe(
        tap(_ => console.log(`deleted equipment id=${id}`)),
        catchError(this.handleError<Equipment>('deleteEquipment'))
      );
  }

}
