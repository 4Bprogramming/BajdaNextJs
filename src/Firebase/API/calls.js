import app from "../credential.js";
import {getFirestore,collection, doc, setDoc} from "firebase/firestore"

export function createProject(body){
    const dataBase=getFirestore(app);
    const collectionRef= collection(dataBase, "Proyectos");
    const docRef= doc(collectionRef,body.sku);
    setDoc(docRef, body)
}
export function edit(){}