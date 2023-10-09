import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordStrengthComponent } from '../app/password-strength/password-strength.component';


const routes: Routes = [{
  path: '',
  component: PasswordStrengthComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
