export interface IMasterLoadingComponentProps {
    error?: boolean
    timedOut?: boolean
    pastDelay?: boolean,
    theme?: any
    t?: (key: string) => string
}
