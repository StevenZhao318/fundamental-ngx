import { FocusMonitor } from '@angular/cdk/a11y';
import { ViewportRuler } from '@angular/cdk/scrolling';

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    TemplateRef,
    ViewChild,
    ContentChild,
    ViewEncapsulation
} from '@angular/core';
import { BreadcrumbComponent, FacetComponent } from '@fundamental-ngx/core';
import { Subscription } from 'rxjs';

import { DynamicPageBackgroundType, DynamicPageResponsiveSize } from '../../constants';
import { DynamicPageGlobalActionsComponent } from '../actions/global-actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from '../actions/layout-actions/dynamic-page-layout-actions.component';
import { DynamicPageKeyInfoComponent } from '../key-info/dynamic-page-key-info.component';

/**
 * Dynamic Page Title Component.
 *
 */
@Component({
    selector: 'fdp-dynamic-page-title',
    templateUrl: './dynamic-page-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageTitleComponent {
    /**
     * Page Title
     */
    @Input()
    title: string;

    /**
     * Page Subtitle
     */
    @Input()
    subtitle: string;

    /** Whether should be on compact mode */
    @Input()
    compact = false;

    /**
     * @hidden
     * the reference to breadcrumb title container
     */
    @Input()
    background: DynamicPageBackgroundType;

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
    @Input()
    size: DynamicPageResponsiveSize;

    /** reference to global actions component */
    @ContentChild(DynamicPageGlobalActionsComponent)
    globalActionsComponent: DynamicPageGlobalActionsComponent;

    /** reference to layout actions component */
    @ContentChild(DynamicPageLayoutActionsComponent)
    layoutActionsComponent: DynamicPageLayoutActionsComponent;

    /** reference to key-info component */
    @ContentChild(DynamicPageKeyInfoComponent)
    keyInfoComponent: DynamicPageKeyInfoComponent;

    /**
     * @hidden
     * The component view is wrapped in ng-template so
     * component's consumer have to use this templateRef to render it
     * in its view.
     *
     * The template reference to the component view.
     */
    @ViewChild('contentTemplateRef')
    contentTemplateRef: TemplateRef<any>;
}
