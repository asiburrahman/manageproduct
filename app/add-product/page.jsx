import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/authOptions";
import AddProductForm from "./components/AddProductPage";


export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

console.log("Session is",session);

  // if (!session) {
  //   redirect("/api/auth/signin");
  // }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      {/* pass session down to client form */}
      <AddProductForm session={session} />
    </div>
  );
}