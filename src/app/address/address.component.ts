import { Component, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray} from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  userForm : FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm =  this.fb.group({
      userId : new FormControl('', Validators.required),
      userName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      email: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)]),
      address: this.fb.array([]),
      state: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }

  

  
  ngOnInit() {
    
  }

  // Getter for easy access to form controls in the template
  get profile() { 
    return this.userForm.controls; 
  }
  

  get address(): FormArray {
    return this.userForm.get('address') as FormArray;
  }

  newAddress(): FormGroup {
    return this.fb.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }

  addAddress(){ 
    this.address.push(this.newAddress())
  }

  onSubmit() {
    // Logic to handle form submission
    if (this.userForm.valid) {
      console.log(this.userForm.value); // Replace with actual submission logic
    } else {
      // Mark all fields as touched to display validation messages
      this.userForm.markAllAsTouched();
    }
  }

 

}
