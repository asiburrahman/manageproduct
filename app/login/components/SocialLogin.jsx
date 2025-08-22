"use client";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";



const SocialLogin = () => {
    const router = useRouter();
  const session = useSession();

  const handleSocialLogin = (providerName) => {
    signIn(providerName);
  };

   useEffect(() => {
    if (session?.status == "authenticated") {
      router.push("/");
      toast("Successfully Logged IN");
    }
  }, [session?.status]);

  return (
    <div className="flex justify-center gap-8">
      <button 
        onClick={() => handleSocialLogin("google")}
        className=" rounded-full p-3 btn btn-primary"
      >
        <FaGoogle type="button" />
      </button>
      {/* <p
        onClick={() => handleSocialLogin("github")}
        className="bg-slate-200 rounded-full p-3"
      >
        <FaGithub type="button" />
      </p> */}
    </div>
  );
};

export default SocialLogin;