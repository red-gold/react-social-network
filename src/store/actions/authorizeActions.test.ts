import 'reflect-metadata'
import * as authorizeActions from './authorizeActions'
import { AuthorizeActionType } from 'constants/authorizeActionType'
import { LoginUser } from 'core/domain/authorize'
import {Map} from 'immutable'

describe('Authorize Acitons', () => {
    it('should create an action to login', () => {
      const user = new LoginUser('1234', true, '2434', 'displayName', 'email@email.com',
      'http://avatar', true,true,false)
      const expectedAction = {
        type: AuthorizeActionType.LOGIN,
        payload: Map(user)
      }
      expect(authorizeActions.login(user)).toEqual(expectedAction)
    })
  })