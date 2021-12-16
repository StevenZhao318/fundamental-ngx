import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef } from '@angular/core';

import { BaseListItem } from '../base-list-item';
import { ListConfig } from '../list.config';

@Component({
    selector: 'fdp-standard-list-item',
    templateUrl: './standard-list-item.component.html',
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => StandardListItemComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandardListItemComponent extends BaseListItem {
    /** @hidden */
    constructor(
        _changeDetectorRef: ChangeDetectorRef,
        public itemEl: ElementRef<HTMLElement>,
        protected _listConfig: ListConfig
    ) {
        super(_changeDetectorRef, itemEl, _listConfig);
    }
}
