// - Import react components
import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Map } from 'immutable'

import config from 'src/config'
import queryString from 'query-string'
import { translate, Trans } from 'react-i18next'

// - Material UI
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grow from '@material-ui/core/Grow'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import GroupIcon from '@material-ui/icons/Group'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
// - Import components
import UserAvatarComponent from 'components/userAvatar'
import Notify from 'components/notify'
import RecentChatComponent from 'components/recentChat'

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import * as authorizeActions from 'store/actions/authorizeActions'

import { ISearchBoxProps } from './ISearchBoxProps'
import { ISearchBoxState } from './ISearchBoxState'
import { userSelector } from 'store/reducers/users/userSelector'
import { searchBoxStyles } from './searchBoxStyles'
import StringAPI from 'api/StringAPI'

// - Create HomeHeader component class
export class SearchBoxComponent extends Component<ISearchBoxProps, ISearchBoxState> {

  /**
   * Component constructor
   *
   */
  constructor(props: ISearchBoxProps) {
    super(props)

    // const params = queryString.parse(props.location.search)
    // Default state
    this.state = {
      /**
       * Search text
       */
      searchText: '',

      /**
       * Whether search list is displayed
       */
      listDisplayed: false

    }

    // Binding functions to `this`
    this.handleSearchPosts = this.handleSearchPosts.bind(this)
    this.handleSearchUsers = this.handleSearchUsers.bind(this)
    this.handleOpenList = this.handleOpenList.bind(this)
    this.handleCloseList = this.handleCloseList.bind(this)
  }

  /**
   * Handle search on change
   */
  handleChange = (prop: any) => (event: any) => {
    let listDisplayed = false
    if (prop === 'searchText') {
      listDisplayed = true
    }
    this.setState({ [prop]: event.target.value, listDisplayed })
  }

  /**
   * Handle resize event for window to manipulate home header status
   */
  handleResize = (event: any) => {

  }

  /**
   * Handle open search list
   */
  handleOpenList = () => {
    this.setState({
      listDisplayed: true
    })
  }

  /**
   * Handle close search list
   */
  handleCloseList = () => {
    this.setState({
      listDisplayed: false
    })
  }

  /**
   * Handle search posts
   */
  handleSearchPosts(event: any) {
    const { searchText } = this.state
    const { goTo } = this.props

    if (goTo && searchText && !StringAPI.isEmpty(searchText)) {
      goTo(`/search/post?q=${searchText}`)
      this.handleCloseList()
    }
  }

  /**
   * Handle search users
   */
  handleSearchUsers() {
    const { searchText } = this.state
    const { goTo } = this.props

    if (goTo && searchText && !StringAPI.isEmpty(searchText)) {
      goTo(`/search/user?q=${searchText}`)
    this.handleCloseList()

    }
  }

  /**
   * Handle mouse down prevent default
   */
  handleMouseDown = (event: any) => {
    event.preventDefault()
  }

  // Render app DOM component
  render() {
    const { classes, t, theme } = this.props
    const { searchText, listDisplayed } = this.state

    const searchList = (
      <div className={classNames(classes.searchList)}>
        <ListItem button
          onMouseDown={this.handleMouseDown}
          onClick={this.handleSearchPosts}
          className={classes.listItem}>
          <ListItemIcon>
            <div className={classes.searchIconRoot}>
              <SearchIcon className={classes.searchItemIcon} />
            </div>
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.searchItemText }} primary={t!('search.searchInPost', {query: searchText })} />
        </ListItem>
        <ListItem button
          onClick={this.handleSearchUsers}
          onMouseDown={this.handleMouseDown}
          className={classes.listItem}>
          <ListItemIcon>
            <div className={classes.searchIconRoot}>
              <GroupIcon className={classes.searchItemIcon} />
            </div>
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.searchItemText }} primary={t!('search.searchInUser', {query: searchText })} />
        </ListItem>
      </div>
    )

    return (
        <FormControl fullWidth component='div' className={classes.searchField}>
          <Input
            className={classes.searchInput}
            onBlur={this.handleCloseList}
            id='adornment-password'
            placeholder={t!('header.searchText')}
            type={'text'}
            disableUnderline
            value={searchText}
            onClick={this.handleOpenList}
            onChange={this.handleChange('searchText')}
            startAdornment={
              <InputAdornment position='end'>
                <SearchIcon className={classes.searchIcon}
                  onMouseDown={this.handleMouseDown} />
              </InputAdornment>
            }
          />
          {
            searchText !== '' && listDisplayed
              ? searchList
              : <span> </span>
          }

          {/* </ClickAwayListener> */}
        </FormControl>
    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: Function, ownProps: ISearchBoxProps) => {
  return {
    goTo: (url: string) => dispatch(push(url))
  }
}

// - Map state to props
const mapStateToProps = (state: Map<string, any>, ownProps: ISearchBoxProps) => {

  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(SearchBoxComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(searchBoxStyles as any, { withTheme: true })(translateWrraper as any) as any)
