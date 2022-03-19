import generateProjectName from 'project-name-generator';

class Initial {
  constructor() {
    this.refresh();
  }

  refresh() {
    this.title = window.localStorage.getItem('title') || generateProjectName().dashed;
    this.defaultNodes = JSON.parse(window.localStorage.getItem('nodes')) || [];
    this.defaultEdges = JSON.parse(window.localStorage.getItem('edges')) || [];
    this.inputParams = window.localStorage.getItem('inputParams') || '';
  }
}

export default new Initial();
