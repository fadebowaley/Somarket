# E-Commerce Application Setup and Guide

## Step 3: Database Setup

The Supabase migrations are already set up in `supabase/migrations/`. They will create:

- **Users table**
- **Products table**
- **Carts table**
- **Cart items table**
- All necessary relationships and policies

The migrations will also seed initial product data.

---

## Step 4: Start the Development Servers

### Terminal 1: Start the frontend (Next.js)
```bash
npm run dev:frontend
```

### Terminal 2: Start the backend (Express)
```bash
npm run dev:backend
```

The applications will be available at:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:3001](http://localhost:3001)

---

## Step 5: Testing

### Run all tests
```bash
npm test
```

### Run only backend tests
```bash
npm run test:backend
```

### Run only frontend tests
```bash
npm run test:frontend
```

---

## Important Configuration Notes

### Backend Configuration
- **Port:** `3001` (configurable in `server/index.js`)
- **Database:** Uses local JSON file (`server/data/db.json`)
- **JWT Secret:** Configured in `server/utils/auth.js`

### Frontend Configuration
- **Port:** `3000` (Next.js default)
- **API URL:** Configured in `lib/api/client.ts`
- **Supabase:** Configured through environment variables

### Testing Configuration
- **Backend:** Uses Jest (configured in `jest.config.js`)
- **Frontend:** Uses Vitest (configured in `vitest.config.ts`)

---

## Available Test Users
- You'll need to register first using the signup form.
- Example credentials:
  - **Email:** `test@example.com`
  - **Password:** `password123`
  - **Name:** Test User

---

## Features Available

- **User authentication (signup/login)**
- **Product listing**
- **Cart management**
- **Checkout process (simulated)**

---

## Development Tools

- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide icons**
- **TypeScript** for type safety

---

## To Verify Everything is Working

1. Start both servers.
2. Visit [http://localhost:3000](http://localhost:3000).
3. Create an account.
4. Browse products.
5. Add items to cart.
6. Test checkout process.

---

## Enhancements and Fixes

### Login and Logout Management
- After successful login, the app redirects to the landing page where products are displayed.
- The navbar shows a welcome message (e.g., "Welcome, [User's Name]") after login.
- Login and logout buttons toggle based on the user session state.

### Landing Page Features
- Display all products in a visually appealing grid/list format.
- Each product card includes:
  - Product image
  - Name
  - Price
  - "Add to Cart" and "Remove from Cart" buttons
- Persistent cart summary in the top-right corner dynamically updates.

### Cart Functionality
- View selected products in the cart.
- Adjust product quantities dynamically.
- Remove items from the cart.
- See total price and item count.

---

## Responsive Design

The application is fully responsive, optimized for both desktop and mobile views.

---

## Code and Deployment

1. **Clone the repository**
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the application at [http://localhost:3000](http://localhost:3000).

---

## Test Credentials

- **Email:** `test@example.com`
- **Password:** `password123`

---

## Workflow for Users

1. **Login**
   - Go to [http://localhost:3000/auth](http://localhost:3000/auth).
   - Use the test credentials.
   - Redirected to the home page with a welcome message.

2. **Add Products**
   - Browse the available products.
   - Click "Add to Cart" for any product.
   - Adjust quantity using `+` and `-` buttons.
   - Cart icon updates dynamically.

3. **View and Modify Cart**
   - Click the cart icon in the navbar.
   - Adjust quantities or remove items.
   - View total price and proceed to checkout.

---

## Optional Features (Planned)

- Add a search bar to filter products.
- Include product categories or filters for easier navigation.
