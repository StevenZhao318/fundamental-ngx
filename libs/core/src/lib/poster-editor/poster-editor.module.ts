import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterEditorComponent } from './poster-editor.component';

@NgModule({
    imports: [CommonModule],
    exports: [PosterEditorComponent],
    declarations: [PosterEditorComponent]
})
export class CorePosterEditorModule {}
