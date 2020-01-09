import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../_model/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  photoURL = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoURL.asObservable();

  constructor(private http: HttpClient) { }


  changeMemberPhoto(photoUrl: string){
    this.photoURL.next(photoUrl);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users' );
  }

  getUser(id): Observable<User>{
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userid: number, photoid: number) {
    return this.http.post(this.baseUrl + "users/" + userid + "/photos/" + photoid + '/setMain', {});
  }
}
