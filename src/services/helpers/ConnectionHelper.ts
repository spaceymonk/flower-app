import Connection from '../model/Connection';

export const includesConnection = (cs: Connection[], c: Connection): boolean => {
  for (let i = 0; i < cs.length; i++) {
    if (cs[i].id === c.id) {
      return true;
    }
  }
  return false;
};
