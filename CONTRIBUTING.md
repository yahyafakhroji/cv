# Contributing to CV/Portfolio Project

First off, thank you for considering contributing to this project! 🎉

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/OS information

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:
- Check existing issues first
- Clearly describe the enhancement
- Explain why it would be useful
- Provide examples if possible

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**:
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed
4. **Test your changes**:
   ```bash
   bun dev
   bun run build
   ```
5. **Commit with clear messages**:
   ```bash
   git commit -m "Add: Brief description of changes"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/cv.git
cd cv

# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run pages:build

# Preview production build
bun run pages:dev
```

## Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **React**: Functional components with hooks
- **Formatting**: Prettier is configured, run `bun run format` (if added)
- **Naming**: 
  - Components: PascalCase
  - Files: kebab-case
  - Variables: camelCase

## Project Structure

```
src/
├── app/           # Next.js App Router
├── components/    # React components
│   ├── sections/  # Page sections
│   ├── ui/        # Reusable UI
│   └── animations/# Animation components
├── data/          # Static data
├── hooks/         # Custom hooks
└── lib/           # Utilities
```

## Commit Message Format

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding/updating tests
- `chore:` - Maintenance tasks

Example: `feat: add parallax scroll effect to hero section`

## Areas for Contribution

Looking for ways to contribute? Here are some ideas:

### 🎨 Design
- New color themes
- Animation improvements
- Mobile responsiveness tweaks
- Accessibility enhancements

### 🚀 Features
- Blog integration
- CMS support (Contentful, Sanity, etc.)
- Multi-language support
- Dark/light theme toggle
- Project filtering/search

### 📝 Documentation
- Tutorial videos
- Setup guides for different platforms
- Troubleshooting guides
- Translation of docs

### 🐛 Bug Fixes
- Browser compatibility issues
- Performance optimizations
- Build improvements

### 🧪 Testing
- Unit tests
- E2E tests
- Visual regression tests

## Review Process

1. Pull requests are reviewed by maintainers
2. Changes may be requested
3. Once approved, PR will be merged
4. Your contribution will be credited in releases

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on what's best for the community
- Show empathy towards others

## Questions?

Feel free to:
- Open an issue for discussion
- Reach out via [LinkedIn](https://www.linkedin.com/in/yahya-fakhroji/)
- Check existing issues and discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making this project better! 🙏
