const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

export const ProjectNameOptions = {
  dictionaries: [colors, adjectives, animals],
  separator: '-',
};

class Initial {
  constructor() {
    this.refresh();
  }

  refresh() {
    this.title = window.localStorage.getItem('title') || uniqueNamesGenerator(ProjectNameOptions);
    this.defaultNodes = JSON.parse(window.localStorage.getItem('nodes')) || [];
    this.defaultEdges = JSON.parse(window.localStorage.getItem('edges')) || [];
    this.inputParams = window.localStorage.getItem('inputParams') || '';
  }

  empty() {
    return {
      title: uniqueNamesGenerator(ProjectNameOptions),
      defaultNodes: [],
      defaultEdges: [],
      inputParams: '',
    };
  }
}

export default new Initial();
