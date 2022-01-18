import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterEditorComponent } from './poster-editor.component';

describe('PosterEditorComponent', () => {
    let component: PosterEditorComponent;
    let fixture: ComponentFixture<PosterEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PosterEditorComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PosterEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
