import { query, ref, onValue, orderByKey } from 'firebase/database';
import { db } from '@/Firebase/credential';

export function getProjects() {
  return new Promise((resolve, reject) => {
    const withdrawRef = query(ref(db, `/projects/`), orderByKey());
    onValue(withdrawRef, snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        const projects = Object.values(data);
        resolve(projects);
      } else {
        reject(new Error("No projects found"));
      }
    }, error => {
      reject(error);
    });
  });
}