import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthProvider } from 'src/providers/auth';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(
    private authProvider: AuthProvider,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authProvider.getAuth().onAuthStateChanged(user => {
        if (user) this.router.navigate(['list-lavacao']);

        resolve(!user ? true : false);
      });
    });
  }
  
}
