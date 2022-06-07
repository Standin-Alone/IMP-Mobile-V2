import React from 'react';
import { View,Text} from 'react-native';
import {styles} from './styles'
import Timeline from 'react-native-timeline-flatlist'
import Components from '../../../components';
import constants from '../../../constants';




export default class PayoutTracking extends React.Component {
    constructor(props) {
      super(props);
      this.state = {                    
            batch:this.props.route.params.batch,
            data:[]
                   
      };
    }

    setMyState = (value)=>this.setState(value);

    async componentDidMount(){
        
        this.setState({ data: [
            { title: this.state.batch.approved_by_consolidator === null  ? 'For Consolidation' : 'Consolidated',
              icon:<constants.Icons.FontAwesome name={this.state.batch.approved_by_consolidator === null ? 'hourglass-half' : 'check-circle'} size={30} style={{opacity: 1}}  color = {this.state.batch.approved_by_consolidator === null ? constants.Colors.gray_tint : constants.Colors.success}/>,
              description: this.state.batch.approved_by_consolidator === null ? 'Your payout is ready to consolidate by the RFO Focal.' : '' ,
              opacity:1
            },
            { title: this.state.batch.approved_by_reviewer === null  ?  'For Reviewing' : 'Reviewed',
              icon:<constants.Icons.FontAwesome name={this.state.batch.approved_by_reviewer === null ? 'hourglass-half' : 'check-circle'} size={30} style={{opacity: this.state.batch.approved_by_consolidator ===  null ? 0.4 : 1}} color = {this.state.batch.approved_by_reviewer === null ? constants.Colors.gray_tint : constants.Colors.success}  /> ,
              description: this.state.batch.approved_by_reviewer === null ? 'Your batch is ready to review.':'',
              opacity: this.state.batch.approved_by_consolidator === null ?  0.4 :  1
            },  
            { title: this.state.batch.approved_by_approver === null ?  'For Approval' : 'Approved',
              icon:<constants.Icons.FontAwesome name={this.state.batch.approved_by_approver === null ? 'hourglass-half' : 'check-circle'} size={30} style={{opacity: this.state.batch.approved_by_reviewer ===  null ? 0.4 : 1}}  color = {this.state.batch.approved_by_approver === null ? constants.Colors.gray_tint : constants.Colors.success}   />,
              description: this.state.batch.approved_by_approver  === null ? 'Your batch is ready to approve.': '',
              opacity:  this.state.batch.approved_by_reviewer === null ?  0.4  : 1
            },

            { title: this.state.batch.approved_by_approver !== null &&  this.state.batch.approved_by_reviewer !== null  && this.state.batch.approved_by_consolidator !== null && this.state.batch.iscomplete == 0 ?  'Submitted to the Central' : this.state.batch.iscomplete == 1 ? 'Submitted to the Central' : 'For Submission to DBP',
              icon:<constants.Icons.FontAwesome name={this.state.batch.approved_by_approver !== null &&  this.state.batch.approved_by_reviewer !== null  && this.state.batch.approved_by_consolidator !== null && this.state.batch.iscomplete == 0 ? 'check-circle' : this.state.batch.iscomplete == 1 ?  'check-circle' :'hourglass-half'} size={30}  style={{opacity: this.state.batch.approved_by_reviewer ===  null ? 0.4 : 1}}  color = {this.state.batch.approved_by_approver !== null &&  this.state.batch.approved_by_reviewer !== null  && this.state.batch.approved_by_consolidator !== null && this.state.batch.iscomplete == 0 ? constants.Colors.success  :  this.state.batch.iscomplete == 1 ? constants.Colors.success   : constants.Colors.gray_tint} />,
              description: this.state.batch.approved_by_approver !== null &&  this.state.batch.approved_by_reviewer !== null  && this.state.batch.approved_by_consolidator !== null && this.state.batch.iscomplete == 0 ? 'Your batch has been sent to the central to send your payout to the bank.' : '',
              opacity: this.state.batch.approved_by_approver === null ?  0.4  : 1
            },

            { title: this.state.batch.approved_by_approver !== null &&  this.state.batch.approved_by_reviewer !== null  && this.state.batch.approved_by_consolidator !== null && this.state.batch.iscomplete == 1 ? 'Done' : 'Done' ,
              icon:<constants.Icons.FontAwesome name={this.state.batch.approved_by_approver !== null &&  this.state.batch.approved_by_reviewer !== null  && this.state.batch.approved_by_consolidator !== null && this.state.batch.iscomplete == 1 ? 'check-circle' : this.state.batch.iscomplete == 1 ?  'check-circle' : 'hourglass-half'} size={30} style={{opacity: this.state.batch.approved_by_reviewer ===  null ? 0.4 : 1}} color = {this.state.batch.approved_by_approver !== null &&  this.state.batch.approved_by_reviewer !== null  && this.state.batch.approved_by_consolidator !== null && this.state.batch.iscomplete == 1 ? constants.Colors.success : constants.Colors.gray_tint}  />,
              description:'Your batch payout has been sucessfully sent to the bank.',
              opacity: this.state.batch.approved_by_approver !== null &&  this.state.batch.approved_by_reviewer !== null  && this.state.batch.approved_by_consolidator !== null && this.state.batch.iscomplete == 1 ? 1  : 0.4
            },        
            
            ]})

           
    }

    renderDetail = (rowData, sectionID, rowID) =>
    (<View style={{ opacity:rowData.opacity }}>
        <Text style={styles.detailText} adjustsFontSizeToFit>{rowData.title}</Text>
        <View>
            <Text style={styles.detailDescription} adjustsFontSizeToFit>{rowData.description}</Text>
        </View>
    </View>)

    render(){
        return(
            <>                
                <View style={styles.container}>  
                    <Components.PrimaryHeader                    
                        onGoBack = {()=>this.props.navigation.goBack()}
                        title={"Payout Tracking"}
                    />
                  
                        <Timeline
                            data={this.state.data}
                            innerCircle={'icon'}
                            titleStyle={styles.timelineTitle}
                            circleSize={40}
                            circleColor={constants.Colors.primary}
                            lineColor={constants.Colors.gray_tint}
                            showTime={false}                    
                            renderDetail={this.renderDetail}      
                            style={{ marginHorizontal:constants.Dimensions.vw(5) }}              
                        />
               
                  
                </View>       
                
            </>
        )
    }

}
  