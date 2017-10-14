// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import { List, ListItem } from 'material-ui/List'
import SvgGroup from 'material-ui/svg-icons/action/group-work'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import IconButtonElement from 'IconButtonElement'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import SvgClose from 'material-ui/svg-icons/navigation/close'
import AppBar from 'material-ui/AppBar'

// - Import app components
import UserAvatar from 'UserAvatar'


// - Import API


// - Import actions
import * as circleActions from 'circleActions'




    
/**
* Create component class
 */
export class Circle extends Component {

  static propTypes = {
    /**
     * Circle object
     */
    circle: PropTypes.object.isRequired,
    /**
     * Circle identifier
     */
    id: PropTypes.string.isRequired

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props)

    //Defaul state
    this.state = {
        /**
         * If is true circle is open to show users in circle list
         */
        open:false,
        /**
         * Circle name on change
         */
        circleName: this.props.circle.name,
        /**
         * Save operation will be disable if user doesn't meet requirement
         */
        disabledSave: false
    }

    // Binding functions to `this`
    this.handleToggleCircle = this.handleToggleCircle.bind(this)
    this.handleDeleteCircle = this.handleDeleteCircle.bind(this)
    this.handleUpdateCircle = this.handleUpdateCircle.bind(this)
    this.handleChangeCircleName = this.handleChangeCircleName.bind(this)
  }


  /**
   * Handle chage circle name
   * 
   * 
   * @memberof Circle
   */
  handleChangeCircleName = (evt) => {
    const {value} = evt.target
    this.setState({
      circleName: value,
      disabledSave: (!value || value.trim() === '')
    })
  }

  /**
   * Update user's circle
   * 
   * 
   * @memberof Circle
   */
  handleUpdateCircle = () => {
    const {circleName} = this.state
    if(circleName && circleName.trim() !== ''){
    this.props.updateCircle({name:circleName,id: this.props.id})
    }
  }

  /**
   * Handle delete circle
   * 
   * 
   * @memberof Circle
   */
  handleDeleteCircle = () => {
    this.props.deleteCircle(this.props.id)
  }

  /**
   * Toggle circle to close/open
   * 
   * 
   * @memberof Circle
   */
  handleToggleCircle = () => {
    this.setState({
        open: !this.state.open
    })
  }


  userList = () => {
    const {users} = this.props.circle
    const {userInfo} = this.props
    let usersParsed =[]
    
    if(users){
       Object.keys(users).forEach((key, index) => {
         const { fullName} = users[key]
         let avatar =  userInfo && userInfo[key] ? userInfo[key].avatar || '' : ''
        usersParsed.push(<ListItem
        key={`${this.props.id}.${key}`}
          style={{backgroundColor: '#e2e2e2'}}
            value={2}
            primaryText={fullName}
            leftAvatar={<UserAvatar fullName={fullName} fileName={avatar}/>}
            onClick={()=> this.props.goTo(`/${key}`)}
          />)
        
      })
      return usersParsed
    }
  }
  /**
   * Right icon menue of circle
   * 
   * 
   * @memberof Circle
   */
   rightIconMenu =(
      <IconMenu iconButtonElement={IconButtonElement} style={{ display: "block", position: "absolute", top: "0px", right: "12px" }}>
        <MenuItem primaryText="Delete circle" onClick={this.handleDeleteCircle}  />
        <MenuItem primaryText="Circle settings" onClick={this.props.openCircleSettings}  />
      </IconMenu>
    )
  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    const circleTitle =(
      <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
        <div style={{paddingRight: '10px'}}>
          <SvgClose onClick={this.props.closeCircleSettings} hoverColor={grey400} style={{cursor: 'pointer'}} />
        </div>
        <div style={{
              color: 'rgba(0,0,0,0.87)',
              flex: '1 1',
              font: '500 20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif'
            }}>
          Circle settings
        </div>
        <div style={{marginTop: '-9px'}}>
          <FlatButton label="SAVE" primary={true} disabled={this.state.disabledSave} onClick={this.handleUpdateCircle}  />
        </div>
      </div>
      <Divider />
      </div>
    )
    return (
      <div>
          <ListItem
          key={this.props.id}
           style={{backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,0.12)',height: '72px',padding: '12px 0' }}
            primaryText={<span style={{color:'rgba(0,0,0,0.87)',fontSize:'16px',marginRight:'8px',whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>{this.props.circle.name}</span>}
            leftIcon={<SvgGroup style={{width:'40px',height:'40px',transform: 'translate(0px, -9px)',fill:'#bdbdbd'}} />}
            rightIconButton={this.rightIconMenu}
            initiallyOpen={false}
            onClick={this.handleToggleCircle}
            open={this.state.open}
            nestedItems={this.userList()}
          >
          <Dialog
          id={this.props.id}
          title={circleTitle}
          modal={false}
          open={this.props.openSetting}
          onRequestClose={this.props.closeCircleSettings}
          overlayStyle={{ background: "rgba(0,0,0,0.12)" }}
          contentStyle={{maxWidth: '400px'}}
        >
          <div>
             <TextField
                hintText="Circle name"
                floatingLabelText="Circle name"
                onChange={this.handleChangeCircleName}
                value={this.state.circleName}
              />
            </div>
        </Dialog>
          </ListItem>
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
const mapDispatchToProps = (dispatch, ownProps) => {
  let {uid} = ownProps
  return {
    deleteCircle: (id) => dispatch(circleActions.dbDeleteCircle(id)),
    updateCircle: (circle) => dispatch(circleActions.dbUpdateCircle(circle)),
    closeCircleSettings: () => dispatch(circleActions.closeCircleSettings(uid,ownProps.id)),
    openCircleSettings: () => dispatch(circleActions.openCircleSettings(uid,ownProps.id)),
    goTo: (url)=> dispatch(push(url))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
  let {uid} = state.authorize  
  return {
      openSetting: state.circle ? (state.circle.userCircles[uid] ? (state.circle.userCircles[uid][ownProps.id].openCircleSettings || false) : false ) : false,
       userInfo: state.user.info 

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Circle)