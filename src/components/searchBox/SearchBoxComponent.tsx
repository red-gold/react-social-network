// - Import react components
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import StringAPI from 'api/StringAPI';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { ISearchBoxProps } from './ISearchBoxProps';
import { ISearchBoxState } from './ISearchBoxState';
import { searchBoxStyles } from './searchBoxStyles';

// - Material UI
// - Import components
// - Import actions
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
    const { classes, t } = this.props
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
const translateWrraper = withTranslation('translations')(SearchBoxComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(searchBoxStyles as any, { withTheme: true })(translateWrraper as any) as any)
