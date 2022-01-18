import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { PosterEditorHeaderComponent } from './poster-editor-header/poster-editor-header.component';
import { PosterEditorDocsComponent } from './poster-editor-docs.component';
import { examples } from './examples';
import { CorePosterEditorModule } from '@fundamental-ngx/fd/poster-editor';

const routes: Routes = [
    {
        path: '',
        component: PosterEditorHeaderComponent,
        children: [
            { path: '', component: PosterEditorDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.posterEditor } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, CorePosterEditorModule],
    exports: [RouterModule],
    declarations: [examples, PosterEditorDocsComponent, PosterEditorHeaderComponent]
})
export class PosterEditorDocsModule {}
