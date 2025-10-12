# GitHub Actions CI/CD Pipeline

This repository includes a comprehensive CI/CD pipeline using GitHub Actions for the Whispr frontend application.

## Workflows Overview

### 1. Main CI/CD Pipeline (`ci-cd.yml`)
**Triggers:** Push to `main`/`develop` branches, Pull Requests
**Features:**
- ✅ Linting and formatting checks
- ✅ TypeScript type checking
- ✅ Build verification
- ✅ Security audit
- ✅ Staging deployment (develop branch)
- ✅ Production deployment (main branch)
- ✅ Failure notifications

### 2. PR Validation (`pr-checks.yml`)
**Triggers:** Pull Requests to `main`/`develop` branches
**Features:**
- ✅ Code quality checks
- ✅ Build verification
- ✅ Security audit
- ✅ Automated PR comments with results

### 3. Release Management (`release.yml`)
**Triggers:** Git tags (v*), Manual dispatch
**Features:**
- ✅ Automated release creation
- ✅ Build artifact generation
- ✅ Asset upload (tar.gz, zip)
- ✅ Release notes generation

### 4. AWS Deployment (`deploy-aws.yml`)
**Triggers:** Workflow call
**Features:**
- ✅ S3 bucket deployment
- ✅ CloudFront cache invalidation
- ✅ Environment-specific deployments

### 5. Vercel Deployment (`deploy-vercel.yml`)
**Triggers:** Workflow call
**Features:**
- ✅ Vercel platform deployment
- ✅ Environment-specific builds
- ✅ Production/preview deployments

## Setup Instructions

### 1. Repository Secrets
Configure the following secrets in your GitHub repository:

#### For AWS Deployment:
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key

#### For Vercel Deployment:
- `VERCEL_TOKEN`: Vercel deployment token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

### 2. Environment Configuration
Create environments in GitHub:
- `staging`: For develop branch deployments
- `production`: For main branch deployments

### 3. Branch Protection Rules
Recommended branch protection rules:
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Require pull request reviews before merging
- Restrict pushes to main branch

## Usage Examples

### Manual Release
```bash
# Create and push a tag
git tag v1.0.0
git push origin v1.0.0
```

### Deploy to AWS
```yaml
# In your workflow
- uses: ./.github/workflows/deploy-aws.yml
  with:
    environment: 'production'
    bucket_name: 'my-app-prod'
    cloudfront_distribution_id: 'E1234567890'
  secrets:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Deploy to Vercel
```yaml
# In your workflow
- uses: ./.github/workflows/deploy-vercel.yml
  with:
    environment: 'preview'
  secrets:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
    VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Customization

### Adding New Checks
1. Edit the respective workflow file
2. Add new steps in the appropriate job
3. Update the README with new features

### Environment Variables
Add environment-specific variables in GitHub repository settings:
- `VITE_API_BASE_URL`: API base URL for builds
- `NODE_ENV`: Environment setting

### Notification Setup
Configure notifications in the `notify-failure` job:
- Slack webhooks
- Discord webhooks
- Email notifications
- Microsoft Teams

## Troubleshooting

### Common Issues
1. **Build failures**: Check Node.js version compatibility
2. **Linting errors**: Run `npm run lint:fix` locally
3. **Type errors**: Run `npx tsc --noEmit` locally
4. **Deployment failures**: Verify secrets and permissions

### Debug Steps
1. Check workflow logs in GitHub Actions tab
2. Verify all secrets are properly configured
3. Test builds locally with `npm run build`
4. Check environment-specific configurations

## Contributing

When adding new workflows:
1. Follow the existing naming conventions
2. Include proper error handling
3. Add documentation to this README
4. Test workflows in a separate branch first
