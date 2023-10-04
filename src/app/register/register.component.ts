import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
/*Below you will make a Validator Function for your Register Component, so your users can follow registration
  rules. You will inject your toastr component to make notifications to the users.
   Make sure to Import FormBuilder, Validators, ToastrService, AuthService, 
   and Router Components */
   
  constructor(private builder:FormBuilder, private toastr:ToastrService, private service: AuthService,
    private router:Router) {

  }

  registerform=this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])), // Make Validators for Password
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    gender:this.builder.control('male'), // You setting the default value to Male
    role:this.builder.control(''),
    isActive:this.builder.control(false),  // You setting the default value to False
    bio:this.builder.control('',Validators.required)
  });

  /* Below this proceedregistration() function will send the users a notification to enter valid data, 
     when registering
  */
  proceedregistration() {
    if(this.registerform.valid) {
      this.service.Proceedregister(this.registerform.value).subscribe(res => {
        this.toastr.success('Please contact Admin for enable access','Registered Sucessfully!');
        this.router.navigate(['login']); // This will reroute the users back to Login Page
      });
    }else{
      this.toastr.warning('Please enter valid data!');
    }
  }
}
