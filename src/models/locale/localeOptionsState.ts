export class LocaleOptionState {
    constructor(
       public renderInnerHtml: boolean,
       public showMissingTranslationMsg: boolean,
       public missingTranslationMsg: string,
       public ignoreTranslateChildren: boolean,
    ) { }
}