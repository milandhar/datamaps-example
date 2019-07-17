import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChloroplethMap from './chloroplethMap.js'

class App extends Component {

  // use updateChoropleth() to change the data
  constructor(){
    super()
    this.state = {
      data: []
    }
        // [["BLR",75],["BLZ",43],["RUS",50],["RWA",88],["SRB",21],["TLS",43],
        // ["REU",21],["TKM",19],["TJK",60],["ROU",4],["TKL",44],["GNB",38],
        // ["GUM",67],["GTM",2],["SGS",95],["GRC",60],["GNQ",57],["GLP",53],
        // ["JPN",59],["GUY",24],["GGY",4],["GUF",21],["GEO",42],["GRD",65],
        // ["GBR",14],["GAB",47],["SLV",15],["GIN",19],["GMB",63],["GRL",56],
        // ["ERI",57],["MNE",93],["MDA",39],["MDG",71],["MAF",16],["MAR",8],
        // ["MCO",25],["UZB",81],["MMR",21],["MLI",95],["MAC",33],["MNG",93],
        // ["MHL",15],["MKD",52],["MUS",19],["MLT",69],["MWI",37],["MDV",44],
        // ["MTQ",13],["MNP",21],["MSR",89],["MRT",20],["IMN",72],["UGA",59],
        // ["TZA",62],["MYS",75],["MEX",80],["ISR",77],["FRA",54],["IOT",56],
        // ["SHN",91],["FIN",51],["FJI",22],["FLK",4],["FSM",69],["FRO",70],
        // ["NIC",66],["NLD",53],["NOR",7],["NAM",63],["VUT",15],["NCL",66],
        // ["NER",34],["NFK",33],["NGA",45],["NZL",96],["NPL",21],["NRU",13],
        // ["NIU",6],["COK",19],["XKX",32],["CIV",27],["CHE",65],["COL",64],
        // ["CHN",16],["CMR",70],["CHL",15],["CCK",85],["CAN",76],["COG",20],
        // ["CAF",93],["COD",36],["CZE",77],["CYP",65],["CXR",14],["CRI",31],
        // ["CUW",67],["CPV",63],["CUB",40],["SWZ",58],["SYR",96],["SXM",31]]
      // this.fetchRegions()
    }

    fetchRegions = () => {
      // console.log('in fetch')
      // return fetch("https://api.globalgiving.org/api/public/projectservice/regions/countries/projects/count?api_key=4be97db5-e712-49b1-bae9-12c85422ce7a", {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //    }
      // })
      // .then(res => res.json())
      // .then(json => {
      //   const getCountryISO3 = require("country-iso-2-to-3");
      //   let newDataArray = []
      //   json.regions.region.forEach((region)=> {
      //     region.countries.country.forEach((country)=> {
      //       newDataArray.push([getCountryISO3(country.iso3166CountryCode), country.projectCount])
      //     })
      //   })
      //   console.log(newDataArray)
      //   this.setState({
      //     data: newDataArray
      //   })
      // })
    }

  componentDidMount(){
    console.log('in fetch')
    return fetch("https://api.globalgiving.org/api/public/projectservice/regions/countries/projects/active/count?api_key=4be97db5-e712-49b1-bae9-12c85422ce7a", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(res => res.json())
    .then(json => {
      const getCountryISO3 = require("country-iso-2-to-3");
      let newDataArray = []
      json.regions.region.forEach((region)=> {
        region.countries.country.forEach((country)=> {
          newDataArray.push([getCountryISO3(country.iso3166CountryCode), country.projectCount])
        })
      })
      console.log(newDataArray)
      this.setState({
        data: newDataArray
      })
    })
  }

  // loadData = () => {
  //   let newDataArray = []
  //   console.log('in fetch')
  //   return fetch("https://api.globalgiving.org/api/public/projectservice/regions/countries/projects/count?api_key=4be97db5-e712-49b1-bae9-12c85422ce7a", {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }
  //   })
  //   .then(res => res.json())
  //   .then(json => {
  //     const getCountryISO3 = require("country-iso-2-to-3");
  //     json.regions.region.forEach((region)=> {
  //       region.countries.country.forEach((country)=> {
  //         newDataArray.push([getCountryISO3(country.iso3166CountryCode), country.projectCount])
  //       })
  //     })
  //   })
  //   console.log(newDataArray)
  //   return newDataArray
  // }

  render() {
    return (
      <div className="app-div" style={{
        height:"250vh",
        width: "250vw"
      }}>
        <ChloroplethMap data={this.state.data}/>
      </div>
    );
  }
}


export default App;
