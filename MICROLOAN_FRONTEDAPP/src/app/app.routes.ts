import { Routes } from '@angular/router';

/* ---------------------- Admin Components ---------------------- */
import { Dashboard } from './component/admin/dashboard/dashboard';
import { LoansComponent } from './component/admin/loans/loans';
import { Login as AdminLogin } from './component/admin/adminlogin/login';
import { Reports } from './component/admin/reports/reports';
import { Users } from './component/admin/users/users';

/* ---------------------- User Components ---------------------- */
import { Applications } from './component/user/applications/applications';
import { Login as UserLogin } from './component/user/login/login';
import { Notifications } from './component/user/notifications/notifications';
import { Register } from './component/user/register/register';
import { Repayments } from './component/user/repayments/repayments';
import { LoanProductsComponent } from './component/user/loanproducts/loanproducts';

import { Landingpage } from './component/user/landingpage/landingpage';
import { LoanDetailsComponent } from './component/user/loan-details/loan-details';
import { authGuard } from './component/service/auth.guard';

/* ---------------------- Routes ---------------------- */
export const routes: Routes = [
  { path: '', redirectTo: '/landingpage', pathMatch: 'full' },

  // Public routes
  { path: 'landingpage', component: Landingpage },

  /* --- Admin Routes --- */
  { path: 'admin/login', component: AdminLogin },
  { path: 'admin/dashboard', component: Dashboard},
  { path: 'admin/loans', component: LoansComponent },
  { path: 'admin/reports', component: Reports},
  { path: 'admin/users', component: Users },

  /* --- User Routes --- */
  { path: 'user/login', component: UserLogin },
  { path: 'user/register', component: Register },
  { path: 'user/loanproducts', component: LoanProductsComponent, canActivate: [authGuard] },
  { path: 'user/applications', component: Applications, canActivate: [authGuard] },
  { path: 'user/notifications', component: Notifications, canActivate: [authGuard] },
  { path: 'user/repayments', component: Repayments, canActivate: [authGuard] },
  { path: 'user/loan-details/:id', component: LoanDetailsComponent, canActivate: [authGuard] },

  /* --- Fallback (404) --- */
  { path: '**', redirectTo: '/landingpage' },
  { path: '**', redirectTo: 'user/register' , pathMatch: 'full' }
];
