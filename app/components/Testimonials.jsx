"use client";

const testimonials = [
  {
    id: 1,
    name: "Rakib Hasan",
    role: "Product Manager",
    message:
      "ManageProduct has simplified our entire workflow. We can easily track, edit, and manage products in real-time. It’s fast and reliable!",
  },
  {
    id: 2,
    name: "Sadia Khatun",
    role: "Admin",
    message:
      "I love the dashboard features and how secure the authentication system is. The product stats overview gives me full control at a glance.",
  },
  {
    id: 3,
    name: "Arif Hossain",
    role: "Seller",
    message:
      "Adding and managing my product listings has never been this smooth. The platform is super user-friendly and efficient! It’s fast and reliable!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              <p className="text-gray-700 italic mb-4">
                “{testimonial.message}”
              </p>
              <h3 className="text-lg font-semibold text-indigo-700">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
