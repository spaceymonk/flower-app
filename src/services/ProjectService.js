import generateProjectName from 'project-name-generator';

export class ProjectService {
  static data = {
    title: generateProjectName().dashed,
  };

  static validateTitle(title) {
    const text = title.trim();
    if (text.length <= 0 || text.length > 30) return false;
    return true;
  }
}
