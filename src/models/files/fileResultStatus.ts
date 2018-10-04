import { FileResult } from './fileResult'
import { SocialError } from 'core/domain/common'

export class FileResultStatus {
  progress: number

  success: FileResult

  error: SocialError

  fileName: string
  
  meta: any
}