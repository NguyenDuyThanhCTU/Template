import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
  orderBy,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";

export const addDocument = async (Collection, data) => {
  data.createdAt = serverTimestamp();
  try {
    const newDocument = await addDoc(collection(db, Collection), data);

    return newDocument.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getDocuments = async (Collection) => {
  try {
    const q = query(collection(db, Collection));
    const querySnapshot = await getDocs(q);
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.error("Error get document: ", error);
  }
};

export const getDocumentById = async (Collection, documentId) => {
  try {
    const docRef = doc(db, Collection, documentId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      console.log("Document not found.");
      return null;
    }
  } catch (error) {
    console.error("Error get document by ID: ", error);
    throw error;
  }
};

export const getProducts = async (Collection) => {
  try {
    const q = query(collection(db, Collection), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    const data = [];

    querySnapshot.forEach((doc) => {
      const createdAt = doc.data().createdAt.toDate();
      const serverTime = Timestamp.now().toDate();

      const timeDiff = serverTime.getTime() - createdAt.getTime();
      const daysDiff = Math.round(timeDiff / 86400000);

      data.push({ id: doc.id, ...doc.data(), daysSinceCreation: daysDiff });
    });

    return data;
  } catch (error) {
    console.error("Error get document: ", error);
  }
};

export const getDocumentByField = async (Collection, field, value) => {
  try {
    const q = query(collection(db, Collection), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.error("Error get document: ", error);
  }
};

export const getDocumentsByField = async (Collection, Type, Size) => {
  try {
    let q = query(
      collection(db, Collection),
      where("brickType", "==", Type),
      where("brickSize", "==", Size)
    );
    if (Type === " " && Size === " ") {
      q = query(collection(db, Collection));
    } else if (Size === " ") {
      q = query(collection(db, Collection), where("brickType", "==", Type));
    } else if (Type === " ") {
      q = query(collection(db, Collection), where("brickSize", "==", Size));
    }

    const querySnapshot = await getDocs(q);
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const checkDocument = async (Collection, currentData) => {
  return new Promise((resolve, reject) => {
    const q = query(
      collection(db, Collection),
      where("password", "==", currentData)
    );

    getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          reject(new Error("Không có dữ liệu."));
        } else {
          resolve();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateDocument = async (collectionName, id, newData) => {
  await updateDoc(doc(db, collectionName, id), newData);
};

export const updateArrayFieldAtIndex = async (
  collectionName,
  id,
  fieldName,
  newData,
  index
) => {
  try {
    const ref = doc(db, collectionName, id);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      const currentData = snapshot.data();

      if (Array.isArray(currentData[fieldName])) {
        const updatedArray = [...currentData[fieldName]];
        if (index >= 0 || index < updatedArray.length) {
          updatedArray[index] = newData;

          await updateDoc(ref, { [fieldName]: updatedArray }); // Cập nhật trường mảng trong tài liệu

          console.log("Cập nhật trường mảng thành công!");
        } else {
          console.error("Số thứ tự mảng không hợp lệ!");
        }
      } else {
        console.error("Trường không phải là một mảng!");
      }
    } else {
      console.error("Không tìm thấy tài liệu!");
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật trường mảng:", error);
  }
};

export const delDocument = async (CollectionName, id) => {
  try {
    await deleteDoc(doc(db, CollectionName, id));
  } catch (error) {
    console.log(error);
  }
};

// CRUD with array Field

export const addDataToArrayField = async (
  collectionName,
  documentId,
  fieldName,
  newData
) => {
  try {
    const ref = doc(db, collectionName, documentId);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      const documentData = snapshot.data();
      const arrayField = documentData[fieldName] || [];
      arrayField.push(newData);

      await updateDoc(ref, { [fieldName]: arrayField });

      console.log(`Thêm dữ liệu vào trường ${fieldName} thành công!`);
    } else {
      console.error("Không tìm thấy tài liệu!");
    }
  } catch (error) {
    console.error(`Lỗi khi thêm dữ liệu vào trường ${fieldName}:`, error);
  }
};

export const updateDataInArrayField = async (
  collectionName,
  documentId,
  fieldName,
  dataIndex,
  updatedData
) => {
  try {
    const ref = doc(db, collectionName, documentId);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      const documentData = snapshot.data();
      const arrayField = documentData[fieldName] || [];

      if (dataIndex >= 0 && dataIndex < arrayField.length) {
        arrayField[dataIndex] = updatedData;

        await updateDoc(ref, { [fieldName]: arrayField });

        console.log(`Cập nhật dữ liệu trong trường ${fieldName} thành công!`);
      } else {
        console.error("Số thứ tự dữ liệu không hợp lệ!");
      }
    } else {
      console.error("Không tìm thấy tài liệu!");
    }
  } catch (error) {
    console.error(`Lỗi khi cập nhật dữ liệu trong trường ${fieldName}:`, error);
  }
};

export const deleteDataFromArrayField = async (
  collectionName,
  documentId,
  fieldName,
  dataIndex
) => {
  try {
    const ref = doc(db, collectionName, documentId);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      const documentData = snapshot.data();
      const arrayField = documentData[fieldName] || [];

      if (dataIndex >= 0 && dataIndex < arrayField.length) {
        arrayField.splice(dataIndex, 1);

        await updateDoc(ref, { [fieldName]: arrayField });

        console.log(`Xóa dữ liệu khỏi trường ${fieldName} thành công!`);
      } else {
        console.error("Số thứ tự dữ liệu không hợp lệ!");
      }
    } else {
      console.error("Không tìm thấy tài liệu!");
    }
  } catch (error) {
    console.error(`Lỗi khi xóa dữ liệu khỏi trường ${fieldName}:`, error);
  }
};
