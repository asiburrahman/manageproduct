"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
/* Added FaCamera for the upload button icon */
import { FaCamera } from "react-icons/fa";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  /* Added state to track image upload progress */
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const getValidSrc = (src) => {
    if (!src || typeof src !== 'string' || src.length < 10) return "/assets/images/logo.png";
    if (src.startsWith("/")) return src;
    try {
      const url = new URL(src);
      /* 
         Next.js Image requires hostnames to be whitelisted. 
         If a user types a partial URL (like https://i.ibb.c), 
         it might be a "valid" URL but won't match our config.
         We add a check for a proper TLD to minimize crashes during typing.
      */
      const parts = url.hostname.split('.');
      if (parts.length < 2 || parts.pop().length < 2) {
        return "/assets/images/logo.png";
      }
      return src;
    } catch {
      return "/assets/images/logo.png";
    }
  };

  /* 
     New feature: handleImageUpload 
     Uploads the selected file to ImgBB and updates the image URL state.
  */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Using the ImgBB API key from environment variables
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setImage(data.data.url); // Update state with the new URL
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image. Please check your API key.");
      }
    } catch (err) {
      toast.error("An error occurred while uploading the image.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      /* 
         Sends the updated name and image URL (could be from upload or manual input) 
         to our internal update API.
      */
      const res = await fetch("/api/users/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      // Important: Tell NextAuth to update the client-side session cookie!
      await update({ name, image });
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (status === "loading") {
    return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  if (status === "unauthenticated") {
    return <div className="text-center mt-20 text-xl font-bold">Please log in to view this page.</div>;
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-base-100 rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        
        <div className="px-8 pb-8 relative">
          {/* Avatar Profile Section with Upload Overlay */}
          <div className="flex justify-center -mt-16 mb-6">
            <div className="relative group">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-xl bg-white overflow-hidden">
                  <Image
                    src={getValidSrc(image)} // Show current state (uploaded or initial)
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Upload Overlay Button */}
              <label 
                htmlFor="photo-upload" 
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-bold"
              >
                {isUploadingImage ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <FaCamera className="text-xl mb-1" />
                    <span>Upload</span>
                  </>
                )}
              </label>
              <input 
                id="photo-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-base-content">{session?.user?.name}</h1>
            <p className="text-gray-500">{session?.user?.email}</p>
            <div className="badge badge-primary badge-outline mt-2 uppercase text-xs font-bold">{session?.user?.role}</div>
          </div>

          <div className="divider italic text-sm opacity-50">Profile Settings</div>

          <form onSubmit={handleUpdate} className="space-y-6 max-w-md mx-auto">
            {/* 
               Display Name Input 
            */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase text-gray-500 tracking-wider">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full focus:input-primary bg-base-200/50 border-none rounded-xl"
                placeholder="Your Name"
                required
              />
            </div>

            {/* 
               Change Profile Photo Section 
               Updated to show the user's existing photo beside the change button for better UX.
            */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase text-gray-500 tracking-wider">Profile Photo</label>
              <div 
                onClick={() => document.getElementById('photo-upload').click()}
                className="flex items-center gap-4 bg-base-200/50 p-4 rounded-2xl border-2 border-dashed border-base-300 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
              >
                {/* 
                   Existing Photo Preview 
                */}
                <div className="relative">
                   <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-base-100 shadow-sm">
                      <img 
                        src={getValidSrc(image)} 
                        alt="Current Profile" 
                        className="w-full h-full object-cover"
                      />
                   </div>
                   <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full text-[10px] shadow-sm">
                      <FaCamera />
                   </div>
                </div>

                <div className="flex flex-col">
                   <span className="text-sm font-bold text-base-content">Change profile photo</span>
                   <span className="text-[10px] text-gray-500 italic">Select a new image file to update</span>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full rounded-xl shadow-lg hover:shadow-primary/20 transition-all border-none font-bold uppercase tracking-widest text-xs" 
              disabled={isUpdating || isUploadingImage}
            >
              {isUpdating ? <span className="loading loading-spinner loading-sm"></span> : "Save Profile Changes"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

