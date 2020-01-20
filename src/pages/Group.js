import React, { Component } from 'react'
import OffUser from "../components/OffUser";
import DashboardTab from "../components/DashboardTab";
import ScheduleTab from "../components/ScheduleTab";
import PlaceTab from "../components/PlaceTab";
import ActivityTab from "../components/ActivityTab";
import MenuTab from "../components/MenuTab";
import PaymentTab from "../components/PaymentTab";
import Chats from "../components/Chats";
import { Divider } from 'antd';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        selectedTab: 'dashboard'// selectedTab : 'dashboard' || 'schedule' || 'place' || 'menu' || 'activity' || 'payment'
    };
  }

  componentDidMount = () => {
  }

  handleDashboardOn = ()=>{
    this.setState({ selectedTab : 'dashboard' })
  }

  handleScheduleOn = ()=>{
    this.setState({ selectedTab : 'schedule' })
  }

  handlePlaceOn = ()=>{
    this.setState({ selectedTab : 'place' })
  }

  handleMenuOn = ()=>{
    this.setState({ selectedTab : 'menu' })
  }

  handleActivityOn = ()=>{
    this.setState({ selectedTab : 'activity' })
  }

  handlePaymentOn = ()=>{
    this.setState({ selectedTab : 'payment' })
  }

  showForTab = () => {
    switch(this.state.selectedTab) {
        case "dashboard": 
        return <DashboardTab />
        case "schedule": 
        return <ScheduleTab />
        case "place": 
        return <PlaceTab />
        case "menu": 
        return <MenuTab />
        case "activity": 
        return <ActivityTab />
        case "payment": 
        return <PaymentTab />
        default :  
        return <DashboardTab />
    }
  }

  render() {
    return (<Divider>
        <OffUser history={this.props.history}/>
          <Divider>
              <span onClick={this.handleDashboardOn}> dashboard-tab </span>
              <span onClick={this.handleScheduleOn}> schedule-tab </span>
              <span onClick={this.handlePlaceOn}> place-tab </span>
              <span onClick={this.handleActivityOn}> activity-tab </span>
              <span onClick={this.handleMenuOn}> menu-tab </span>
              <span onClick={this.handlePaymentOn}> payment-tab </span>
          </Divider>
        {this.showForTab()}
        <Chats />
      </Divider>)
  }
}

export default Group