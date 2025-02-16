import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
const Profile = () => {
    const fileRef = useRef(null)
    const { currentUser } = useSelector((state) => state.user)
    const [file, setFile] = useState(undefined)
    const [filepercentage, setFilePercentage] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false)
    const [formData, setFormData] = useState({})
    console.log(formData)
    console.log(filepercentage)
    console.log(fileUploadError)
    useEffect(() => {
        if (file) {
            handleUploadFile(file)
        }
    }, [file])

    const handleUploadFile = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePercentage(Math.round(progress));
            },
            (error) => {
                console.error("Upload failed", error);
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setFormData((prevFormData) => ({ ...prevFormData, avatar: downloadURL }));
                }).catch((error) => {
                    console.error('Failed to get download URL', error);
                });
            }
        );
    };
    return (

        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7"> Profile</h1>
            <form className="flex flex-col gap-3">
                <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                <img src={formData.avatar || currentUser.avatar} alt="profile" onClick={() => fileRef.current.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
                <p className="text-sm self-center">
                    {fileUploadError ? (<span className="text-red-700">Error image upload (image must be less then 2 mb)</span>) : filepercentage > 0 && filepercentage < 100 ? (<span className="text-slate-700">{`uploading ${filepercentage}%`}</span>) : filepercentage == 100 ? (<span className="text-green-700">Image Successfully uploaded!</span>) : ""}
                </p>
                <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg " />
                <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg " />
                <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg " />
                <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>
            </form>
            <div className="flex justify-between mt-4 font-semibold">
                <span className="text-red-700 cursor-pointer">Delete Account</span>
                <span className="text-red-700 cursor-pointer">Sign Out</span>

            </div>
        </div>
    )
}

export default Profile