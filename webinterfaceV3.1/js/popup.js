var jsons = [];
var popup_chart = null;

function popup(el) {
    var name = $(el).attr("name");
    console.log("popup: " + name);

    if (popup_chart != null)
        Chart.prototype.destroy.call(popup_chart);

    $("#start").val("");
    $("#end").val("");
    if (runFrom != -1)
        $("#start").val(runFrom);
    if (runTo != -1)
        $("#end").val(runTo);

    var current_chart = chart_list.find(name);

    popup_chart = $.extend(true, {}, current_chart); //copy chart
    //popup_chart = $.extend(true, new Chart({files:[]}, ""), current_chart);
    popup_chart.el_id = "popup-chart";
    popup_chart.last_range = null;
    popup_chart.chart_obj = null;
    console.log(popup_chart);
    Chart.prototype.update.call(popup_chart);
}

function updatePopup() {
    var range = [0,Infinity];
    var start = $("#start").val();
    var end = $("#end").val();
    if (start != "")
        range[0] = start;
    if (end != "")
        range[1] = end;
    Chart.prototype.update.call(popup_chart, range);
}

function init_popup() {
    $(document).bind("close.facebox", function() {
        //popup_chart.destroy();
        Chart.prototype.destroy.call(popup_chart);
        popup_chart = null;
        console.log("popup chart destroyed");
    });
}

// function init_popup() {
//     yArray = [];
//     yErrArray = [];
//     myYValues = [];
//     myYErrValues = [];
//     xAxisValues = [];

//     colors.push("#669999");
//     colors.push("#FF6600");
//     colors.push("#669900");
//     colors.push("#002E00");
//     colors.push("#CC3300");
//     colors.push("#996633");
//     colors.push("#000099");
//     colors.push("#9900CC");
//     colors.push("#FF0066");
//     colors.push("#8D1919");
//     var count = sessionStorage.length;

//     // urlLink = sessionStorage.getItem("url");
//     $("#start").val(runFrom);
//     $("#end").val(runTo);

//     var x = 0;
//     for (var i = 0; i < count; i++) {

//         if (sessionStorage.key(i).indexOf("json") >= 0) {
//             jsons[x] = sessionStorage.getItem(sessionStorage
//                 .key(i));

//             x++;
//         }
//     }
    
//     updatePopupGraph();

//     $(document).bind("close.facebox", function() {
//         popup_chart.destroy();
//         popup_chart = null;
//         console.log("popup chart destroyed");
//     });
// }

// function updatePopupGraph() {
//     console.log("asdasdad");
//     yArray = [];
//     yErrArray = [];
//     myYErrValues = [];
//     myYValues = [];
//     xAxisValues = [];
//     runFrom = $("#start").val();
//     console.log(runFrom);
//     runTo = $("#end").val();
//     console.log(runTo);
//     if (runFrom == -1 || runTo == -1) {
//         scatterData(jsons, 0);
//     } else if (runFrom >= 0 && runTo >= 0) {
//         scatterData(jsons, 1);
//     }

//     console.log("X values: " + xAxisValues);
//     chart = new Highcharts.Chart({
//         chart: {
//             renderTo: $("#facebox .chart")[0],
//             zoomType: 'xy',
//             width: 800
//             // defaultSeriesType : 'scatter',
//         },
//         title: {
//             text: yTitle
//         },
//         xAxis: {
//             title: {
//                 text: 'Run No.',
//             },
//             categories: xAxisValues

//         },
//         yAxis: {
//             title: {
//                 text: yTitle,
//             }
//         },
//         scatter: {
//             marker: {
//                 radius: 2
//             }
//         },

//     });
//     console.log(yArray.length);
//     for (var i = 0; i < yArray.length; i++) {

//         chart
//             .addSeries({
//                 name: jsons[i].split(".")[0],
//                 type: 'scatter',
//                 color: colors[i],
//                 data: yArray[i],
//                 tooltip: {
//                     headerFormat: "",
//                     pointFormat: '<span style="color:{series.color}"></span><b>{point.series.name}</b><br> <b>Run No:</b> {point.category}<br/><b>S/N(mpv): </b>{point.y}'
//                 }
//             }, false);
//         chart
//             .addSeries({
//                 name: 'Bin Content Error',
//                 type: 'errorbar',
//                 data: yErrArray[i],
//                 tooltip: {
//                     headerFormat: "",
//                     pointFormat: '<b>{point.series.name}</b><br> <b>Run No:</b> {point.category}<br/><b>Error Range</b> : {point.low}-{point.high}<br/>'
//                 }
//             }, false);

//     }
//     chart.redraw();
//     popup_chart = chart;
// }