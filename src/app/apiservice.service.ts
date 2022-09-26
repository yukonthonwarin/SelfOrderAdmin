import { HttpClient,  HttpErrorResponse,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';   
import { environment } from 'src/environments/environment'; 
 
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';  
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService { 
  
  headersObj : any;
 
  constructor(private http: HttpClient) { 
    this.headersObj = new HttpHeaders({
      'uuid': localStorage.uuid, 
    }); 
  }

  public  handleError(error: HttpErrorResponse) { 
    console.error(error); 
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly. 
    } else  if (error.status === 401) { 
      alert(error.error.c_data) 
    } else { 
      alert(  JSON.stringify( error.error) ) 
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong. 
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  confirmSwal(title:string, text:string, confirmFn:any, cancelFn:any){
    Swal.fire({
      title: title, 
      text : text,
      showCancelButton: true,
      confirmButtonText: 'ตกลง', 
      cancelButtonText: 'ยกเลิก', 
      confirmButtonColor : '#1ab394'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        confirmFn();
        // Swal.fire('Saved!', '', 'success')
      } else   {
        cancelFn();
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  showSwal(type:string, header:string, body:string){
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true, 
    })

    if(type=='success'){
      // Swal.fire({
      //   icon: 'success' ,
      //   title: header,
      //   text: body, 
      // });
      Toast.fire({
        icon: 'success',
        title: header
      })

    }else if(type=='warning'){
      Toast.fire({
        icon: 'warning',
        title: header
      })
    }else if(type=='error'){
      Swal.fire({
        icon: 'error' ,
        title: header,
        text: body, 
      });
    }else{
      Toast.fire({
        icon: 'info',
        title: header
      })
    }

    
    
    
    

  }
  
  media(api: string, formData: FormData): Observable<any> { 
    let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Content-Type', 'multipart/form-data');  
    // headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers = headers.append('Accept', 'application/json');
 
    // let _headers = new HttpHeaders({
    //   'uuid': localStorage.uuid,
    //   'token': localStorage.token,
    // }); 

    console.warn("POST", environment.baseURL+api, formData);
    console.warn('headers', { headers: this.headersObj } );

      return this.http.post<any>(environment.baseURL+api, formData, { headers: this.headersObj } )
        .pipe(
          catchError( this.handleError )
        );
  }

  get(apiName : string){
    return this.http.get<any[]>( environment.baseURL+ apiName, { headers: this.headersObj } );
  }

  post(apiName : string, payload : any){
    return this.http.post<any>(environment.baseURL + apiName, payload , { headers: this.headersObj } );
  }

  login(c_username:string, c_password:string){
    // let _headers = new HttpHeaders({
    //   'uuid': localStorage.uuid,
    //   'token': localStorage.token,
    // });
    let _headers = new HttpHeaders({});
    let body = {
      "c_username":c_username,
      "c_password":btoa(c_password)
    }
    return this.http.post<any>(environment.baseURL+'user.login', body );
  }
 
  
  getRestaurantInfo() { 
    return this.http.get<any[]>(`${environment.baseURL}restaurant.info?uuid=` +localStorage.uuid);
  }

  postRestaurantInfo(payload : any) {
    let _headers = new HttpHeaders({
      'uuid': localStorage.uuid,
      'token': localStorage.token,
    });  
    return this.http.post<any>(environment.baseURL+'restaurant.save', payload , { headers: _headers } );
  }

   
  
}

 