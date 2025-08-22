

import AboutContent from "./components/AboutContent";


export const metadata = {
  title: "About | ProductManager",
  description: "Learn more about ProductManager and its features",
};


const page = () => {
    return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About ProductManager
        </h1>
        <AboutContent></AboutContent>
      </div>
    </main>
  );
};

export default page;