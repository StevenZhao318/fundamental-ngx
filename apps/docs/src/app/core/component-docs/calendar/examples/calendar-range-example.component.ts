import { Component } from '@angular/core';
import { DateRange, DatetimeAdapter, DATE_TIME_FORMATS, FdDate, FdDatetimeAdapter, FD_DATETIME_FORMATS } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-calendar-range-example',
    template: ` <fd-calendar
            [calType]="'range'"
            [disableFunction]="myDisableFunction2"
            [disableRangeStartFunction]="myDisableStartFunction"
            [disableRangeEndFunction]="myDisableEndFunction"
            [(ngModel)]="selected"
        >
        </fd-calendar>
        <br />
        <div>Selected First Date: {{ selected.start }}</div>
        <br />
        <div>Selected Last Date: {{ selected.end }}</div>`,
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ]
})
export class CalendarRangeExampleComponent {
    selected: DateRange<FdDate> = new DateRange(new FdDate(2019, 10, 11), new FdDate(2019, 10, 19));

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    myDisableFunction2 = (date: FdDate): boolean => {
        const day = this.datetimeAdapter.getDayOfWeek(date);
        return day === 1;
    };

    myDisableStartFunction = (date: FdDate): boolean => {
        return this.datetimeAdapter.compareDate(date, new FdDate(2019, 10, 10)) > 0;
    };

    myDisableEndFunction = (date: FdDate): boolean => {
        return this.datetimeAdapter.compareDate(date, new FdDate(2019, 10, 20)) < 0;
    };
}
