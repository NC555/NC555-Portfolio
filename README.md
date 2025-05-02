# 🌟 Noy Portfolio 🌟

A modern, responsive portfolio website built with cutting-edge web technologies.

## ✨ Features

- 🎨 Modern and sleek design
- 📱 Fully responsive across all devices
- 🚀 Optimized performance
- 📝 Blog functionality
- 🖼️ Portfolio showcase
- 📊 Interactive components
- 🔧 TinaCMS for easy content management

## 🛠️ Technologies

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TinaCMS](https://img.shields.io/badge/TinaCMS-302454?style=for-the-badge&logo=tinacms&logoColor=white)

## 📸 Screenshots

_Coming soon_

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19.1 or later
- pnpm (recommended)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/YOUR_USERNAME/noy-portfolio.git
   cd noy-portfolio
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Create a `.env` file based on `.env.example`

4. Start the development server

   ```bash
   pnpm run dev
   ```

   > **Note:** The `dev` script uses the `--turbo` flag to enable Next.js Turbopack for potentially faster development performance. It also sets a Node.js memory limit (`--max-old-space-size=8192`). You can adjust this memory value (e.g., `4096` for 4GB) in the `package.json` file based on your system's resources if needed.

5. Open [http://localhost:3000](http://localhost:3000) in your browser

6. Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin) to manage content

## 🔧 Configuration

You can customize the portfolio by editing the configuration files in the `src/data` directory or by using the admin interface.

### Editable Configuration Files

| File                          | Description                    | Admin Page                                                          |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------- |
| `src/data/homeConfig.json`    | Home page content and settings | [/admin/home-editor](http://localhost:3000/admin/home-editor)       |
| `src/data/sidebarConfig.json` | Sidebar information and links  | [/admin/sidebar-editor](http://localhost:3000/admin/sidebar-editor) |
| `src/data/resumeConfig.json`  | Resume/CV page content         | [/admin/resume-editor](http://localhost:3000/admin/resume-editor)   |
| `src/data/blogConfig.json`    | Blog settings                  | [/admin/blog](http://localhost:3000/admin/blog)                     |
| `src/data/galleryConfig.json` | Gallery settings               | [/admin/gallery-editor](http://localhost:3000/admin/gallery-editor) |
| `src/data/appConfig.json`     | Global application settings    | -                                                                   |

### Admin Interface

For better compatibility and ease of use, it's recommended to edit content through the admin interface:

- **Main Admin Panel**: [/admin](http://localhost:3000/admin)
- **Home Page Editor**: [/admin/home-editor](http://localhost:3000/admin/home-editor)
- **Sidebar Editor**: [/admin/sidebar-editor](http://localhost:3000/admin/sidebar-editor)
- **Resume Editor**: [/admin/resume-editor](http://localhost:3000/admin/resume-editor)
- **Blog Management**: [/admin/blog](http://localhost:3000/admin/blog)
- **Portfolio Management**: [/admin/portfolio](http://localhost:3000/admin/portfolio)
- **Gallery Editor**: [/admin/gallery-editor](http://localhost:3000/admin/gallery-editor)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ by Nati Cabti
