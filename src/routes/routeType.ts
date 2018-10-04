import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

export interface RouteType {
    publicAuth?: boolean,
    privateAuth?: boolean,
    defaultPath?: boolean,
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
    path?: string
    
}