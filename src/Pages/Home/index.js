import React, { } from "react";
import TopHeader from "../components/Header/TopHeader";
import { Switch, Route, Redirect } from "react-router-dom";
import SideMenu from "../components/Menu/SideMenu";
import MessageChart from "../Index";
import CreateForm from "../CreateForm"
import ReduxSearch from "../ReduxSearch"
import CheckBox from "../CheckBox"
import EditTable from "../Editable"
import CustomComponment from '../CustomComponment/index'
import FlowChart from '../FlowChart/index'
import Demo from '../UtilsDemo/index'
import { Layout } from "antd";
export default function Income(props) {

  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout>
        <TopHeader></TopHeader>
        {/* <MessageChart /> */}
        <Switch>
          <Route path="/index" component={MessageChart} />
          <Route path="/createForm" component={CreateForm} />
          <Route path="/reduxSearch" component={ReduxSearch} />
          <Route path="/checkbox" component={CheckBox} />
          <Route path="/editTable" component={EditTable} />
          <Route path="/customComponment" component={CustomComponment} />
          <Route path="/flowChart" component={FlowChart} />
          <Route path="/demo" component={Demo} />
          {/* <Redirect from="/" to="/index" exact/> */}
        </Switch>
      </Layout>
    </Layout>
  );

}
