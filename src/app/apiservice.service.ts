import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';  
import { environment } from 'src/environments/environment'; 
 

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService { 
 
 
  constructor(private http: HttpClient) { 
    
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
    return this.http.post<any>(environment.baseURL+'user.login', body, { headers: _headers });
  }
  
  getRestaurantInfo() {
    
    return this.http.get<any[]>(`${environment.baseURL}restaurant.info?uuid=` +localStorage.uuid,
    );
  }
  
}

 