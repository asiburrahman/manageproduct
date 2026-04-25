"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  const getValidSrc = (src) => {
    if (!src || typeof src !== 'string' || src.length < 10) return "/assets/images/logo.png";
    if (src.startsWith("/")) return src;
    try {
      const url = new URL(src);
      /* 
         Next.js Image requires hostnames to be whitelisted. 
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      /* 
         Update only the name now, as the image upload option was removed.
      */
      const res = await fetch("/api/users/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: session?.user?.image }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      // Update the client-side session with the new name
      await update({ name });
      
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
          {/* Avatar Profile Section (Display Only) */}
          <div className="flex justify-center -mt-16 mb-6">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-xl bg-white overflow-hidden">
                <Image
                  src={getValidSrc(session?.user?.image)}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
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

            <button 
              type="submit" 
              className="btn btn-primary w-full rounded-xl shadow-lg hover:shadow-primary/20 transition-all border-none font-bold uppercase tracking-widest text-xs" 
              disabled={isUpdating}
            >
              {isUpdating ? <span className="loading loading-spinner loading-sm"></span> : "Save Profile Changes"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}


