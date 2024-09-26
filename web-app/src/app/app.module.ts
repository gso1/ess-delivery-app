import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { NgxCurrencyModule } from "ngx-currency";
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionService } from './promotion/promotion.service';
import { TableComponent } from './views/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './admin/admin.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { BarComponent } from './views/bar/bar.component';
import { OrdersComponent } from './user/orders/orders.component';
import { LoginService } from './login/login.service';
import { LogoComponent } from './views/logo/logo.component';
import { EditComponent } from './promotion/edit/edit.component';
import { EditService } from './promotion/edit/edit.service';
import { LocalStorageService } from './local-storage.service';

import { CurrentOrderComponent } from './user/current-order/current-order.component';
import { OrdersService } from './user/orders/orders.service';
import { CurrentOrderService } from './user/current-order/current-order.service';
import { LogoutComponent } from './views/logout/logout.component';

import { EmailComponent } from './email/email.component';
import { EmailService } from './email/email.service';

import { PaymentComponent } from './payment/payment.component';
import { AddpaymentComponent } from './addpayment/addpayment.component';
import { InsertcreditComponent } from './insertcredit/insertcredit.component';
import { InsertdebitComponent } from './insertdebit/insertdebit.component';
import { PaymentService } from './payment/payment.service';
import { InsertcreditService } from './insertcredit/insertcredit.service';
import { InsertdebitService } from './insertdebit/insertdebit.service';
import { PaypalComponent } from './paypal/paypal.component';
import { ErasepayComponent } from './erasepay/erasepay.component';
import { PaypalService } from './paypal/paypal.service';
import { PicpayService } from './picpay/picpay.service';
import { ErasepayService } from './erasepay/erasepay.service';
import { PicpayComponent } from './picpay/picpay.component';
import { EditpayComponent } from './editpay/editpay.component';
import { EditpayService } from './editpay/editpay.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PromotionComponent,
    TableComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    BarComponent,
    OrdersComponent,
    LogoComponent,
    EditComponent,
    CurrentOrderComponent,
    LogoutComponent,
    EmailComponent,
    PaymentComponent,
    AddpaymentComponent,
    InsertcreditComponent,
    InsertdebitComponent,
    PaypalComponent,
    PicpayComponent,
    ErasepayComponent,
    EditpayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MatTableModule,
    MatDialogModule,
    NgxCurrencyModule,
    MatSelectModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'promotion/:type/:id',
        component: AdminComponent
      },
      {
        path: 'promotion/admin',
        component: AdminComponent
      },
      {
        path: 'admin/add',
        component: PromotionComponent
      },
      {
        path: 'promotion/admin/edit/:id',
        component: EditComponent
      },
      {
        path: 'promotion/rest/edit/:name/:id',
        component: EditComponent
      },
      {
        path: 'promotion/:type/:id/:action',
        component: PromotionComponent
      },
      {
        path: 'login/:type',
        component: LoginComponent
      },
      {
        path: 'user/:id/profile',
        component: ProfileComponent
      },
      {
        path: 'user/:id/order',
        component: CurrentOrderComponent
      },
      {
        path: 'user/:id/orders',
        component: OrdersComponent
      },
      {
        path: 'finished-order',
        component: EmailComponent
  
      },
      {
        path: 'user/pay',
        component: PaymentComponent
      },
      {
        path: 'addpayment',
        component: AddpaymentComponent
      },
      {
        path: 'addpayment/insertcredit',
        component: InsertcreditComponent
      },
      {
        path: 'addpayment/insertdebit',
        component: InsertdebitComponent
      },
      {
        path: 'addpayment/paypal',
        component: PaypalComponent
      },
      {
        path: 'addpayment/picpay',
        component: PicpayComponent
      },
      {
        path: 'erasepayment',
        component:ErasepayComponent
      },
      {
        path: 'editpayment',
        component:EditpayComponent
      }   

    ]),
    BrowserAnimationsModule
  ],

  providers: [
    PromotionService, 
    AdminService, 
    LoginService, 
    EditService, 
    LocalStorageService, 
    CurrentOrderService, 
    EmailService,  
    PaymentService, 
    InsertcreditService, 
    InsertdebitService, 
    EditpayService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
