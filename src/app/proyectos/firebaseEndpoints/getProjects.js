import { query, ref, onValue, orderByKey } from 'firebase/database';
import { db } from '@/Firebase/credential';

export function getProjects(callback) {
  var withdrawRef = query(ref(db, `/projects/`), orderByKey())
  onValue(withdrawRef, snapshot => {
    const data = snapshot.val()
    if (data !== null) {
      const projects = Object.values(data);
      callback(projects);
    }
  });
}
