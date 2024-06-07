import { db } from "@/Firebase/credential";
import { ref, onValue } from "firebase/database";


export function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const dbs = db;
    const starCountRef = ref(dbs, "/projects/" + projectId);
    onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
          resolve(data);
        } else {
          reject(new Error("No project found by ID"));
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}
