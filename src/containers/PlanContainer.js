import React, { Component, PropTypes } from 'react';
import PlanItem from '../components/PlanItem';
import PlanMaps from '../components/PlanMaps';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader } from 'material-ui/Card';

export default class PlanContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <Card>
              <h3 style={{marginLeft: 15, marginTop: 15}}>{this.props.plan ? this.props.plan.plan.title : "Plan"}</h3>
              <CardHeader
                title="Plan Details"
                subtitle={this.props.plan ? this.props.plan.plan.desc : null} />
                {this.props.plan ?
                this.props.plan.activities.map((activity, index) =>
                  <PlanItem
                    key={index}
                    activity={activity} />
                  ) : null
                }
            </Card>
          </div>
          <div className="col-sm-6">
          <div style={{marginTop: 20}}>
          </div>
            <PlanMaps size="small" activities={this.props.plan ? this.props.plan.activities : null}/>
          </div>
        </div>
      </div>
    )
  }
}



