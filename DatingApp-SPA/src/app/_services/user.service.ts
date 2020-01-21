import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_model/User';
import { PaginatedResult } from '../_model/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_model/message';


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

  getUsers(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (likesParams === "Likers") {
      params = params.append('likers', 'true');
    }

    if (likesParams === "Likees") {
      params = params.append('likees', 'true');
    }


    return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params})
      .pipe(
         map(response => {
           paginatedResult.result = response.body;
           if (response.headers.get('Pagination') !== null) {
             paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
           }
           return paginatedResult;
         })
        );
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

  deletePhoto(userId: number, photoId: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + photoId );
  }

  sendLike(id: number, recipientId:number) {
    return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

    let params = new HttpParams();

    params.append('MessageContainer', messageContainer);

    if (page!= null && itemsPerPage!= null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Message[]>(this.baseUrl + 'uesrs/' + id + '/messages', {observe: 'response', params: params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      )};
  }
