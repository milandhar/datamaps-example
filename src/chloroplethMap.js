import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import d3, { selection } from 'd3';
import WorldJson from './World.topo.json';

class ChloroplethMap extends Component {

    constructor(){
      super()
      let height = "180vh"
      let width = "180vw"
      let active = d3.select(null)
    }



    componentDidMount() {
        // Datamaps expect data in format:
        // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
        //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
        let element = document.getElementById('chloropleth_map');
        let projection = d3.geo.mercator()
            .center([0, 0]) // always in [East Latitude, North Longitude]
            .scale(250)
            .translate([element.offsetWidth / 3, element.offsetHeight / 3]);
        let path = d3.geo.path().projection(projection);
        let svg = d3.select("body").append("svg")
          .attr("width", this.width)
          .attr("height", this.height)
          .on("click", this.stopped(), true);

        svg.append("rect")
          .attr("class", "background")
          .attr("width", this.width)
          .attr("height", this.height)
          .on("click", reset);

          var g = svg.append("g");

          svg
            .call(zoom)
            d3.json("https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-50m.json", function(error, world) {
          if (error) throw error;

          g.selectAll("path")
              .data(WorldJson.feature(world, world.objects.countries).features)
            .enter().append("path")
              .attr("d", path)
              .attr("class", "feature")
              .on("click", clicked);

          g.append("path")
              .datum(WorldJson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
              .attr("class", "mesh")
              .attr("d", path);
        });

        function clicked(d) {
          if (this.active.node() === this) return reset();
          this.active.classed("active", false);
          this.active = d3.select(this).classed("active", true);

          var bounds = path.bounds(d),
              dx = bounds[1][0] - bounds[0][0],
              dy = bounds[1][1] - bounds[0][1],
              x = (bounds[0][0] + bounds[1][0]) / 2,
              y = (bounds[0][1] + bounds[1][1]) / 2,
              scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / this.width, dy / this.height))),
              translate = [this.width / 2 - scale * x, this.height / 2 - scale * y];

          svg.transition()
              .duration(750)
              // .call(zoom.translate(translate).scale(scale).event); // not in d3 v4
              .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); // updated for d3 v4
        }

        function reset() {
            this.active.classed("active", false);
            this.active = d3.select(null);

            svg.transition()
                .duration(750)
                // .call( zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1) ); // not in d3 v4
                .call( zoom.transform, d3.zoomIdentity ); // updated for d3 v4
          }


        let dataset = {};
        // zoom code from: https://bl.ocks.org/piwodlaiwo/90777c94b0cd9b6543d9dfb8b5aefeef
        let zoom = selection.call(d3.zoom().on("zoom", this.zoomed()));

        // We need to colorize every country based on "numberOfWhatever"
        // colors should be uniq for every value.
        // For this purpose we create palette(using min/max this.props.data-value)
        let onlyValues = this.props.data.map(function (obj) { return obj[1]; });
        let minValue = Math.min.apply(null, onlyValues),
            maxValue = Math.max.apply(null, onlyValues);

        // create color palette function
        // color can be whatever you wish
        let paletteScale = d3.scale.linear()
            .domain([minValue, maxValue])
            .range(["#EFEFFF", "#02386F"]); // blue color

        // fill dataset in appropriate format
        this.props.data.forEach(function (item) { //
            // item example value ["USA", 70]
            let iso = item[0],
                value = item[1];
            dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
        });

        // let height = 168;
        // let width = 360;

        let map = new Datamap({
            // element: document.getElementById('chloropleth_map'),
            element: element,
            scope: 'world',
            geographyConfig: {
                popupOnHover: true,
                highlightOnHover: true,
                borderColor: '#444',
                highlightBorderWidth: 1,
                borderWidth: 0.5,
                dataJson: WorldJson,
                popupTemplate: function (geo, data) {
                    // don't show tooltip if country don't present in dataset
                    if (!data) { return; }
                    // tooltip content
                    return ['<div class="hoverinfo">',
                            '<strong>', geo.properties.name, '</strong>',
                            '<br>Count: <strong>', data.numberOfThings, '</strong>',
                            '</div>'].join('');
                    }
            },
            fills: {
                HIGH: '#afafaf',
                LOW: '#123456',
                MEDIUM: 'blue',
                UNKNOWN: 'rgb(0,0,0)',
                defaultFill: '#eee'
            },
            data: dataset,
            // projection: 'mercator'
            setProjection: function (element) {
                // var projection = d3.geo.mercator()
                //     .center([0, 0]) // always in [East Latitude, North Longitude]
                //     .scale(250)
                //     .translate([element.offsetWidth / 3, element.offsetHeight / 3]);
                //
                // var path = d3.geo.path().projection(projection);
                return { path: path, projection: projection };
            }
        });
    }

    zoomed(){
      let g = document.getElementsByTagName("g")[0]
      console.log(g)
      g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
      // g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); // not in d3 v4
      g.attr("transform", d3.event.transform); // updated for d3 v4
    }

    // If the drag behavior prevents the default click,
    // also stop propagation so we don’t click-to-zoom.
    stopped() {
      if (d3.event.defaultPrevented) d3.event.stopPropagation();
    }
    render() {
        return (
            <div id="chloropleth_map" style={{
                height: this.height,
                width: this.width,
            }}></div>
        );
    }
}

export default ChloroplethMap;
