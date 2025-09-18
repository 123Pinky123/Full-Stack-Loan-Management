import { Routes } from '@angular/router';

/* ------------------ Admin Components ------------------ */
import { Dashboard } from './component/admin/dashboard/dashboard';
import { Loans } from './component/admin/loans/loans';
import { Login as AdminLogin } from './component/admin/adminlogin/login';
import { Reports } from './component/admin/reports/reports';
import { Users } from './component/admin/users/users';

/* ------------------ User Components ------------------ */
import { Applications } from './component/user/applications/applications';
import { LandingpageComponent } from './component/user/landingpage/landingpage';
import { login as UserLogin } from './component/user/login/login';
import { Notifications } from './component/user/notifications/notifications';
import { Register } from './component/user/register/register';
import { Repayments } from './component/user/repayments/repayments';
import { Loanproducts } from './component/user/loanproducts/loanproducts';

/* ------------------ Routes ------------------ */
export const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: 'user/landingpage', pathMatch: 'full' },

  // Admin Routes
  { path: 'admin/dashboard', component: Dashboard },
  { path: 'admin/loans', component: Loans },
  { path: 'admin/login', component: AdminLogin },
  { path: 'admin/reports', component: Reports },
  { path: 'admin/users', component: Users },

  // User Routes
  { path: 'user/landingpage', component: LandingpageComponent },
  { path: 'user/loanproducts', component: Loanproducts },
  { path: 'user/applications', component: Applications },
  { path: 'user/notifications', component: Notifications },
  { path: 'user/repayments', component: Repayments },
  { path: 'user/login', component: UserLogin },
  { path: 'user/register', component: Register },

  // Fallback route
  { path: '**', redirectTo: 'user/landingpage' }
];
