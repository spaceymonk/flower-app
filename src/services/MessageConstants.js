/* eslint-disable no-multi-str */
const T = {
  app: {
    name: 'Flower App',
    dateFormat: 'HH:mm:ss',
    saveTxt: 'Save',
    cancelTxt: 'Cancel',
    deleteTxt: 'Delete',
  },
  blocks: {
    defaultTxt: 'Enter some text...',
    creationFailed: 'Block creation failed!',
    creationSuccess: 'Block placed on the leftmost corner.',
    label: 'Code',
    statement: {
      title: 'Statement Block',
      description: 'A statement block lets you write any number of data definitions, declarations, and statements.',
    },
    decision: {
      title: 'Decision Block',
      description: 'A decision block lets you define alternative flows for the main flow.',
    },
    start: {
      title: 'Start Block',
      description:
        'Marks the start of the flow. This is the main entry point of the program and there can be only be one.',
    },
    stop: {
      title: 'Stop Block',
      description: 'Marks the end of the flow. This is the exit point of the program and there can be only be one.',
    },
    load: {
      title: 'Load Block',
      description: 'A load block lets you get input from the user.',
    },
    store: {
      title: 'Store Block',
      description: 'A store block lets you print out the given variables to display.',
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
  notFound: {
    title: 'Requested page could not found!',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, totam?',
    homepage: 'Homepage',
  },
};

export default T;
