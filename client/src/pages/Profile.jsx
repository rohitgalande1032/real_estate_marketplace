import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from "../redux/user/userSlice";
import {signOutUserStart, signOutUserSuccess, signOutUserFailure} from '../redux/user/userSlice'

function Profile() {
    const {user, loading, error} = useSelector((state) => state.user)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false)
    const [formData, setFormData] = useState({})
    const [updateSuccess, setUpdateSuccess] = useState(false)

    const dispatch = useDispatch()

    console.log(formData);
    

    // console.log(file);
    // console.log(filePerc)
    
    const fileRef = useRef(null)
    useEffect(() => {
        if (file) {
          handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        if (!file) {
            console.log("No file selected for upload");
            return;
        }

        const storage = getStorage(app);
        const fileName = new Date().getTime() + "_" + file.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Track progress
        uploadTask.on(
            'state_changed',
            (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            setFilePerc(Math.round(progress))
            },
            (error) => {
            // Handle unsuccessful uploads
            setFileUploadError(true)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then
                ((downLoadUrl) => 
                    setFormData({...formData, avatar: downLoadUrl}))
            }
        )
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(updateUserStart())
            const res = await fetch(`/api/user/update/${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            if(data.success == false){
                dispatch(updateUserFailure(data.message))
                return
            }
            dispatch(updateUserSuccess(data))
            setUpdateSuccess(true)
        } catch (error) {
            dispatch(updateUserFailure(error.message))
        }
    }

    const handleDeleteUser = async () => {
        try {
          dispatch(deleteUserStart());
          const res = await fetch(`/api/user/delete/${user._id}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
          }
          dispatch(deleteUserSuccess(data));
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
      };

      const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart())
            const res = await fetch('/api/auth/signout')
            const data = await res.json()
            if(data.success === false){
                dispatch(signOutUserFailure(data.message))
                return
            }
            dispatch(signOutUserSuccess(data))
        } catch (error) {
            dispatch(signOutUserFailure(error.message))
        }
      }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="file" ref={fileRef} onChange={(e)=> setFile(e.target.files[0])} className="hidden" accept="images/*"/>
                <img onClick={()=>fileRef.current.click()} src={formData.avatar || user.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>
                <p className="text-sm self-center">
                    {fileUploadError ? (
                        <span className="text-red-700">Image upload error (image should be less than 2 MB)</span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                    ) : filePerc == 100 ? (
                        <span className="text-green-700">Image successfully uploaded</span>
                    ) : ('')
                    }
                </p>
                <input onChange={handleChange} defaultValue={user.username} type="text" placeholder="username" id="username" className="border p-3 rounded-lg"/>
                <input onChange={handleChange} defaultValue={user.email} type="email" placeholder="email" id="email" className="border p-3 rounded-lg"/>
                <input onChange={handleChange} type="password" placeholder="password" id="password" className="border p-3 rounded-lg"/>
                <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...': 'Update'}</button>
            </form>
            <div className="flex justify-between mt-5">
                <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
                <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
            </div>
            <p className="text-red-700 mt-5">
                {error ? error : ''}
            </p>
            <p className="text-green-700 mt-5">
                {updateSuccess ? 'User is updated successfully' : ''}
            </p>
        </div>
    )
}

export default Profile