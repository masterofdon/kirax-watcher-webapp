import React from 'react';
import echarts from 'echarts';

class ReactEcharts extends React.Component {

  // first add
  componentDidMount() {
    const echartObj = this.renderEchartDom();
    const onEvents = this.props.onEvents || {};
    let reizeEvent;

    this.bindEvents(echartObj, onEvents);
    // on chart ready
    if (typeof this.props.onChartReady === 'function') this.props.onChartReady(echartObj);

    function resize() {
      clearTimeout(reizeEvent);
      reizeEvent = setTimeout(() => { echartObj.resize(); }, 200);
    }
  }

  // update
  componentDidUpdate() {
    this.renderEchartDom();
    this.bindEvents(this.getEchartsInstance(), this.props.onEvents || []);
  }

  // remove
  componentWillUnmount() {
    echarts.dispose(this.echartsDom);
  }

  // bind the events
  bindEvents(instance, events) {
    const loop = function loop(eventName) {
      // ignore the event config which not satisfy
      if (typeof eventName === 'string' && typeof events[eventName] === 'function') {
        // binding event
        instance.off(eventName);
        instance.on(eventName, (param) => {
          events[eventName](param, instance);
        });
      }
    };

    for (const eventName in events) {
      loop(eventName);
    }

  }

  // render the dom
  renderEchartDom() {
    // init the echart object
    const echartObj = this.getEchartsInstance();
    // set the echart option
    echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);
    // set loading mask
    if (this.props.showLoading) echartObj.showLoading(this.props.loadingOption || null);
    else echartObj.hideLoading();

    return echartObj;
  }

  getEchartsInstance() {
    // return the echart object
    const theme = this.props.theme ? this.props.theme : 'macarons';
    return echarts.getInstanceByDom(this.echartsDom) || echarts.init(this.echartsDom, theme);
  }

  render() {
    const style = this.props.style || {
      height: '350px'
    };
    // for render
    return (
      <div
        ref={(c) => { this.echartsDom = c; }}
        className={this.props.className}
        style={style} />
    );
  }
}

module.exports = ReactEcharts;