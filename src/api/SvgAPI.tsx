import React from 'react'
import {pure} from 'recompose'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'

const SvgIconCustom = typeof global !== 'undefined' && (global as any).__MUI_SvgIcon__ || SvgIcon

function createSvgIcon(path: any, displayName: string) {
  let Icon: any = (props: SvgIconProps) => (
    <SvgIconCustom {...props}>
      {path}
    </SvgIconCustom>
  )

  Icon.displayName = displayName
  Icon = pure(Icon)
  Icon.muiName = 'SvgIcon'

  return Icon
}

export const SvgAPI = {
  createSvgIcon
}