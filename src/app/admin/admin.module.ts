import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddArticuloComponent } from './add-articulo/add-articulo.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SafeHtmlPipe } from './safe-html.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { GestionarCategoriasSubcategoriasMarcasComponent } from './gestionar-categorias-subcategorias-marcas/gestionar-categorias-subcategorias-marcas.component';
import { InputCategoriaSubcategoriaMarcaComponent } from './gestionar-categorias-subcategorias-marcas/input-categoria-subcategoria-marca/input-categoria-subcategoria-marca.component';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PipesModule } from '../pipes/pipes.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { DefaultBottomSheetComponent } from './default-bottom-sheet/default-bottom-sheet.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsuarioPedidosComponent } from './usuarios/usuario-pedidos/usuario-pedidos.component';
import { UsuarioPedidoArticulosComponent } from './usuarios/usuario-pedidos/usuario-pedido-articulos/usuario-pedido-articulos.component';
import { ModificarPedidoEstadoComponent } from './pedidos/modificar-pedido-estado/modificar-pedido-estado.component';
import { ModificarPasswordComponent } from './usuarios/modificar-password/modificar-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AjustesComponent } from './ajustes/ajustes.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AdminComponent,
    AddArticuloComponent,
    ArticulosComponent,
    PedidosComponent,
    UsuariosComponent,
    SafeHtmlPipe,
    GestionarCategoriasSubcategoriasMarcasComponent,
    InputCategoriaSubcategoriaMarcaComponent,
    DefaultBottomSheetComponent,
    UsuarioPedidosComponent,
    UsuarioPedidoArticulosComponent,
    ModificarPedidoEstadoComponent,
    ModificarPasswordComponent,
    AjustesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    TextFieldModule,
    MatSelectModule,
    AngularEditorModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatListModule,
    MatRippleModule,
    DragDropModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    PipesModule,
    MatDividerModule,
    MatMenuModule,
    MatExpansionModule,
    MatDialogModule,
    MatTabsModule
  ], entryComponents: [
    UsuarioPedidosComponent,
    ModificarPedidoEstadoComponent
  ],
  exports: [
    UsuarioPedidoArticulosComponent
  ]
})
export class AdminModule { }
