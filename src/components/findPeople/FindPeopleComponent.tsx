// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import InfiniteScroll from 'react-infinite-scroller'

// - Import app components
import UserBoxList from 'components/userBoxList'

// - Import API

// - Import actions
import * as userActions from 'actions/userActions'
import { IFindPeopleComponentProps } from './IFindPeopleComponentProps'
import { IFindPeopleComponentState } from './IFindPeopleComponentState'

/**
 * Create component class
 */
export class FindPeopleComponent extends Component<IFindPeopleComponentProps, IFindPeopleComponentState> {

  static propTypes = {

  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IFindPeopleComponentProps) {
    super(props)

        // Defaul state
    this.state = {

    }

        // Binding functions to `this`

  }

  loadItems (page: number) {
    console.log('------------------------')
    console.log(page)
    console.log('------------------------')
  }

  componentWillMount () {
    this.props.loadPeople!()
  }
    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {

    const styles = {
      paper: {
        height: 254,
        width: 243,
        margin: 10,
        textAlign: 'center',
        maxWidth: '257px'
      },
      followButton: {
        position: 'absolute',
        bottom: '8px',
        left: 0,
        right: 0
      }
    }
    const loader = <div className='loader'>Loading ...</div>

    return (
            <div>
                <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={false}
                loader={loader}>

                <div className='tracks'>

                {this.props.peopleInfo && Object.keys(this.props.peopleInfo).length !== 0 ? (<div>
                <div className='profile__title'>
                    Suggestions for you
                </div>
                <UserBoxList users={this.props.peopleInfo}/>
                <div style={{ height: '24px' }}></div>
                </div>) : (<div className='g__title-center'>
                Nothing to show! :(
               </div>)}
                </div>
            </InfiniteScroll>
            </div>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: IFindPeopleComponentProps) => {
  return {
    loadPeople: () => dispatch(userActions.dbGetPeopleInfo())
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IFindPeopleComponentProps) => {
  return {
    peopleInfo: state.user.info
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(FindPeopleComponent as any)
