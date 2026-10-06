# Fashion Designer Portfolio Website

A modern, professional-grade fashion designer portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Designed for NIFT students and fashion professionals to showcase their work with style and sophistication.

## ✨ Features

- **Modern Design**: Clean, minimalist layout with elegant typography and sophisticated color palette
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Animations**: Smooth micro-interactions and scroll-based animations using Framer Motion
- **Dark/Light Theme**: Built-in theme toggle with system preference detection
- **Portfolio Filtering**: Interactive project categorization and filtering
- **Contact Form**: Functional contact form with validation and toast notifications
- **Performance Optimized**: Built with Next.js for optimal loading speeds and SEO

## 🚀 Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React, React Icons
- **Theme**: next-themes for dark/light mode
- **Notifications**: Sonner for toast messages

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── sections/         # Page sections (Hero, About, Portfolio, etc.)
│   └── ui/               # UI components (Button, Card, etc.)
├── data/                 # JSON data files
│   └── portfolio.json    # Portfolio and experience data
├── lib/                  # Utility functions
└── public/              # Static assets
```

## 🎨 Customization

### Updating Portfolio Content

Edit `/data/portfolio.json` to update:
- Project details and images
- Skills and experience
- Timeline events
- Personal information

### Styling

The design uses Tailwind CSS with custom CSS variables defined in `globals.css`. You can customize:
- Color palette by modifying CSS variables
- Typography by updating the Inter font import
- Spacing and layout using Tailwind classes

### Images

Replace placeholder images with your own:
- Hero background image
- Profile photo in About section
- Portfolio project images
- Use high-quality images (min 800px width recommended)

## 🛠️ Development

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
npm run build
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to [Netlify](https://netlify.com)

### Other Platforms

This is a static Next.js app (`output: 'export'`) that can be deployed to any static hosting service.

## 📝 Content Guidelines

### Portfolio Projects
- Use high-quality images (1200x800px recommended)
- Write compelling descriptions that showcase your design process
- Include relevant tags and categories
- Organize projects by importance/recency

### About Section
- Professional headshot (square aspect ratio works best)
- Clear, engaging bio that tells your story
- Highlight your unique design philosophy
- Update skills with accurate proficiency levels

### Experience Section
- Include education, internships, exhibitions, and achievements
- Use action-oriented descriptions
- Add specific dates and locations
- Highlight measurable accomplishments

## 🎯 SEO Optimization

- Update metadata in `app/layout.tsx`
- Add alt text to all images
- Use semantic HTML structure
- Optimize images with Next.js Image component

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Tips for Fashion Designers

1. **High-Quality Images**: Use professional photography for your portfolio pieces
2. **Consistent Branding**: Maintain consistent colors and typography that reflect your design aesthetic
3. **Mobile Optimization**: Many clients will view your portfolio on mobile devices
4. **Regular Updates**: Keep your portfolio current with your latest work
5. **Professional Copy**: Use clear, professional language that showcases your expertise
6. **Contact Information**: Make it easy for potential clients to reach you

---




deployment : https://debolina-fashion-portfolio.onrender.com/


Built with ❤️ for the fashion design community. Showcase your creativity with style!
