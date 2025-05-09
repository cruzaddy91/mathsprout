# MathSprout 🌱

MathSprout is an interactive educational platform designed to make learning mathematics engaging and fun for students. The platform combines game-based learning with traditional teaching methods to create an immersive learning experience.

## Team Members

- [Lauren Morgenthaler](https://github.com/lmorgenthaler) - Computer Science major at Westminster University with a minor in Mathematics

## Project Structure

```
MathSprout/
├── frontend/         # Angular frontend application
├── backend/         # Backend API server
└── supabase/        # Supabase configuration and migrations
```

## Technologies Used

### Frontend
- Angular
- TypeScript
- Supabase Client
- TailwindCSS

### Backend
- Supabase (Backend as a Service)
- PostgreSQL Database

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI
- Git

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment files:
   - Copy `src/environments/environment.example.ts` to `src/environments/environment.ts`
   - Update the Supabase configuration in the environment file

4. Start the development server:
   ```bash
   ng serve
   ```

The application will be available at `http://localhost:4200`

## Development

### Branch Structure
- `main`: Production-ready code
- `dev`: Development branch
- Feature branches:
  - `feature/deployment-setup`
  - `feature/display-analytics`
  - `feature/integrate-games`

### Contributing

1. Create a new feature branch from `dev`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

3. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request to merge into `dev`

## License

This project is private and confidential. All rights reserved. 