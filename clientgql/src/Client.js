import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {InputGroup, Button, TextArea, Label, ControlGroup} from "@blueprintjs/core";


class Client extends Component {

  constructor(props) {
    super(props);

    this.appolloClient = undefined;

    this.state = {
      url: 'http://localhost:8010/proxy',
      query: "query Query {\n" +
          "    block(limit: 1, order_by: {block_no: desc}, where: {block_no: {_is_null: false}}) {\n" +
          "        block_no\n" +
          "    }\n" +
          "}",
      response: "",
      filesArray: []
    }

  }

  handleTextChange = (event) => {

    let id = event.target.id;
    let val = (event.target.value).trim();


    if (id === "url") {
      this.setState({url: val}, () => {this.createClientObj()})

    } else if (id === "query") {

      this.setState({query: val});

    }

  }

  loadFileContent = (event) => {

    const filename = event.target.id;

    fetch(`/graphql_sample_queries/${filename}`)
        .then(r => r.text())
        .then(text => {
          this.setState({query: text})
        })
  }

  handleButtonClick = (event) => {
    if (event.type === "click") {
      const query = this.state.query;
      this.runQuery(query);
    }
  }

  createClientObj = () => {
    this.appolloClient = new ApolloClient({
      uri: this.state.url,
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'cache-first',
          errorPolicy: 'all',
        },
      },
    });
  }

  runQuery = async (queryString) => {

    let response;

    try {
      const queryStr = gql(queryString)
      const raw = await this.appolloClient.query({query: queryStr});
      response = raw?.data || "no data returned";

    } catch (err) {
      response = err;
    }

    this.setState({response: JSON.stringify(response, undefined, 2)})

  }

  /////////////////////////////////////////
  // executed when the component is loaded
  componentDidMount(){

    this.createClientObj();
    // this.loadFileContent('chainTip.graphql');

  }

  render() {
    return(

        <div style={{padding: "10px", width: "80%", margin: "auto"}}>

          <h1 className="bp3-heading">Light GraphQL Client</h1>

          <table style={{width: "100%"}}>
            <tr>
              <td style={{verticalAlign: "top", width: "250px", lineHeight: "1.5"}}>
                <h4 className="bp3-heading">Sample Queries</h4>

                <a href="#" style={{textDecoration: "none"}} id="chainTip.graphql" onClick={this.loadFileContent}>chainTip</a><br/>
                <a href="#" style={{textDecoration: "none"}} id="epochStats.graphql" onClick={this.loadFileContent}>epochStats</a><br/>
                <a href="#" style={{textDecoration: "none"}} id="epochParams.graphql" onClick={this.loadFileContent}>epochParams</a><br/>
                <a href="#" style={{textDecoration: "none"}} id="poolHash.graphql" onClick={this.loadFileContent}>poolHash</a><br/>
                <a href="#" style={{textDecoration: "none"}} id="poolMetadata.graphql" onClick={this.loadFileContent}>poolMetadata</a><br/>
                <a href="#" style={{textDecoration: "none"}} id="stakePoolTickers.graphql" onClick={this.loadFileContent}>stakePoolTickers</a><br/>
                <a href="#" style={{textDecoration: "none"}} id="poolUpdate_allPools.graphql" onClick={this.loadFileContent}>poolUpdate_allPools</a><br/>
                <a href="#" style={{textDecoration: "none"}} id="poolUpdate_onePool.graphql" onClick={this.loadFileContent}>poolUpdate_onePool</a><br/>
                <a href="#" style={{textDecoration: "none"}} id="poolUpdate_oneUpdate.graphql" onClick={this.loadFileContent}>poolUpdate_oneUpdate</a><br/>
                <a href="#" style={{textDecoration: "none"}} id="adaPots.graphql" onClick={this.loadFileContent}>adaPots</a><br/>
                <a href="#" style={{textDecoration: "none"}} id="adaPots_perEpoch.graphql" onClick={this.loadFileContent}>adaPots_perEpoch</a><br/>
                <a href="#" style={{textDecoration: "none"}} id="blockDetails.graphql" onClick={this.loadFileContent}>blockDetails</a><br/>

              </td>
              <td>

                <ControlGroup fill={true} vertical={false} style={{paddingTop: "22px"}}>
                  <Label htmlFor="url" style={{width:"100%"}}>GraphQL API path</Label>
                  <InputGroup
                      style={{backgroundColor:"#ddf3f3", marginTop: "10px", height: "30px", width:"100%"}}
                      id="url"
                      disabled={false}
                      onChange={this.handleTextChange}
                      value={this.state.url}
                      fill={true}
                  />
                </ControlGroup>

                <ControlGroup fill={true} vertical={false} style={{paddingTop: "30px"}}>
                  <Label htmlFor="query" style={{width:"400px"}}>Query</Label>
                  <TextArea
                      // growVertically={true}
                      id="query"
                      large={true}
                      style={{backgroundColor:"#e7e7e7", marginTop: "10px", height: "200px", width:"100%"}}
                      onChange={this.handleTextChange}
                      value={this.state.query}
                  />
                </ControlGroup>

                <Button
                    text="Run"
                    style={{height: "30px", width: "100px", marginTop: "10px"}}
                    onClick={this.handleButtonClick}
                />


                <ControlGroup fill={true} vertical={false} style={{paddingTop: "30px"}}>
                  <Label htmlFor="result" style={{width:"400px"}}>Result</Label>
                  <TextArea
                      growVertically={true}
                      large={true}
                      style={{backgroundColor:"#cfe8c3", marginTop: "10px", height: "400px", width:"100%"}}
                      value={this.state.response}
                  />
                </ControlGroup>
              </td>
            </tr>
          </table>




        </div>

    )
  }


}

export default Client;
