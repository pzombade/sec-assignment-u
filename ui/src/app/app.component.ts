import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssignmentServiceService as AssignmentService } from './assignment-service.service';
import { Observable } from 'rxjs/Observable';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';//test
  fileToUpload: File = null;
  serverResponse = null;
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone, private httpClient:HttpClient, private assignmentService:AssignmentService){

  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
     // this.loadChartData();
    });
  }

  loadChartData(mapData) {
     // Create chart instance
let chart = am4core.create("chartdiv", am4charts.XYChart3D);
chart.paddingBottom = 30;
chart.angle = 35;


for(let i=0; i<mapData.length; i++){
   let obj = {
    "my_key": mapData[i]["key"],
    "value": ""+mapData[i]["value"]
  };

  chart.data.push(obj);
}


// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.tooltip.disabled = false;
categoryAxis.dataFields.category = "my_key";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.inside = true;
categoryAxis.renderer.grid.template.disabled = true;

let labelTemplate = categoryAxis.renderer.labels.template;
labelTemplate.rotation = -90;
labelTemplate.horizontalCenter = "left";
labelTemplate.verticalCenter = "middle";
labelTemplate.dy = 10; // moves it a bit down;
labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = false;
valueAxis.renderer.grid.template.disabled = true;

// Create series
let series = chart.series.push(new am4charts.ConeSeries());
series.dataFields.valueY = "value";
series.dataFields.categoryX = "my_key";

let columnTemplate = series.columns.template;
columnTemplate.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
})

columnTemplate.adapter.add("stroke", function(stroke, target) {
  return chart.colors.getIndex(target.dataItem.index);
})
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  handleFileUpload(files: FileList){
    this.fileToUpload =  files[0];
  }

  uploadFileToActivity() {
    this.assignmentService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      this.serverResponse = data;
      console.log("Recvd :: "+data);
      this.loadChartData(data["dayActivityMap"]);
      }, error => {
        console.log(error);
      });
  }
}
