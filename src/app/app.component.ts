import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare const KeyLines: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private chart: KeyLines.Chart;
  chartComponentStyles = { height: '90vh', width: '100%' };
  chartOptions: KeyLines.ChartOptions;
  chartData: any[];

  constructor(private http: HttpClient) {
    this.chartOptions = this.getChartOptions();
  }

  ngOnInit() {
    this.http.get('assets/graph.json').subscribe((data: any) => this.chartData = data.items);
  }

  // ******************* Graph events - start ***********************/
  klChartReady(chart: KeyLines.Chart) {
    this.chart = chart;
    KeyLines.getGraphEngine();
    this.initGraph();
  }

  klChartEvents($eventArg: any) {
    // tslint:disable-next-line:switch-default
    switch ($eventArg.name) {
      case 'click':
        const item = this.chart.getItem($eventArg.args[0]);
        console.log('clicked', item);
        break;
      case 'contextmenu':
        console.log('contextmenu', $eventArg);
        break;

      case 'dblclick':
        console.log('dblclick', $eventArg);
        break;
      case 'dragstart':
        console.log('drag start', $eventArg);
        break;
      case 'dragend':
        console.log('drag end', $eventArg);
        break;
      case 'dragcomplete':
        console.log('drag complete', $eventArg);
        break;
    }
  }


  initGraph() {
    if (this.chartData) {
      this.chart.load({ type: 'LinkChart', items: this.chartData })
        .then(() => this.applyGrouping())
        .then((res) => {
          this.chart.layout('sequential', {
            animate: true,
            consistent: true,
            orientation: 'down',
            level: 'level'
          }).then(() => {

          });
        }).catch(er => console.log('grouping has some issues', er));
    }

  }

  applyGrouping() {
    const groupingResponses: Promise<Array<string>>[] = [];
    const groups = this.getGroups();

    groups.forEach((g: any) => {

      groupingResponses.push(this.combineNodes(g.node));
    });
    return Promise.all(groupingResponses);

  }

  getGroups() {
    return [
      { node: [this.chart.getItem('2.1'), this.chart.getItem('2.2')] },
      { node: [this.chart.getItem('3.1'), this.chart.getItem('3.2')] },
    ];
  }

  combineNodes(nodes: KeyLines.Node[]): Promise<Array<string>> {
    const comboOpenStyle = this.getComboDefaultOpenStyle();
    const comboGlyph = this.getGlyphDefaultStyle();
    const comboDef = <KeyLines.ComboDefinition>{
      ids: nodes.map(n => n.id),
      openStyle: comboOpenStyle,
      glyph: comboGlyph,
      position: 'average',
      label: nodes[0].d.parentid,
      d: nodes[0].d,
      open: false
    };
    comboDef.d.parent = true;
    const combineOptions: KeyLines.CombineOptions = this.getCombineDefaultOptions();

    return this.chart.combo().combine(comboDef, combineOptions);
  }

  private getComboDefaultOpenStyle(): KeyLines.OpenStyleOptions {
    return <KeyLines.OpenStyleOptions>{
      b: 'black',
      bw: 2,
      c: 'white',
      bs: 'solid'
    };
  }

  private getGlyphDefaultStyle(): KeyLines.Glyph {
    return <KeyLines.Glyph>{
      b: 'white',
      c: '#0078a3',
      p: 'ne',
      fc: 'white'
    };
  }
  private getCombineDefaultOptions(): KeyLines.CombineOptions {
    return <KeyLines.CombineOptions>{
      animate: true,
      arrange: 'concentric'
    };
  }

  private getChartOptions(): KeyLines.ChartOptions {
    return {
      logo: null,
      overview: { icon: false, shown: false },
      backColour: '#fafafa',
      iconFontFamily: 'Material Icons',
      navigation: { p: 'sw', shown: true },
      handMode: true
    };
  }

}
