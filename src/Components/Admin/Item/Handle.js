import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";

export const uploadImage = async (e, locate) => {
  try {
    let selectImage = e.target.files[0];
    const filetypes = ["image/jpeg", "image/jpg", "image/png"];

    if (filetypes.includes(selectImage.type)) {
      const storage = getStorage();
      let storageRef = ref(storage, `${locate}/${selectImage.name}`);

      const snapshot = await uploadBytes(storageRef, selectImage);
      console.log("Uploaded a blob or file!");

      const url = await getDownloadURL(snapshot.ref);
      return url;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return null; // Return null or handle the error as needed
  }
};
