import { Component } from '@angular/core';

import * as posterEditorDefaultExampleHtml from '!raw-loader!./examples/default/poster-editor-default-example.component.html';
import * as posterEditorDefaultExampleTs from '!raw-loader!./examples/default/poster-editor-default-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-poster-editor',
    templateUrl: './poster-editor-docs.component.html'
})
export class PosterEditorDocsComponent {
    posterEditorDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'poster-editor-default-example',
            code: posterEditorDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: posterEditorDefaultExampleTs,
            fileName: 'poster-editor-default-example',
            component: 'PosterEditorDefaultExampleComponent'
        }
    ];
}
