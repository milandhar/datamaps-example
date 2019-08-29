import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChloroplethMap from './chloroplethMap.js';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  // use updateChoropleth() to change the data
  constructor(){
    super()
    this.state = {
      data: [["ABW", 0],	["AFG", 0],	["AGO", 0],	["AIA", 0],	["ALA", 0],	["ALB", 0],	["AND", 0],	["ANT", 0],	["ARE", 0],	["ARG", 0],	["ARM", 0],	["ASM", 0],	["ATA", 0],	["ATF", 0],	["ATG", 0],	["AUS", 0],	["AUT", 0],	["AZE", 0],	["BDI", 0],	["BEL", 0],	["BEN", 0],	["BFA", 0],	["BGD", 0],	["BGR", 0],	["BHR", 0],	["BHS", 0],	["BIH", 0],	["BLM", 0],	["BLR", 0],	["BLZ", 0],	["BMU", 0],	["BOL", 0],	["BRA", 0],	["BRB", 0],	["BRN", 0],	["BTN", 0],	["BVT", 0],	["BWA", 0],	["CAF", 0],	["CAN", 0],	["CCK", 0],	["CHE", 0],	["CHL", 0],	["CHN", 0],	["CIV", 0],	["CMR", 0],	["COD", 0],	["COG", 0],	["COK", 0],	["COL", 0],	["COM", 0],	["CPV", 0],	["CRI", 0],	["CUB", 0],	["CXR", 0],	["CYM", 0],	["CYP", 0],	["CZE", 0],	["DEU", 0],	["DJI", 0],	["DMA", 0],	["DNK", 0],	["DOM", 0],	["DZA", 0],	["ECU", 0],	["EGY", 0],	["ERI", 0],	["ESH", 0],	["ESP", 0],	["EST", 0],	["ETH", 0],	["FIN", 0],	["FJI", 0],	["FLK", 0],	["FRA", 0],	["FRO", 0],	["FSM", 0],	["GAB", 0],	["GBR", 0],	["GEO", 0],	["GGY", 0],	["GHA", 0],	["GIB", 0],	["GIN", 0],	["GLP", 0],	["GMB", 0],	["GNB", 0],	["GNQ", 0],	["GRC", 0],	["GRD", 0],	["GRL", 0],	["GTM", 0],	["GUF", 0],	["GUM", 0],	["GUY", 0],	["HKG", 0],	["HMD", 0],	["HND", 0],	["HRV", 0],	["HTI", 0],	["HUN", 0],	["IDN", 0],	["IMN", 0],	["IND", 0],	["IOT", 0],	["IRL", 0],	["IRN", 0],	["IRQ", 0],	["ISL", 0],	["ISR", 0],	["ITA", 0],	["JAM", 0],	["JEY", 0],	["JOR", 0],	["JPN", 0],	["KAZ", 0],	["KEN", 0],	["KGZ", 0],	["KHM", 0],	["KIR", 0],	["KNA", 0],	["KOR", 0],	["KWT", 0],	["LAO", 0],	["LBN", 0],	["LBR", 0],	["LBY", 0],	["LCA", 0],	["LIE", 0],	["LKA", 0],	["LSO", 0],	["LTU", 0],	["LUX", 0],	["LVA", 0],	["MAC", 0],	["MAF", 0],	["MAR", 0],	["MCO", 0],	["MDA", 0],	["MDG", 0],	["MDV", 0],	["MEX", 0],	["MHL", 0],	["MKD", 0],	["MLI", 0],	["MLT", 0],	["MMR", 0],	["MNE", 0],	["MNG", 0],	["MNP", 0],	["MOZ", 0],	["MRT", 0],	["MSR", 0],	["MTQ", 0],	["MUS", 0],	["MWI", 0],	["MYS", 0],	["MYT", 0],	["NAM", 0],	["NCL", 0],	["NER", 0],	["NFK", 0],	["NGA", 0],	["NIC", 0],	["NIU", 0],	["NLD", 0],	["NOR", 0],	["NPL", 0],	["NRU", 0],	["NZL", 0],	["OMN", 0],	["PAK", 0],	["PAN", 0],	["PCN", 0],	["PER", 0],	["PHL", 0],	["PLW", 0],	["PNG", 0],	["POL", 0],	["PRI", 0],	["PRK", 0],	["PRT", 0],	["PRY", 0],	["PSE", 0],	["PYF", 0],	["QAT", 0],	["REU", 0],	["ROU", 0],	["RUS", 0],	["RWA", 0],	["SAU", 0],	["SDN", 0],	["SEN", 0],	["SGP", 0],	["SGS", 0],	["SHN", 0],	["SJM", 0],	["SLB", 0],	["SLE", 0],	["SLV", 0],	["SMR", 0],	["SOM", 0],	["SPM", 0],	["SRB", 0],	["STP", 0],	["SUR", 0],	["SVK", 0],	["SVN", 0],	["SWE", 0],	["SWZ", 0],	["SYC", 0],	["SYR", 0],	["TCA", 0],	["TCD", 0],	["TGO", 0],	["THA", 0],	["TJK", 0],	["TKL", 0],	["TKM", 0],	["TLS", 0],	["TON", 0],	["TTO", 0],	["TUN", 0],	["TUR", 0],	["TUV", 0],	["TWN", 0],	["TZA", 0],	["UGA", 0],	["UKR", 0],	["UMI", 0],	["URY", 0],	["USA", 0],	["UZB", 0],	["VAT", 0],	["VCT", 0],	["VEN", 0],	["VGB", 0],	["VIR", 0],	["VNM", 0],	["VUT", 0],	["WLF", 0],	["WSM", 0],	["YEM", 0],	["ZAF", 0],	["ZMB", 0],	["ZWE", 0]]
      }
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

    //initialize it to all zeroes, then overide

  isItemInArray(array, item) {
      for (var i = 0; i < array.length; i++) {
          if (array[i][0] == item[0]) {
              return i;
          }
      }
      return false;   // Not found
  }

  componentDidMount(){
    let prevData = this.state.data
    const getCountryISO3 = require("country-iso-2-to-3");
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
      json.regions.region.forEach((region)=> {
        region.countries.country.forEach((country)=> {
          let i = (this.isItemInArray(prevData, [getCountryISO3(country.iso3166CountryCode), 0]))
          prevData.splice(i, 1, [getCountryISO3(country.iso3166CountryCode), Math.log(country.projectCount)])
          console.log(Math.log(country.projectCount))
        })
      })
      this.setState({
        data: prevData
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
