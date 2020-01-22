import React, { Component } from 'react'
import { connect } from "react-redux";
import { keepConnectionInRefresh } from "../redux/actions";
import OffUser from "../antDesignComponents/OffUser";
import DashboardTab from "../antDesignComponents/DashboardTab";
import ScheduleTab from "../antDesignComponents/ScheduleTab";
import PlaceTab from "../antDesignComponents/PlaceTab";
import ActivityTab from "../antDesignComponents/ActivityTab";
import MenuTab from "../antDesignComponents/MenuTab";
import PaymentTab from "../components/PaymentTab";
import Chats from "../antDesignComponents/Chats";

import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        selectedTab: 'dashboard'// selectedTab : 'dashboard' || 'schedule' || 'place' || 'menu' || 'activity' || 'payment'
    };
  }

  componentDidMount = () => {
    this.props.keepConnectionInRefresh(this.props)
  }

  handleDashboardOn = () => this.setState({ selectedTab : 'dashboard' })
  handleScheduleOn = () => this.setState({ selectedTab : 'schedule' })
  handlePlaceOn = () => this.setState({ selectedTab : 'place' })
  handleMenuOn = () => this.setState({ selectedTab : 'menu' })
  handleActivityOn = () => this.setState({ selectedTab : 'activity' })
  handlePaymentOn = () => this.setState({ selectedTab : 'payment' })
  
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
    return (
    <Layout>
      <Layout>
        <Header>
          <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['dashboard']}
          style={{ lineHeight: '64px' }}
          >
            <Menu.Item ><OffUser history={this.props.history}/></Menu.Item>
            <Menu.Item key="dashboard" onClick={this.handleDashboardOn}><Icon type="profile" />Dash Board</Menu.Item>
            <Menu.Item key="schedule" onClick={this.handleScheduleOn}><Icon type="schedule" />Schedule</Menu.Item>
            <Menu.Item key="place" onClick={this.handlePlaceOn}><Icon type="environment" />Place</Menu.Item>
            <Menu.Item key="activity" onClick={this.handleActivityOn}><Icon type="car" />Activity</Menu.Item>
            <Menu.Item key="menu" onClick={this.handleMenuOn}><Icon type="coffee" />Menu</Menu.Item>
            <Menu.Item key="payment" onClick={this.handlePaymentOn}><Icon type="credit-card" />Payment</Menu.Item>
          </Menu>
        </Header>
        <Content>
          {this.showForTab()}
        </Content>
      </Layout>
      <Sider width="35%">
        <Chats />
      </Sider>
    </Layout>)
  }
}

export default connect(
  null,
  { keepConnectionInRefresh }
)(Group);
