import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { tap } from 'rxjs';

export interface CustomerProfile {
  id: number;
  email: string;
  fullName: string;
  dob: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
  // add other fields
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  // The global state
  currentUser = signal<CustomerProfile | null>(null);

  fetchAndStoreUser(email: string) {
    // DON'T: .subscribe() here. It returns a Subscription.
    // DO: Return the result of .get(), which is an Observable.
    return this.http.get<CustomerProfile>(`${environment.customerApiUrl}/customer/email/` + email).pipe(
      tap(user => {
        console.log('User data successfully fetched:', user);
        this.currentUser.set(user); // Update your Signal here
      })
    );
  }

  clearUser() {
    this.currentUser.set(null);
  }
}