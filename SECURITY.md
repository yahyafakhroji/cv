# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by:

1. **Do NOT open a public issue** - Security vulnerabilities should be reported privately
2. **Email**: contact@hiyahya.dev with subject "Security Vulnerability Report"
3. **Provide details**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Response Time

- Initial response: Within 48 hours
- Status update: Within 7 days
- Fix timeline: Depends on severity (1-30 days)

## Security Best Practices

### For Contributors

- Never commit secrets, API keys, or credentials
- Use environment variables for sensitive data
- Follow secure coding practices
- Keep dependencies updated

### For Users/Forkers

1. **Environment Variables**: Copy `.env.example` to `.env.local` and never commit it
2. **Dependencies**: Run `bun audit` regularly to check for vulnerabilities
3. **Cloudflare Secrets**: Use Wrangler secrets for production credentials:
   ```bash
   bunx wrangler secret put SECRET_NAME
   ```
4. **Custom Domain**: Update `wrangler.toml` with your own domain before deploying

## Known Security Considerations

- This is a static portfolio site with no backend authentication
- All data is public and hardcoded in `src/data/resume-data.tsx`
- Google Analytics tracking (if enabled) follows GDPR guidelines
- Cloudflare Workers provides DDoS protection automatically

## Disclosure Policy

- Security issues will be disclosed after a fix is deployed
- Credit will be given to researchers who report responsibly
- Public disclosure timeline: 90 days after fix or by mutual agreement

## Updates

Security updates will be released as patch versions and documented in the release notes.

---

Last Updated: January 2026
