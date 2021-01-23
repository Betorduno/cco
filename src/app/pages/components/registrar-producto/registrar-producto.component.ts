import { ProductosService } from './../../../services/productos.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import swal from'sweetalert2';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.scss']
})
export class RegistrarProductoComponent implements OnInit {

  assist: FormGroup;
  usersData = [];
  startDate = new Date();
  filteredOptions: Observable<string[]>;
  @Input() anteMeridiemAbbreviation = 'am';
  @Input() postMeridiemAbbreviation = 'pm';

  constructor(
    public prodServ: ProductosService,
    public dialogRef: MatDialogRef<RegistrarProductoComponent>
  ) {
   }

  ngOnInit(): void {
    this.assist = new FormGroup({
      fecha: new FormControl('', Validators.required),
      note: new FormControl(''),
      time: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required)
    });
  }

  createAssistance() {
    this.prodServ.createProducto(this.assist.value).subscribe((res )=>{
      this.assist.reset();
      this.dialogRef.close();
      swal.fire({    
        icon: 'success',  
        title: 'Asistencia',  
        showConfirmButton: true, 
        text: 'El registro fue credo correctamente'
      }) 
    }, 
    (error)=>{
      console.log(error);
      swal.fire({    
        icon: 'error',  
        title: 'Asistencia',  
        showConfirmButton: true, 
        text: 'El registro no se creo, comuniquese con soporte.'
      })
    }
    )
  }

}
