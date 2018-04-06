export interface Tidsperiode {
    /** Dato fra og med */
    startdato: Date;
    /** Dato til og med */
    sluttdato: Date;
}

export interface Avgrensninger {
    /** Første valgbare dato */
    minDato?: Date;
    /** Siste valgbare dato */
    maksDato?: Date;
    /** Tidsperioder som en ikke skal kunne velge */
    ugyldigeTidsperioder?: Tidsperiode[];
    /** Om bruker skal kunne velge lørdag eller søndag. Default true  */
    helgedagerIkkeTillatt?: boolean;
}

export interface FraseDato {
    date: string;
}

export type KalenderPlassering = 'under' | 'fullskjerm';

export interface DatovelgerPhrases {
    calendarLabel: string;
    closeDatePicker: string;
    clearDate: string;
    jumpToPrevMonth: string;
    jumpToNextMonth: string;
    keyboardShortcuts: string;
    showKeyboardShortcutsPanel: string;
    hideKeyboardShortcutsPanel: string;
    openThisPanel: string;
    enterKey: string;
    leftArrowRightArrow: string;
    upArrowDownArrow: string;
    pageUpPageDown: string;
    homeEnd: string;
    escape: string;
    questionMark: string;
    selectFocusedDate: string;
    moveFocusByOneDay: string;
    moveFocusByOneWeek: string;
    moveFocusByOneMonth: string;
    moveFocustoStartAndEndOfWeek: string;
    returnFocusToInput: string;
    keyboardNavigationInstructions: string;
    chooseAvailableDate: (d: FraseDato) => any;
    dateIsUnavailable: (d: FraseDato) => string;
    dateIsSelected: (d: FraseDato) => string;
}
