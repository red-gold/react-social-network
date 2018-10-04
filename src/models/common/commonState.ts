import { TempState } from 'models/common/tempState'
import { ProgressState } from 'models/common/progressState'

export class CommonState {
    constructor(
       public defaultLoadDataStatus: boolean,
       public showTopLoading: boolean,
       public message: string,
       public topLoadingQueue: number,
       public headerTitle: string,
       public progress: ProgressState,
       public loadingStatus: boolean,
       public messageOpen: boolean,
       public temp: TempState,
       public windowWidth: number,
       public masterLoadingQueue: number,
       public windowHeight: number,
       public showMasterLoading: boolean,
       public sendFeedbackStatus: boolean,
    ) { }
}