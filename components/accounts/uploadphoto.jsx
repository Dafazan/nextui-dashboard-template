'use client'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/app/db/firebase"; // Assuming firebase.js is in the same directory
import { useState } from "react";

const Photoup = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            // Create a storage reference
            const storageRef = ref(storage, `images/${selectedFile.name}`);

            // Upload file to Firebase Storage
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);

            // Get download URL after successful upload
            uploadTask.on('state_changed',
                null,
                (error) => {
                    console.error('Error uploading image:', error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    // Update Firestore document with the image URL
                    const user = auth.currentUser;
                    if (user) {
                        const userDocRef = doc(db, 'users', user.uid);
                        await updateDoc(userDocRef, {
                            img: downloadURL
                        });
                        console.log('Image URL updated successfully.');
                         window.location.reload();
                    } else {
                        console.error('User not authenticated.');
                    }
                }
            );
        } else {
            console.error('No file selected.');
        }
    };

    return (
        <div className="flex justify-between w-full gap-2">
            <input className="w-full" type="file" onChange={handleFileChange} />
            <button className="bg-blue-500 p-2 rounded-md w-full" onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default Photoup;
