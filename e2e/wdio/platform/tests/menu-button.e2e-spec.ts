import { MenuButtonPo } from '../pages/menu-button.po';
import {compactAttr, tooltipAttr, textColorAttr, iconAttr, alignmentCenter, btnColorArr, cozyAndCompactBtnTextArr,
icon, disabledState, selectedItem, textAlignmentAttr, truncatedBtnNoIconTooltipText, truncatedBtnText, truncatedBtnTooltipText} from '../fixtures/appData/menu-button-contents';
import {
    browserIsIE,
    browserIsIEorSafari,
    click,
    doubleClick,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    refreshPage,
    waitForPresent,
    waitForElDisplayed
} from '../../driver/wdio';

describe('Menu button test suite', function() {
    const menuBtnPage = new MenuButtonPo();

    beforeAll(() => {
        menuBtnPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(menuBtnPage.btnArrowIconsArr);
    }, 1);

    describe('Check general menu button states', function() {
        it('should check that the arrow icon is present', () => {
            const arrayLength = getElementArrayLength(menuBtnPage.btnArrowIconsArr);

            for (let i = 0; arrayLength > i; i++) {
                expect(isElementDisplayed(menuBtnPage.btnArrowIconsArr, i)).toBe(true);
            }
        });

        it('should check selected menu option and close menu', () => {
            // skip for IE https://github.com/SAP/fundamental-ngx/issues/4058
            if (browserIsIEorSafari()) {
                console.log('Skip for Safari and IE');
                return;
            }
            click(menuBtnPage.cozyBtnArr);
            click(menuBtnPage.menuItemArr);

            expect(getText(menuBtnPage.cozySelectedItemLabel)).toEqual(selectedItem);
            expect(isElementDisplayed(menuBtnPage.menuItemOverlay)).toBe(false);
        });

        it('should check menu items visible', () => {
            // skip for IE https://github.com/SAP/fundamental-ngx/issues/4058
            if (browserIsIE()) {
                console.log('Skip for IE');
                return;
            }
            click(menuBtnPage.cozyBtnArr);
            expect(isElementDisplayed(menuBtnPage.menuItemOverlay)).toBe(true);
        });

        it('should check close menu by clicking menu btn', () => {
            // skip for IE https://github.com/SAP/fundamental-ngx/issues/4058
            if (browserIsIE()) {
                console.log('Skip for IE');
                return;
            }
            doubleClick(menuBtnPage.cozyBtnArr);
            expect(isElementDisplayed(menuBtnPage.menuItemOverlay)).toBe(false);

        });

        it('should check closing menu when clicking outside of menu', () => {
            // skip for IE https://github.com/SAP/fundamental-ngx/issues/4058
            if (browserIsIE()) {
                console.log('Skip for IE');
                return;
            }
            waitForPresent(menuBtnPage.cozyBtnArr);
            click(menuBtnPage.cozyBtnArr);
            waitForElDisplayed(menuBtnPage.menuItemOverlay);
            expect(isElementDisplayed(menuBtnPage.menuItemOverlay)).toBe(true);
            click(menuBtnPage.sectionTitle);
            expect(isElementDisplayed(menuBtnPage.menuItemOverlay)).toBe(false);
        });

    });

    describe('Check cozy and compact menu button states', function() {
        it('should check btn states', () => {
            const cozyBtnAttributeArrLength = getElementArrayLength(menuBtnPage.cozyBtnAttrArr);
            const compactBtnAttributeArrLength = getElementArrayLength(menuBtnPage.compactBtnAttrArr);

            for (let i = 0; cozyBtnAttributeArrLength > i; i++) {
                expect(getAttributeByName(menuBtnPage.cozyBtnAttrArr, 'ng-reflect-disabled', i)).toBe('false');
            }

            for (let j = 0; compactBtnAttributeArrLength > j; j++) {
                expect(getAttributeByName(menuBtnPage.compactBtnAttrArr, 'ng-reflect-disabled', j)).toBe('false');
            }

            for (let k = 0; 13 > k; k++) {
                expect(isElementDisplayed(menuBtnPage.btnWorldIconArr, k)).toBe(true);
            }
        });

        it('should check cozy btn text and colors', () => {
            const cozyBtnTextArrLength = getElementArrayLength(menuBtnPage.cozyBtnAttrArr);
            const cozyBtnArrLength = getElementArrayLength(menuBtnPage.cozyBtnArr);

            for (let i = 0; cozyBtnTextArrLength > i; i++) {
                expect(getText(menuBtnPage.cozyBtnAttrArr, i).trim()).toEqual(cozyAndCompactBtnTextArr[i]);
            }

            for (let j = 0; cozyBtnArrLength > j; j++) {
                expect(getCSSPropertyByName(menuBtnPage.cozyBtnArr, textColorAttr, j).value)
                    .toContain(btnColorArr[j]);
                expect(getCSSPropertyByName(menuBtnPage.cozyBtnArr, textAlignmentAttr, j).value)
                    .toEqual(alignmentCenter);
            }
        });

        it('should check compact btn text and colors', () => {
            const compactBtnTextArrLength = getElementArrayLength(menuBtnPage.compactBtnAttrArr);
            const compactBtnArrLength = getElementArrayLength(menuBtnPage.compactBtnArr);

            for (let i = 0; compactBtnTextArrLength > i; i++) {
                expect(getText(menuBtnPage.compactBtnAttrArr, i).trim())
                    .toEqual(cozyAndCompactBtnTextArr[i]);
            }

            for (let j = 0; compactBtnArrLength > j; j++) {
                expect(getCSSPropertyByName(menuBtnPage.compactBtnArr, textColorAttr, j).value)
                    .toContain(btnColorArr[j]);
                expect(getCSSPropertyByName(menuBtnPage.compactBtnArr, textAlignmentAttr, j).value)
                    .toEqual(alignmentCenter);
                expect(getAttributeByName(menuBtnPage.compactBtnArr, compactAttr)).toEqual('true');
            }
        });
    });

    describe('Check types of menu buttons', function() {

        it('should check disabled buttons', () => {
            // https://github.com/SAP/fundamental-ngx/issues/3757 first btn is enabled, start from 0 after fix
            for (let i = 1; 6 > i; i++) {
                expect(getAttributeByName(menuBtnPage.menuTypeBtnAttrArr, disabledState, i)).toEqual('true');
            }
        });

        it('should check btn with and without icon', () => {
            waitForElDisplayed(menuBtnPage.menuTypeBtnArr, 0);
            expect(getAttributeByName(menuBtnPage.menuTypeBtnArr, iconAttr, 6)).toBe(icon);
            expect(getText(menuBtnPage.menuTypeBtnArr, 6).trim()).toEqual(cozyAndCompactBtnTextArr[0]);
            expect(getAttributeByName(menuBtnPage.menuTypeBtnArr, iconAttr, 7)).toBe(null);
            expect(getText(menuBtnPage.menuTypeBtnArr, 7).trim()).toEqual(cozyAndCompactBtnTextArr[0]);
            expect(getAttributeByName(menuBtnPage.menuTypeBtnArr, iconAttr, 8)).toBe(icon);
            expect(getText(menuBtnPage.menuTypeBtnArr, 8).trim()).toBe('');
        });

        it('should check compact btn with and without icon', () => {
            expect(getAttributeByName(menuBtnPage.menuTypeBtnArr, iconAttr, 9)).toBe(icon);
            expect(getText(menuBtnPage.menuTypeBtnArr, 9).trim()).toEqual(cozyAndCompactBtnTextArr[0]);
            expect(getAttributeByName(menuBtnPage.menuTypeBtnArr, iconAttr, 10)).toBe(null);
            expect(getText(menuBtnPage.menuTypeBtnArr, 10).trim()).toEqual(cozyAndCompactBtnTextArr[0]);
            expect(getAttributeByName(menuBtnPage.menuTypeBtnArr, iconAttr, 11)).toBe(icon);
            expect(getText(menuBtnPage.menuTypeBtnArr, 11).trim()).toBe('');

            for (let i = 9; 12 > i; i++) {
                expect(getAttributeByName(menuBtnPage.menuTypeBtnArr, compactAttr, i)).toBe('true');
            }
        });

        it('should check long text menu btn with and without icon', () => {
            expect(getAttributeByName(menuBtnPage.menuTypeBtnArr, iconAttr, 12)).toContain(icon);
            expect(getText(menuBtnPage.menuTypeBtnArr, 12).trim()).toEqual(truncatedBtnText);
            expect(getAttributeByName(menuBtnPage.menuTypeBtnArr, tooltipAttr, 12))
                .toContain(truncatedBtnTooltipText);
            expect(getAttributeByName(menuBtnPage.menuTypeBtnArr, iconAttr, 13)).toBe(null);
            expect(getText(menuBtnPage.menuTypeBtnArr, 13).trim()).toEqual(truncatedBtnText);
            expect(getAttributeByName(menuBtnPage.menuTypeBtnArr, tooltipAttr, 13))
                .toBe(truncatedBtnNoIconTooltipText);
        });
    });

    describe('Check orientations', function() {
        it('should check LTR orientation', () => {
            const areaContainersArrayLength = getElementArrayLength(menuBtnPage.exampleAreaContainersArr);

            for (let i = 0; areaContainersArrayLength > i; i++) {
                expect(getCSSPropertyByName(menuBtnPage.exampleAreaContainersArr, 'direction', i).value)
                    .toBe('ltr', 'css prop direction ');
            }
        });

        it('should check RTL orientation', () => {
            menuBtnPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            menuBtnPage.saveExampleBaselineScreenshot('menu-button');
            expect(menuBtnPage.compareWithBaseline('menu-button')).toBeLessThan(1);
        });
    });
})
;
