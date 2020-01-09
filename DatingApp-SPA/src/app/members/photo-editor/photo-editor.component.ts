import { Component, Input, OnInit } from '@angular/core';
import { Photo } from 'src/app/_model/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];

  uploader: FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  baseUrl = environment.apiUrl;

  constructor (private authServ: AuthService){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authServ.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,  //10 MB
    });
    // Tell the browser to that the file has no credentials
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false};

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    }

    this.hasBaseDropZoneOver = false;


    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );
  }
  ngOnInit(){

  }
  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
