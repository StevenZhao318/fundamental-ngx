import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fd-poster-editor',
    templateUrl: './poster-editor.component.html',
    styleUrls: ['./poster-editor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosterEditorComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
