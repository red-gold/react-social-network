import SvgAccountCircle from '@material-ui/icons/AccountCircle';
import SvgFeedback from '@material-ui/icons/Feedback';
import HelpIcon from '@material-ui/icons/Help';
import SvgHome from '@material-ui/icons/Home';
import SvgPeople from '@material-ui/icons/People';
import SvgSettings from '@material-ui/icons/SettingsApplications';
import React from 'react';

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