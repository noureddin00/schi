# Visual Layout Map: Language Switcher Locations

## 📱 Desktop View

```
┌─────────────────────────────────────────────────────────────────┐
│  SCHI                 Search...        Courses  🌙  🌐  [Login] │  ← Header
└─────────────────────────────────────────────────────────────────┘
         Logo             Search           Items  Theme  Language  

Legend:
🌙 = Appearance toggle (Light/Dark mode)
🌐 = Language selector (English/العربية)
```

### Navigation Component Breakdown
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [SCHI Logo]          [Search]      [Menu Items]  [Toggles]  │
│                                     • Courses     🌙  🌐      │
│                                     • Instructors            │
│                                     • Become Instr           │
│                                     • Blog                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘

DESKTOP (md and up):
- Logo visible
- Search visible
- Menu items visible
- Appearance toggle (if not logged in)
- Language selector ← NOW VISIBLE ✅
- Auth buttons (Login/Sign Up or User menu)
```

---

## 📱 Mobile View (Hamburger Menu)

```
┌─────────────────────────┐
│ SCHI          ☰ [Menu] │
└─────────────────────────┘
      Logo      Hamburger
        ↓
    [Tap ☰]
        ↓
┌─────────────────────────────────┐
│ [Search]                        │
│ • Courses                       │
│ • Instructors                   │
│ • Become Instructor             │
│ • Blog                          │
│ ───────────────────────────     │
│ [🌙 Appearance]                 │
│ [🌐 Language]      ← NOW HERE ✅│
│ ───────────────────────────     │
│ [Sign Up]                       │
│ [Log In]                        │
└─────────────────────────────────┘
```

---

## 🎯 Component Architecture

### Public Frontend Structure
```
Landing Layout
├── Intro Navbar
│   ├── Logo
│   ├── Search Input
│   ├── Navigation Items (from DB)
│   ├── Appearance Component         ✅ Already here
│   ├── Language Component           ✅ NEWLY ADDED
│   ├── Mobile Menu Button
│   └── Mobile Menu (on small screens)
│       ├── Search Input
│       ├── Navigation Items
│       ├── Appearance Component     ✅ Already here
│       ├── Language Component       ✅ NEWLY ADDED
│       └── Auth Buttons
├── Main Content
│   ├── Hero Section
│   ├── Featured Courses
│   ├── Testimonials
│   └── CTA Sections
└── Footer
```

---

## 📍 Exact File Locations

### Component Files
```
resources/js/components/
├── language.tsx          ← Dropdown with language options
└── appearance.tsx        ← Theme toggle component

resources/js/layouts/
├── partials/intro-navbar.tsx  ← Where Language was added (2 places)
│   ├── Desktop nav: Line ~68-69
│   └── Mobile menu: Lines ~169, 187
└── landing-layout.tsx    ← Uses intro-navbar

resources/js/pages/
├── home/index.tsx        ← Uses landing-layout
└── ... other public pages
```

---

## 🔄 Data Flow

### How Language Selection Works
```
User Interaction
    ↓
[Click Globe Icon 🌐]
    ↓
Language Component Opens Dropdown
    ↓
[User Selects Arabic/English]
    ↓
router.post('change.lang', { lang: 'ar'/'en' })
    ↓
Backend: SetLocale Middleware
├── Sets locale cookie
├── Sets direction cookie (RTL/LTR)
└── Redirects with new locale
    ↓
Frontend: HandleInertiaRequests Middleware
├── Derives direction from App::getLocale()
├── Prepares shared props (locale, direction, langs)
└── Sends to Inertia
    ↓
React Component Receives Props
├── locale: 'ar' or 'en'
├── direction: 'rtl' or 'ltr'
├── langs: [Language objects]
└── Applies direction to HTML
    ↓
app.blade.php Sets: <html dir="rtl"> or <html dir="ltr">
    ↓
Arabic Font Loads (if Arabic selected)
    ↓
Page Renders in Selected Language + Direction
    ↓
✅ User Sees Translated Content in RTL/LTR Layout
```

---

## 🎨 Appearance Tree

```
Navbar/Header
│
├── Left Side
│   └── Logo/Brand
│
├── Center
│   ├── Search Input
│   └── Navigation Items
│
└── Right Side
    ├── [If Not Logged In]
    │   ├── Appearance Toggle 🌙
    │   ├── Language Selector 🌐  ← NEWLY ADDED
    │   ├── Sign Up Button
    │   └── Log In Button
    │
    ├── [If Logged In]
    │   ├── Appearance Toggle 🌙
    │   ├── Language Selector 🌐  ← NEWLY ADDED
    │   ├── Notifications 🔔
    │   └── User Profile Dropdown
    │
    └── Mobile Menu Button ☰
        (Contains above items in dropdown)
