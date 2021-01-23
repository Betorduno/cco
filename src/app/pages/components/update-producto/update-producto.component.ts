import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.scss']
})
export class UpdateProductoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateProductoComponent>
  ) { }

  ngOnInit(): void {
  }

}
