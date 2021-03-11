import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {CommentComponent} from './comment/comment.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClientModule} from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {NewCommentDialogComponent} from './comment/dialog/new-comment-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    NewCommentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Material
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule {
}
