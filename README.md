# ProductManage 🛒

**ProductManage** is a premium, full-stack web application designed for seamless product management and user engagement. Built with a modern tech stack including **Next.js 16**, **React 19**, and **MongoDB**, it features a robust authentication system, real-time profile updates, and a responsive shopping experience.

🔗 **Live Demo**: [https://manageproduct.vercel.app](https://manageproduct.vercel.app)

---

## 🚀 Key Features

### 🔐 Authentication & Security
- **Full Auth System**: Implemented using **NextAuth.js**.
- **Multiple Providers**: Support for **Google Login** and traditional **Credentials (Email/Password)**.
- **Protected Routes**: Secure access to management features like "Add Product" using custom middleware.
- **Session Sync**: Real-time session synchronization for instant UI updates across the application.

### 👤 User Profile Management
- **Dedicated Profile Page**: A beautiful, responsive profile dashboard (`/profile`) with gradient aesthetics.
- **Manual Photo Upload**: Integrated **ImgBB API** for direct photo uploads from the browser.
- **Real-time Updates**: Change your name or photo and see the changes reflected in the Navbar instantly without a page refresh.
- **Premium Navigation**: Custom user dropdown in the Navbar with backdrop-blur and icon-rich menus.

### 📦 Product Experience
- **Modern Product Catalog**: Clean grid layout with hover effects, status badges (Price, Stock, Brand), and rating displays.
- **Dynamic Product Details**: Full-width image handling with `object-contain` to preserve aspect ratios, plus detailed specifications.
- **Inventory Management**: Easy-to-use interface for adding new products to the database.

### 🎨 Design & UX
- **Rich Aesthetics**: Leverages **Tailwind CSS** and **DaisyUI** for a consistent, professional design system.
- **Responsive Layout**: Fully optimized for mobile, tablet, and desktop viewing.
- **Micro-animations**: Smooth transitions, loading states, and hover effects for a "live" feel.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Database**: MongoDB (implemented with a singleton pattern for reliable serverless connections)
- **Authentication**: NextAuth.js (JWT Strategy)
- **Styling**: Tailwind CSS & DaisyUI
- **Image Hosting**: ImgBB
- **Notifications**: React Toastify

---

## 📂 Project Structure

- `/app`: Next.js App Router (Pages, API Routes, Layouts)
- `/components`: Reusable UI components and Shared layout elements
- `/lib`: Database connection logic, Auth configuration, and core utilities
- `/service`: Business logic components and product-related services

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/asiburrahman/manageproduct
   cd manageproduct
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
   GOOGLE_CLIENT_ID=your_google_id
   GOOGLE_CLIENT_SECRET=your_google_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 👨‍💻 Author

**Asibur Rahman**  
[Portfolio](https://asibur-portfolio-react.netlify.app) | [GitHub](https://github.com/asiburrahman) | [LinkedIn](https://www.linkedin.com/in/asiburrahman/)
