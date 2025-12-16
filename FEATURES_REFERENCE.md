# Platform Features & Edit Locations Reference

## 📚 Quick Features Index

| Feature | Location | Edit How | Effort |
|---------|----------|----------|--------|
| [Language Switcher](#language-switcher) | Navbar/Header | Add `<Language />` component | 1 min |
| [Theme Toggle](#theme-toggle) | Navbar/Header | Add `<Appearance />` component | 1 min |
| [Navigation Items](#navigation-items) | Navbar | Admin Settings or Database | 2 min |
| [Logo & Branding](#logo--branding) | Header/Footer | Replace image files | 5 min |
| [Hero Section](#hero-section) | Home Page | Edit React component | 10 min |
| [Courses Display](#courses-display) | Home/Browse | Filter & sorting config | 5 min |
| [Testimonials](#testimonials) | Home Page | Edit component data | 10 min |
| [Footer Content](#footer-content) | All Pages | Edit footer component | 5 min |
| [Colors & Typography](#colors--typography) | Global | Tailwind config | 15 min |
| [Blog Articles](#blog-articles) | Blog Page | Admin Panel | Variable |
| [User Roles](#user-roles) | Dashboard | Admin Settings | 10 min |
| [Payment Gateways](#payment-gateways) | Settings | Config files | 20 min |

---

## 🎯 Feature Details

### Language Switcher
**What it does:** Allows users to switch between English and Arabic
**Current Location:** 
- ✅ Dashboard header
- ✅ Public navbar (desktop & mobile)

**File:** `resources/js/components/language.tsx`
**To add to more places:**
```tsx
import Language from '@/components/language';

// In any component:
<Language />
```

**Supported Languages:** Edit in admin → Settings → Languages
**Direction:** Automatically RTL for Arabic, LTR for English

---

### Theme Toggle
**What it does:** Switches between Light and Dark mode
**Location:** 
- ✅ Dashboard header
- ✅ Public navbar

**File:** `resources/js/components/appearance.tsx`
**To add:**
```tsx
import Appearance from '@/components/appearance';

<Appearance />
```

**Themes:** Configured in `tailwind.config.js`

---

### Navigation Items
**What it does:** Displays menu items in header

**Current Items:**
- Courses
- Instructors  
- Become Instructor
- Blog
- (and more from database)

**Edit Location:** 
- Admin Panel → Settings → Navbar Configuration
- Database: `language_properties` table, group: `navbar`

**File:** `resources/js/layouts/partials/intro-navbar.tsx` (lines 25-28)
```tsx
{navbar &&
  navbar.properties.array.map((item) => (
    <Link key={item.url} href={item.url}>
      {item.title}
    </Link>
  ))}
```

---

### Logo & Branding
**What it does:** Displays brand logo

**File:** `resources/js/components/app-logo.tsx`
**Edit:** Replace image file or update component
**Current:** Logo from `public/images/logo.png`

**To change:**
1. Replace image in `public/` folder
2. Update path in `app-logo.tsx`
3. No rebuild needed

---

### Hero Section
**What it does:** Large banner at top of home page

**Files:**
- `resources/js/components/hero/` (multiple variants)
- `resources/js/pages/home/index.tsx` (imports hero)

**Edit:**
- Change text in component
- Update background image
- Modify CTA buttons
- Change dimensions/spacing

**To customize:**
1. Open hero component file
2. Edit content/styles
3. Rebuild: `npm run build`

---

### Courses Display
**What it does:** Shows course cards on home page and courses page

**Files:**
- `resources/js/components/course-card-*` (multiple styles)
- `resources/js/pages/courses/index.tsx` (courses list page)

**Display Logic:**
- Filters for status: `approved`
- Sorts by: Latest or Featured
- Pagination: Configurable

**To customize:**
1. Change filtering in controller
2. Modify card styling in component
3. Add/remove fields displayed

**Controller:** `app/Http/Controllers/CourseController.php`

---

### Testimonials
**What it does:** Displays student reviews/testimonials

**Files:**
- `resources/js/components/testimonials/` (multiple styles)
- Data from database: `reviews` or `testimonials` table

**Edit:**
- Add/edit testimonials in admin panel
- Change display count
- Update styling

**Database:** Query testimonials from reviews table with rating >= 4

---

### Footer Content
**What it does:** Displays links, info at bottom of pages

**File:** `resources/js/components/footer/`

**Contains:**
- Company info
- Links (About, Contact, Terms)
- Social media
- Newsletter signup
- Copyright

**To customize:**
1. Edit footer component
2. Update company info
3. Add/remove links
4. Rebuild: `npm run build`

---

### Colors & Typography
**What it does:** Sets global styling/theme

**Files:**
- `tailwind.config.js` (colors, fonts, breakpoints)
- `resources/css/app.css` (global styles)
- `tsconfig.json` (path aliases)

**Primary Colors:**
```js
// In tailwind.config.js
theme: {
  colors: {
    primary: '#your-color',
    secondary: '#your-color',
  }
}
```

**Fonts:**
- Default: System fonts
- Custom: Add in `resources/css/` and import

**To change:**
1. Edit `tailwind.config.js`
2. Update colors/fonts
3. Rebuild: `npm run build --silent`

---

### Blog Articles
**What it does:** Display blog posts

**Files:**
- `resources/js/pages/blog/index.tsx` (list)
- `resources/js/pages/blog/show.tsx` (single article)
- `Modules/Blog/` (blog module)

**Manage:** Admin Panel → Blog → Articles
**Database:** `posts` table

**Features:**
- Categories
- Tags
- Comments
- Search
- Pagination

---

### User Roles
**What it does:** Defines permissions (Admin, Instructor, Student)

**File:** `app/Enums/UserType.php`

**Current Roles:**
```php
Admin
Instructor  
Student
```

**Permissions:** 
- File: `app/Http/Middleware/`
- Managed via: Admin → Settings → Roles & Permissions

**To add role:**
1. Add to UserType enum
2. Create policy class
3. Define permissions
4. Update routes

---

### Payment Gateways
**What it does:** Handles course purchases

**Supported:** Stripe, PayPal, Razorpay, Mollie, SSLCommerz, Paytm

**Configuration:**
- Files: `config/paypal.php`, `config/stripe.php`, etc.
- Admin: Dashboard → Settings → Payment Gateways

**To add gateway:**
1. Install provider package
2. Create config file
3. Add controller/routes
4. Update payment processor

**File:** `Modules/PaymentGateways/`

---

## 🔗 Important Routes

| Feature | Route | File |
|---------|-------|------|
| Home | `/` | `resources/js/pages/home/index.tsx` |
| Courses | `/courses` | `resources/js/pages/courses/index.tsx` |
| Course Detail | `/courses/{id}` | `resources/js/pages/course-detail/show.tsx` |
| Blog | `/blog` | `resources/js/pages/blog/index.tsx` |
| Login | `/login` | `resources/js/pages/auth/login.tsx` |
| Register | `/register` | `resources/js/pages/auth/register.tsx` |
| Student Dashboard | `/student` | `resources/js/pages/student/` |
| Admin Dashboard | `/dashboard` | `resources/js/pages/admin/` |
| Instructor Dashboard | `/instructor` | `resources/js/pages/instructor/` |

**Route Definitions:** 
- `routes/web.php` (public)
- `routes/auth.php` (auth pages)
- `routes/student.php` (student routes)
- `routes/instructor.php` (instructor routes)
- `routes/admin.php` (admin routes)

---

## 🛠️ Common Edit Scenarios

### Scenario 1: Add a new menu item to navbar
**Steps:**
1. Admin → Settings → Navbar
2. Click "Add Item"
3. Enter title and URL
4. Save
5. **Done!** (No rebuild needed)

### Scenario 2: Change home page hero section
**Steps:**
1. Open `resources/js/pages/home/index.tsx`
2. Find hero component usage
3. Update text/image/buttons
4. Run: `npm run build --silent`
5. **Deployed!**

### Scenario 3: Customize course card appearance
**Steps:**
1. Open `resources/js/components/course-card-1.tsx` (or variant)
2. Modify JSX/Tailwind classes
3. Run: `npm run build --silent`
4. **Live!**

### Scenario 4: Add new language
**Steps:**
1. Admin → Languages → Add Language
2. Enter language code (e.g., 'fr' for French)
3. Add language properties
4. Add translations
5. **Users can now select it** (No rebuild needed)

### Scenario 5: Change primary color
**Steps:**
1. Edit `tailwind.config.js`
2. Change `primary` color value
3. Run: `npm run build --silent`
4. **New color applied globally!**

---

## 📊 Database Key Tables

| Table | Purpose | Edit Via |
|-------|---------|----------|
| `users` | User accounts | Admin → Users |
| `courses` | Course content | Admin → Courses |
| `language_properties` | Translations/Labels | Admin or Direct SQL |
| `languages` | Available languages | Admin → Languages |
| `pages` | Custom pages | Admin → Pages |
| `categories` | Course categories | Admin → Categories |
| `posts` | Blog articles | Admin → Blog |
| `reviews` | Course reviews | Auto-generated by students |
| `settings` | System settings | Admin → Settings |
| `system_settings` | Global configuration | Admin → System Settings |

---

## ⚡ Performance Tips

1. **Minimize rebuilds:** Only rebuild frontend when CSS/JS changes
2. **Cache clearing:** Use artisan commands after backend changes
3. **Database optimization:** Add indexes for frequently queried fields
4. **Image optimization:** Use WebP format for images
5. **Lazy loading:** Implement for course cards on home page

---

## 🔐 Security Considerations

- Always validate user input in forms
- Use Laravel's built-in authentication
- Implement proper role-based access control
- Keep dependencies updated
- Use HTTPS in production
- Sanitize all user-generated content

---

## 🐛 Debugging

### Check Language Not Loading?
```bash
# Clear cache
php artisan config:cache
php artisan cache:clear

# Check database
SELECT * FROM language_properties WHERE group = 'navbar';
```

### Frontend Not Updating?
```bash
# Rebuild
npm run build --silent

# Clear browser cache
# Hard refresh: Ctrl + Shift + R
```

### Database Changes Not Appearing?
```bash
# Clear all caches
php artisan cache:clear
php artisan config:cache
php artisan view:clear
```

---

**Reference Guide Version:** 1.0
**Platform:** SCHI LMS
**Last Updated:** Latest session
