# 🚀 Personal Portfolio Frontend

<div align="center">

![Portfolio Banner](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=edges&q=80)

**A modern, responsive portfolio website built with Next.js 15 and TypeScript**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

[🌐 Live Demo](https://portfolio-frontend-five-psi.vercel.app/) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/sufiansar/A7_frontend/issues) • [✨ Request Feature](https://github.com/sufiansar/A7_frontend/issues)

</div>

---

## ✨ Features

### 🎨 **Modern Design**
- Clean, professional dark theme with gradient accents
- Responsive design that works on all devices
- Smooth animations and transitions
- Interactive UI components

### 📝 **Content Management**
- **Blog System**: Write and manage blog posts with rich content
- **Project Showcase**: Display projects with live demos and GitHub links
- **Skills Display**: Showcase technical skills with proficiency levels
- **About Section**: Personal information and professional journey

### 🔐 **Authentication & Admin**
- Secure authentication with NextAuth.js
- Protected admin dashboard
- Role-based access control
- Profile management

### 🛠 **Developer Experience**
- **TypeScript**: Full type safety throughout the application
- **Modern React**: Latest React 19 with hooks and functional components
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Beautiful Radix UI components with custom styling
- **State Management**: Efficient state handling with React Context

---

## 🏗 Architecture

### **Project Structure**
```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes (home, about, contact)
│   ├── (private)/         # Protected admin routes
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── modules/          # Feature-specific components
│   └── shared/           # Shared components
├── actions/              # Server actions and API calls
├── helpers/              # Utility functions and configurations
├── interfaces/           # TypeScript type definitions
├── lib/                  # Library configurations
└── providers/            # React context providers
```

### **Key Technologies**

#### **Frontend Stack**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework

#### **UI & Styling**
- **Radix UI** - Headless UI components
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations
- **React Hot Toast** - Notification system

#### **Forms & Validation**
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation resolvers

#### **Authentication**
- **NextAuth.js** - Authentication for Next.js
- **JWT** - Secure token-based authentication

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/sufiansar/A7_frontend.git
   cd A7_frontend
   ```

2. **Install dependencies**
   ```bash
   # Using bun (recommended)
   bun install
   
   # Or using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   API_BASE_URL=your-backend-api-url
   ```

4. **Run the development server**
   ```bash
   bun dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage

### **Public Pages**
- **Home** (`/`) - Hero section with featured content
- **About** (`/about`) - Personal information and background
- **Projects** (`/projects`) - Portfolio of projects
- **Blog** (`/blogs`) - Technical articles and thoughts
- **Contact** (`/contact`) - Get in touch form
- **Skills** (`/skills`) - Technical skills showcase

### **Admin Dashboard** (Protected)
- **Dashboard** (`/dashboard`) - Overview and analytics
- **Manage Posts** (`/dashboard/blogs`) - Create and edit blog posts
- **Manage Projects** (`/dashboard/projects`) - Add and update projects
- **Manage Skills** (`/dashboard/skills`) - Update skill proficiencies
- **Profile** (`/dashboard/profile`) - Edit personal information

### **Authentication**
- **Login** (`/login`) - Secure admin access
- Automatic redirect to dashboard after successful login
- Session management with NextAuth.js

---

## 🎨 Customization

### **Styling**
The project uses Tailwind CSS with a custom dark theme. Main colors:
- **Primary**: Blue gradient (`from-blue-400 to-purple-500`)
- **Background**: Dark grays (`gray-900`, `gray-800`)
- **Text**: White and gray variations
- **Accents**: Blue and purple gradients

### **Components**
All UI components are built with Radix UI and styled with Tailwind CSS:
- Form components with validation
- Interactive cards and buttons
- Responsive navigation
- Modal dialogs
- Data tables

### **Content**
- Blog posts support markdown content
- Projects can include live demos and GitHub links
- Skills can have custom icons and proficiency levels
- All content is managed through the admin dashboard

---

## 🔧 Scripts

```bash
# Development
bun dev              # Start development server with Turbopack
bun build            # Build for production
bun start            # Start production server
bun lint             # Run ESLint

# Alternative package managers
npm run dev          # Development with npm
yarn dev             # Development with yarn
```

---

## 📦 Dependencies

### **Core Dependencies**
- `next` - React framework
- `react` & `react-dom` - React library
- `typescript` - Type safety
- `next-auth` - Authentication
- `axios` - HTTP client

### **UI & Styling**
- `@radix-ui/*` - Headless UI components
- `tailwindcss` - CSS framework
- `lucide-react` - Icons
- `clsx` - Conditional classes

### **Forms & Validation**
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `@hookform/resolvers` - Form resolvers

### **Utilities**
- `next-themes` - Theme management
- `react-hot-toast` - Notifications
- `class-variance-authority` - Component variants

---

## 🌐 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically on every push

**🌐 Live Site**: [https://portfolio-frontend-five-psi.vercel.app/](https://portfolio-frontend-five-psi.vercel.app/)

### **Other Platforms**
The project can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- AWS
- DigitalOcean

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Style**
- Use TypeScript for all new code
- Follow the existing code style
- Run `bun lint` before committing
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sufian Sar**
- GitHub: [@sufiansar](https://github.com/sufiansar)
- Email: [sufiancodecrush@gmail.com](mailto:sufiancodecrush@gmail.com)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for the accessible UI components
- [Vercel](https://vercel.com/) for hosting and deployment
- The open-source community for the incredible tools and libraries

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/sufiansar/A7_frontend?style=social)](https://github.com/sufiansar/A7_frontend/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/sufiansar/A7_frontend?style=social)](https://github.com/sufiansar/A7_frontend/network/members)

</div>
