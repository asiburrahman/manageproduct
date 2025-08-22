# ProductManage 🛒

ProductManage is a modern web application for managing products with features like product listing, product details, discounts, stock availability, and user-friendly navigation. Built with **Next.js**, **Tailwind CSS**, and **MongoDB**, it provides a smooth and responsive experience.

---

## 🚀 Features
- Browse product catalog with images, prices, and discounts.
- View detailed product information with ratings and stock availability.
- Add products to the cart.
- Dynamic routing for product details pages.
- Responsive UI with Tailwind CSS.
- Server-side rendering (SSR) for SEO and performance.
- Secure image upload & product management (Admin functionality coming soon).

---

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/productmanage.git
   cd productmanage
Install dependencies

bash
Copy
Edit
npm install
Create .env.local file in the project root and add:

env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000
Run the development server

bash
Copy
Edit
npm run dev
Open http://localhost:3000 in your browser 🎉

📂 Route Summary
Route	Description
/ Homepage with product listings
/products/[id]	Dynamic product details page
/about	About page with project information
/add-product Add product with protected route
/contact	Contact page with form and contact details

📦 Tech Stack
Frontend: Next.js, React, Tailwind CSS, DaisyUI

Backend: Next.js API routes, MongoDB

Auth: (Planned) NextAuth.js

Deployment: Vercel

📌 Future Enhancements
Admin dashboard for product management (CRUD).

Authentication with NextAuth (Google, GitHub, Credentials).

Shopping cart with checkout system.

Image upload using Cloudinary or Firebase.

Role-based access for Admin & Users.

👨‍💻 Author
Asibur Rahman
Portfolio | GitHub | LinkedIn
