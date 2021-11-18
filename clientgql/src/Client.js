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
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
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

  }

  render() {
    return(

        <div style={{padding: "10px", width: "80%", margin: "auto"}}>
          <h1 className="bp3-heading">Light GraphQL Client</h1>
          <ControlGroup fill={true} vertical={false}>
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

        </div>

    )
  }


}

export default Client;
