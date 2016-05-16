import React, { Component, PropTypes } from 'react';
import PlanItem from '../components/PlanItem';
import PlanMaps from '../components/PlanMaps';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader } from 'material-ui/Card';

export default class PlanContainer extends Component {

  printScreen() {
    window.print();
  }
  
  render() {
    const alphabetOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2 style={{marginLeft: 15, marginTop: 15}}>{this.props.plan ? this.props.plan.plan.title : "Plan"}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Card>
              <CardHeader
                title="Plan Details"
                subtitle={this.props.plan ? this.props.plan.plan.desc : null} />
                {this.props.plan ?
                this.props.plan.activities.map((activity, index) =>
                  <PlanItem
                    key={index}
                    order={alphabetOrder[index] + '.'}
                    activity={activity} />
                  ) : null
                }
            </Card>
          </div>
          <div className="col-sm-6">
          <div>
          </div>
            <PlanMaps size="small" activities={this.props.plan ? this.props.plan.activities : null}/>
            <FlatButton
              label="Print Plan"
              primary={true}
              onClick={this.printScreen.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}