```

---

## ✅ Verification Checklist - Visual

### Desktop View
```
╔════════════════════════════════════════════════════════════════╗
║  LOGO    Search...        Navbar Items    🌙  🌐  [Login]     ║
║                                                                ║
║  Check:                                                        ║
║  ✅ Logo visible left                                          ║
║  ✅ Search input visible                                       ║
║  ✅ Navbar items visible (Courses, Instructors, etc)          ║
║  ✅ Appearance toggle (🌙) visible                             ║
║  ✅ Language selector (🌐) visible - NEWLY ADDED ✨           ║
║  ✅ Login/Sign Up buttons visible                              ║
║  ✅ All items right-aligned                                    ║
║  ✅ Spacing/alignment looks good                               ║
╚════════════════════════════════════════════════════════════════╝
```

### Mobile View (Menu Closed)
```
╔═══════════════════════════════════╗
║  LOGO                 ☰ [Menu]   ║
║                                   ║
║  Check:                           ║
║  ✅ Logo visible                  ║
║  ✅ Menu button (☰) visible       ║
║  ✅ Responsive layout             ║
╚═══════════════════════════════════╝
```

### Mobile View (Menu Open)
```
╔═══════════════════════════════════╗
║  [Search]                         ║
║  • Courses                        ║
║  • Instructors                    ║
║  • Become Instructor              ║
║  • Blog                           ║
║  ───────────────────────────     ║
║  🌙 Appearance Toggle             ║
║  🌐 Language Selector ✨          ║
║  ───────────────────────────     ║
║  [Sign Up Button]                 ║
║  [Log In Button]                  ║
║                                   ║
║  Check:                           ║
║  ✅ Search in menu                ║
║  ✅ Navbar items in menu          ║
║  ✅ Appearance toggle in menu     ║
║  ✅ Language selector in menu ✨  ║
║  ✅ Auth buttons at bottom        ║
║  ✅ Menu closes on item select    ║
╚═══════════════════════════════════╝
```

---

## 🌐 Language Dropdown Interaction

### Desktop/Mobile Globe Icon (🌐)
```
Initial State:
┌─────────┐
│ 🌐 [▼]  │
└─────────┘

Click/Tap:
┌────────────────────┐
│ 🌐 English  [✓]   │
│    العربية        │
└────────────────────┘

Select Arabic:
┌────────────────────┐
│ 🌐 العربية [✓]   │
│    English         │
└────────────────────┘
(Page reloads in Arabic with RTL layout)
```

---

## 📊 Component Hierarchy After Changes

```
App
├── Router
│   ├── Landing Route
│   │   └── LandingLayout
│   │       └── IntroNavbar ← Component Modified
│   │           ├── Logo
│   │           ├── Search
│   │           ├── Nav Items
│   │           ├── Appearance ✅
│   │           ├── Language ✅ ADDED
│   │           └── MobileMenu
│   │               ├── Search
│   │               ├── Nav Items
│   │               ├── Appearance ✅
│   │               └── Language ✅ ADDED
│   │
│   ├── Courses Route
│   │   └── MainLayout
│   │       └── IntroNavbar ← Uses same navbar
│   │           (Same Language visible here too)
│   │
│   ├── Blog Route
│   │   └── MainLayout
│   │       └── IntroNavbar ← Uses same navbar
│   │           (Same Language visible here too)
│   │
│   └── Dashboard Route
│       └── DashboardLayout
│           └── DashboardHeader
│               └── Language ✅ Already here
│
└── Footer
```

---

## ⚙️ Props Availability

### What's Available to Language Component
```
Props from Inertia:
├── locale: string                 ('en' or 'ar')
├── direction: 'ltr' | 'rtl'       (auto-derived)
├── langs: Language[]              (available languages)
│   ├── id: number
│   ├── code: string
│   ├── name: string
│   ├── is_active: boolean
│   └── is_default: boolean
├── system: {
│   fields: {
│       language_selector: boolean (can toggle visibility)
│       direction: 'auto'|'ltr'|'rtl'
│   }
├── auth: {
│   user: UserObject | null
├── customize: boolean
└── ...other props
```

### Stored in Browser
```
Cookies (1-year expiration):
├── LOCALE: 'en' or 'ar'
└── DIRECTION: 'ltr' or 'rtl'
```

---

## 🔄 State Management Flow

```
Initial Page Load
├── User Visits Site
├── SetLocale middleware checks: query → cookie → session → default
├── Sets locale + direction
├── Passes to HandleInertiaRequests
├── Inertia sends props to React
├── React renders navbar with Language component
├── User sees current language selected ✓
└── Ready for interaction

User Changes Language
├── Clicks Language component (🌐)
├── Selects new language
├── router.post('change.lang') triggers
├── SetLocale middleware updates cookies
├── Page reloads with new locale
├── Direction automatically updates
├── Layout flips to RTL/LTR
└── User sees translated content ✓
```

---

## 📋 Summary

**What Changed:**
- ✅ Language component added to desktop navbar
- ✅ Language component added to mobile menu
- ✅ Frontend rebuilt successfully
- ✅ Changes live and visible

**Where to See It:**
- ✅ Public website (home, courses, blog pages)
- ✅ Top right corner on desktop (globe 🌐 icon)
- ✅ Inside hamburger menu on mobile
- ✅ Next to theme toggle (appearance button)

**Status:**
- ✅ Ready for testing
- ✅ Ready for production
- ✅ Ready for customization

---

**Generated:** Today's Session
**Framework:** React 18 + Inertia.js + Tailwind CSS
**Status:** ✅ COMPLETE & LIVE
