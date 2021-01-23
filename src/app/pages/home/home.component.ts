import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductoComponent } from './../components/update-producto/update-producto.component';
import { RegistrarProductoComponent } from './../components/registrar-producto/registrar-producto.component';
import { Producto as prod } from '../../interface/prodInterface.ts';
import { ProductosService } from './../../services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProductosService],
})
export class HomeComponent implements OnInit {
  @ViewChild('cyu') cyu: ElementRef<any>;

  myForm: FormGroup;
  chModal: number;
  dataupdate= [];
  id: number;
  columnas: string[] = [
    'nombre',
    'caracteristicas',
    'fechaLanz',
    'correoFab',
    'paisFab',
    'precio',
    'uniDisp',
    'unidVend',
    'acciones',
  ];
  ProductoData = [];
  dataSource: MatTableDataSource<prod>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public prodServ: ProductosService,
    public dialog: MatDialog,
    public fb: FormBuilder
  ) {
    this.chModal = 0;
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      caracteristicas: ['', [Validators.required]],
      fechaLanz: ['', [Validators.required]],
      correoFab: ['', [Validators.required]],
      paisFab: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      uniDisp: ['', [Validators.required]],
      unidVend: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllProducto();
    this.dialog.afterAllClosed.subscribe(() => {
      this.getAllProducto();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllProducto() {
    this.prodServ.findAllProductos().subscribe((res) => {
      this.ProductoData = res.producto;
      this.dataSource = new MatTableDataSource<prod>(this.ProductoData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  createProducto() {
    this.prodServ.createProducto(this.myForm.value).subscribe((res) => {
      this.getAllProducto();
      swal.fire('Success!', 'Producto registrado correctamente', 'success');
      this.cyu.nativeElement.click();
    });
  }

  updateProducto() {
    let data =this.myForm.value;
    data.id=this.id;
    this.prodServ.updateProducto(data).subscribe((res) => {
      this.getAllProducto();
      this.cyu.nativeElement.click();
      swal.fire('Success!', 'producto actualizado', 'success');
    });
  }

  changeModal(i: boolean, data: any) {
    if (i) {
      this.chModal = 1
      this.id= data._id
      this.myForm.controls['nombre'].setValue(data['nombre']);
      this.myForm.controls['caracteristicas'].setValue(data['caracteristicas']);
      this.myForm.controls['fechaLanz'].setValue(data['fechaLanz']);
      this.myForm.controls['correoFab'].setValue(data['correoFab']);
      this.myForm.controls['paisFab'].setValue(data['paisFab']);
      this.myForm.controls['precio'].setValue(data['precio']);
      this.myForm.controls['uniDisp'].setValue(data['uniDisp']);
      this.myForm.controls['unidVend'].setValue(data['unidVend']);
      // this.myForm.controls['img'].setValue(data['img']);
    } else {
      this.chModal = 0;
      this.myForm.reset();
    }
  }
  operation() {
    if (this.chModal == 1) {
      
      this.updateProducto()
      return;
    }
    this.createProducto();
  }

  deleteProducto(id: string) {
    swal
      .fire({
        title: 'Estas segur@?',
        text: '¡No podrás recuperar este registro!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.value) {
          this.prodServ.deleteProducto(id).subscribe(
            (res) => {
              this.getAllProducto();
              swal.fire(
                'Eliminado!',
                'El registro ha sido eliminado.',
                'success'
              );
            },
            (error) => {
              swal.fire('Cancelada', 'El registro está seguro :)', 'error');
            }
          );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire('Cancelada', 'El registro está seguro :)', 'error');
        }
      });
  }
}
