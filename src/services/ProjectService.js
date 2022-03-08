import { BlockService } from './BlockService';

export class ProjectService {
  static validateTitle(title) {
    const text = title.trim();
    if (text.length <= 0 || text.length > 30) return false;
    return true;
  }

  static save({title, inputParams},callback) {
    const nodes = BlockService.instance().getNodes();
    const edges = BlockService.instance().getEdges();
    window.localStorage.clear();
    window.localStorage.setItem('nodes', JSON.stringify(nodes));
    window.localStorage.setItem('edges', JSON.stringify(edges));
    window.localStorage.setItem('title', title);
    window.localStorage.setItem('inputParams', inputParams);
    if (callback) callback();
  }

  static download({title, inputParams}) {
    const payload = {
      nodes: BlockService.instance().getNodes(),
      edges: BlockService.instance().getEdges(),
      title: title,
      inputParams: inputParams,
    };
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = title;
    document.body.appendChild(element);
    element.click();
  }
}
