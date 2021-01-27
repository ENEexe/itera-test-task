import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSnackBarModule } from "@angular/material/snack-bar";

const materialComponents = [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatListModule,
];

@NgModule({
    imports: [materialComponents],
    exports: [materialComponents],
})
export class MaterialModule {}
