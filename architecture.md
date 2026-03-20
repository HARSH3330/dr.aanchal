# Medical Clinic Website Architecture

## Project Overview
This project is a modern, responsive website for a **Medical Clinic** (General Physician & Internal Medicine).  
The design is **clean, medical-professional, premium, and minimal**, tailored for trust and patient care.

The goal is to:
- Build trust with patients
- Showcase medical services (General Physician, Emergency Care, Chronic Management)
- Enable appointment booking
- Provide health education content
- Present Dr. Aanchal Agarwal professionally

The website should prioritize:
- Clear hierarchy
- Smooth animations
- Fast loading
- Mobile responsiveness

---

# Design System

## Color Palette
Primary: #C8A47E (Medical gold/beige tone)  
Secondary: #F6F3EF  
Accent: #8C6A4A  
Text: #2A2A2A  
Background: #FFFFFF

## Typography
Headings: Modern serif or semi-serif  
Body: Clean sans-serif

Example:
- Headings: Playfair Display / Lora
- Body: Inter / Open Sans

## UI Style
- Rounded corners
- Soft shadows
- Spacious layouts
- Clean medical aesthetic
- Card based UI sections

---

# Layout Structure

## Global Layout

Global Layout:
- Navbar  
- Hero Section  
- Services (Internal Medicine)
- About Doctor  
- Why Choose Us  
- Success Stories / Case Studies
- Testimonials  
- Gallery
- Appointment Booking  
- Health Blog / Education  
- FAQ  
- Contact  
- Footer

---

# Page Architecture

## Home Page

### Hero Section
- Large hero image
- Doctor or medical treatment visual
- Heading
- Subheading
- CTA button
- subtle floating animation

Example:
"Your Health, Our Priority"

CTA:
Book Appointment

Animation:
Fade-in + parallax

---

### Services Overview
Grid layout showing main treatments

Examples:
- Fever & Infections
- Diabetes Management
- Hypertension (BP)
- Thyroid Disorders
- Respiratory Care
- Emergency (Snake Bite/Poisoning)

Each service card contains:
Icon  
Title  
Short description  
Learn More link

Animation:
Hover scale + shadow

---

### About the Doctor
Photo of the doctor  
Credentials  
Experience  
Short bio

Include:
- Years of experience (6+)
- Specialization (MBBS, MD Medicine)
- Medical Education (Subharti, TMU)

---

### Why Choose Us
Feature grid

Examples:
- Advanced Technology
- Pain-Free Procedures
- Experienced Dentist
- Personalized Care

Icons + text

---

### Treatments Section
More detailed service listing

Cards with:
Image
Treatment name
Short explanation
Button

---

### Testimonials
Patient reviews

Carousel style

Include:
Name
Review
Rating

---

### Before / After
Gallery grid

Hover reveal slider
Image comparison

---

### Appointment Booking
Form

Fields:
Name  
Phone  
Email  
Treatment type  
Preferred date

CTA:
Schedule Consultation

---

### Blog Section
Health education articles

Examples:
- Managing Blood Sugar
- Viral Fever Prevention
- Emergency Snake Bite First Aid

---

### FAQ
Expandable accordion list

Examples:
- When should I see a GP?
- What are emergency symptoms?
- How to handle snake bites?

---

### Contact Section

Map  
Clinic Address  
Phone  
Email  
Working Hours

---

### Footer
Logo  
Quick links  
Services  
Social media  
Contact info

---

# Component System

Reusable components must include:

Navbar  
Hero  
SectionTitle  
ServiceCard  
FeatureCard  
DoctorCard  
TestimonialCard  
GalleryGrid  
FAQAccordion  
AppointmentForm  
BlogCard  
Footer

---

# Animations

Use subtle and smooth animations.

Examples:

Fade-in on scroll  
Card hover lift  
Image zoom on hover  
Parallax hero background  
Button hover glow

Libraries that can be used:
- Framer Motion
- AOS
- GSAP (light usage)

Animations should never hurt performance.

---

# Mobile Responsiveness

Breakpoints:

Desktop  
Tablet  
Mobile

Requirements:

Stack sections vertically on mobile  
Reduce hero height  
Touch friendly buttons  
Responsive grid system

---

# Performance Rules

Images must be optimized  
Lazy loading for images  
Minimal animation weight  
Fast first load

---

# SEO Structure

Every page should include:

Meta title  
Meta description  
Structured headings  
Alt text for images

---

# Accessibility

Use semantic HTML  
ARIA labels where needed  
High contrast text  
Keyboard navigation support

---

# Folder Structure

/components
/navbar
/hero
/services
/testimonials
/gallery
/faq
/forms
/footer

/pages
home
services
about
blog
contact

/assets
images
icons
styles

---

# Development Philosophy

The website must be:

Clean  
Readable  
Reusable  
Component-driven  
Accessible  
Fast