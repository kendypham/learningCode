import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../shared/_guards/adminAuth.guard';
import { AdminComponent } from './admin.component';
const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            // { path: 'user-view', loadChildren: './components/user-list/user-list.module#UserListModule'}
            // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'forms', loadChildren: './form/form.module#FormModule' },
            // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            // { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            // { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ],
        canActivate: [AdminAuthGuard]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
