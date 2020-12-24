import {
    pause,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForClickable,
    waitForUnclickable,
    sendKeys,
    waitForPresent,
    click,
    clearValue,
    setValue,
    getElementArrayLength,
    browserIsIEorSafari,
    getText,
    getTextArr
} from '../../driver/wdio';
import { ComboBoxPo } from '../pages/combobox.po';
import {activeTypeNames, notActiveTypeNames, appleOption, bananaOption} from '../fixtures/appData/combobox.page-content';
import { checkNotFocused, checkTextValueContain } from '../../helper/assertion-helper';

describe('Combobox test suite', function() {
    const comboBoxPage: ComboBoxPo = new ComboBoxPo();

    beforeAll(() => {
        comboBoxPage.open();
    });

    beforeEach(() => {
        pause(16000);
    });

    afterEach(() => {
        refreshPage();
    });

    it('Verify each combobox consist of input and button', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            scrollIntoView(comboBoxPage.comboBoxButtons(activeTypeNames[i]));
            waitForElDisplayed(comboBoxPage.comboBoxButtons(activeTypeNames[i]));
            scrollIntoView(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
            waitForElDisplayed(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
            waitForClickable(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
        }
        for (let i = 0; i < notActiveTypeNames.length; i++) {
            scrollIntoView(comboBoxPage.comboBoxInputs(notActiveTypeNames[i]));
            waitForElDisplayed(comboBoxPage.comboBoxInputs(notActiveTypeNames[i]));
            waitForUnclickable(comboBoxPage.comboBoxInputs(notActiveTypeNames[i]));
        }
    });

    it('Verify dropdown expands after clicking on the button', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            sendKeys(['Escape'])
            scrollIntoView(comboBoxPage.comboBoxButtons(activeTypeNames[i]));
            pause(200);
            click(comboBoxPage.comboBoxButtons(activeTypeNames[i]));
            pause(500);
            waitForPresent(comboBoxPage.comboBoxExpandedButtons(activeTypeNames[i]));
            waitForPresent(comboBoxPage.comboBoxDropdownExpanded);
        }
    });

    it('Verify each input while typing', () => {
        for (let i = 0; i < activeTypeNames.length - 1; i++) {
            scrollIntoView(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
            clearValue(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
            setValue(comboBoxPage.comboBoxInputs(activeTypeNames[i]), appleOption.substring(0, 2));
            comboBoxPage.selectOption(activeTypeNames[i], appleOption);
            waitForElDisplayed(comboBoxPage.filledComboBoxInputs(activeTypeNames[i], appleOption));
        }
    });

    it('Verify dropdown collapsed after selecting an option', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            comboBoxPage.selectOption(activeTypeNames[i], appleOption);
            checkNotFocused(comboBoxPage.comboBoxInput, i);
        }
    });

    it('Verify selected option is highlighted', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            comboBoxPage.selectOption(activeTypeNames[i], appleOption);
            expect(comboBoxPage.optionsArray).not.toBeVisible();
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            waitForElDisplayed(comboBoxPage.selectedDropDownOption(appleOption));
            comboBoxPage.selectOption(activeTypeNames[i], bananaOption);
            expect(comboBoxPage.optionsArray).not.toBeVisible();
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            waitForElDisplayed(comboBoxPage.selectedDropDownOption(bananaOption));
        }
    });

    // Need to debug on different browsers
    it('Verify option hint when entering first characters', () => {
        for (let i = 0; i < activeTypeNames.length - 1; i++) {
            if (activeTypeNames[i] !== 'optionItemTemplate' && !browserIsIEorSafari()) {  // Skipped for IE and Safari
                sendKeys(['Escape']);
                scrollIntoView(comboBoxPage.comboBoxInputs(activeTypeNames[i]));
                setValue(comboBoxPage.comboBoxInputs(activeTypeNames[i]), appleOption.substring(0, 2));
                pause(300);
                waitForElDisplayed(comboBoxPage.comboBoxOptionHint(appleOption.substring(0, 2), appleOption.substring(2)));
            }
        }
    });

    it('Verify LTR and RTL orientation', () => {
        comboBoxPage.checkRtlSwitch();
    });

    it('Verify group headers are not interactive.', () => {
        const headersQuantity = getElementArrayLength(comboBoxPage.groupHeader);
        comboBoxPage.expandDropdown('group');
        for (let i = 0; i < headersQuantity; i++) {
            scrollIntoView(comboBoxPage.groupHeader, i);
            click(comboBoxPage.groupHeader, i);
            waitForElDisplayed(comboBoxPage.comboBoxDropdownExpanded);
        }
    });

    it('Verify navigation by arrow buttons', () => {
        for (let i = 0; i < activeTypeNames.length; i++) {
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            const firstOptionText = getText(comboBoxPage.optionsArray, 0);
            const secondOptionText = getText(comboBoxPage.optionsArray, 1);
            sendKeys(['ArrowDown']);
            sendKeys(['Enter']);
            let inputText = getText(comboBoxPage.comboBoxInput, i);
            checkTextValueContain(firstOptionText, inputText);
            comboBoxPage.expandDropdown(activeTypeNames[i]);
            sendKeys(['ArrowDown', 'ArrowDown']);
            sendKeys(['Enter']);
            inputText = getText(comboBoxPage.comboBoxInput, i);
            checkTextValueContain(secondOptionText, inputText);
        }
    });

    it('Verify combobox with two columns while typing', () => {
        scrollIntoView(comboBoxPage.comboboxTwoColumns);
        setValue(comboBoxPage.comboboxTwoColumns, 'Frui');
        comboBoxPage.selectOption('columns', 'Banana');
    });

    it('Verify options sorting', () => {
       for (let i = 0; i < activeTypeNames.length; i++) {
           comboBoxPage.expandDropdown(activeTypeNames[i]);
           waitForElDisplayed(comboBoxPage.optionsArray);
           const textArr = getTextArr(comboBoxPage.optionsArray, 0, -1);
           expect(textArr.sort()).toEqual(textArr);
       }
    });
});
