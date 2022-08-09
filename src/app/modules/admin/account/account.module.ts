import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SharedModule } from 'app/shared/shared.module';
import { FormIncomeComponent } from './form-income/form-income.component';
import { FormExpenseComponent } from './form-expense/form-expense.component';
import { FuseAlertModule } from '@fuse/components/alert';

const accountRoutes: Route[] = [
    {
        path: '',
        component: AccountComponent,
    },
];

@NgModule({
    declarations: [AccountComponent, FormIncomeComponent, FormExpenseComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(accountRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatRadioModule,
        MatSelectModule,
        FuseCardModule,
        SharedModule,
        MatDatepickerModule,
        MatMomentDateModule,
        FuseAlertModule
    ],
})
export class AccountModule {}
