import generateProjectName from 'project-name-generator';
import { BlockService } from './BlockService';

export class ProjectService {
  static data = {
    title: window.localStorage.getItem('title') || generateProjectName().dashed,
    defaultNodes: JSON.parse(window.localStorage.getItem('nodes')) || [],
    defaultEdges: JSON.parse(window.localStorage.getItem('edges')) || [],
  };

  static validateTitle(title) {
    const text = title.trim();
    if (text.length <= 0 || text.length > 30) return false;
    return true;
  }

  static save(callback) {
    const nodes = BlockService.instance().getNodes();
    const edges = BlockService.instance().getEdges();
    window.localStorage.clear();
    window.localStorage.setItem('nodes', JSON.stringify(nodes));
    window.localStorage.setItem('edges', JSON.stringify(edges));
    window.localStorage.setItem('title', ProjectService.data.title);
    if (callback) callback();
  }

  static download() {
    const payload = {
      nodes: BlockService.instance().getNodes(),
      edges: BlockService.instance().getEdges(),
    };
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = ProjectService.data.title;
    document.body.appendChild(element);
    element.click();
  }

}
