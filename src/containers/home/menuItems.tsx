import React from 'react'
import Divider from '@material-ui/core/Divider'
import SvgArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import SvgHome from '@material-ui/icons/Home'
import SvgFeedback from '@material-ui/icons/Feedback'
import SvgSettings from '@material-ui/icons/SettingsApplications'
import SvgAccountCircle from '@material-ui/icons/AccountCircle'
import SvgPeople from '@material-ui/icons/People'
import CompanyIcon from '@material-ui/icons/Business'
import SponserIcon from '@material-ui/icons/Money'
import HelpIcon from '@material-ui/icons/Help'
import FunIcon from '@material-ui/icons/HotTub'

export const menuItems = (userId: string, translate: (key: string) => string, onFeedback: () => void) => [
    {
      label: translate!('sidebar.home'),
      path: '/',
      icon: <SvgHome />
    },
    {
      label: translate!('sidebar.profile'),
      path: `/${userId}`,
      icon: <SvgAccountCircle />
    },
    {
      label: translate!('sidebar.people'),
      path: `/people`,
      icon: <SvgPeople />
    },
    {
      divider: true
    },
    {
      label: translate!('sidebar.settings'),
      path: `/settings`,
      icon: <SvgSettings />
    },
    {
      label: translate!('sidebar.sendFeedback'),
      onClick: () => onFeedback(),
      icon: <SvgFeedback />
    },
    {
      divider: true
    },
    {
      label: translate!('sidebar.help'),
      path: `/help`,
      icon: <HelpIcon />,
    },

  ]