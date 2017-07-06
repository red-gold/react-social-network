// - Import react components
import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'

// - Import app components

// - Create MasterLoading component class
export default class MasterLoading extends Component {

  // Constructor
  constructor(props) {
    super(props);


    // Binding functions to `this`

  }



  // Render app DOM component
  render() {
    return (
      <Dialog
        modal={true}
        open={this.props.activeLoading}
        autoDetectWindowHeight={false}
        overlayStyle={{backgroundColor: "white"}}
        contentClassName="mLoading__content"
        bodyStyle={{backgroundColor: ""}}
        bodyClassName="mLoading__body"
      >

      <div>
      <div className="mLoading__context">

            <CircularProgress color="white" size={80} thickness={7} />
           <h1 style={{float:"right", color:"#fff"}}>Green</h1>

      </div>
  </div>



      </Dialog>



    );
  }

}
