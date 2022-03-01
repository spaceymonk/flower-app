/* eslint-disable no-multi-str */
const T = {
  app: {
    name: 'Flower App',
    dateFormat: 'HH:mm:ss',
  },
  blocks: {
    errorTxt: 'Block creation failed!',
    defaultTxt: 'Enter some text...',
    statement: {
      title: 'Statement Block',
      description: 'A statement block lets you write any number of data definitions, declarations, and statements.',
      label: 'Statements:',
      toastMsg: {
        title: 'Statement Block Created',
        body: 'Block placed on the leftmost corner.',
      },
    },
    decision: {
      title: 'Decision Block',
      description: 'A decision block lets you define alternative flows for the main flow.',
      label: 'Expression:',
      toastMsg: {
        title: 'Decision Block Created',
        body: 'Block placed on the leftmost corner.',
      },
    },
    start: {
      title: 'Start Block',
      description: 'Marks the start of the flow. This is the main entry point of the program and there can be only be one.',
      toastMsg: {
        title: 'Start Block Created',
        body: 'Block placed on the leftmost corner.',
      },
    },
    stop: {
      title: 'Stop Block',
      description: 'Marks the end of the flow. This is the exit point of the program and there can be only be one.',
      toastMsg: {
        title: 'Stop Block Created',
        body: 'Block placed on the leftmost corner.',
      },
    },
  },
  projectTitle: {
    tooltip: 'Click to change project title',
    inputTxt: 'Enter new project title',
    error: {
      notValid: 'Please enter a valid title!',
    },
  },
  blockSidebar: {
    title: 'Blocks',
    tooltip: 'Add blocks to flowchart',
  },
  watchesSidebar: {
    title: 'Watches',
    tooltip: 'Open watchlist',
  },
  menubar: {
    file: {
      _: 'File',
    },
  },
  notFound: {
    title: 'Requested page could not found!',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, totam?',
    homepage: 'Homepage',
  },
};

export default T;
