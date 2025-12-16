import { routeLastSegment } from '@/lib/route';
import { Award, Book, Briefcase, CassetteTape, CreditCard, LayoutDashboard, Newspaper, Receipt, School, Settings, Users } from 'lucide-react';

const getDashboardRoutes = (translate: any): DashboardRoute[] => {
   const { sidebar } = translate;
   console.log('Sidebar translations:', sidebar);
   
   return [
   {
      title: sidebar.main_menu,
      slug: 'main-menu',
      pages: [
         {
            Icon: LayoutDashboard,
            name: sidebar.dashboard,
            path: route('dashboard'),
            slug: routeLastSegment(route('dashboard')),
            active: true,
            access: ['admin', 'instructor', 'collaborative', 'administrative'],
            children: [],
         },
         {
            Icon: School,
            name: sidebar.courses,
            path: '',
            slug: 'courses',
            active: true,
            access: ['admin', 'instructor', 'collaborative', 'administrative'],
            children: [
               {
                  name: sidebar.categories,
                  path: route('categories.index'),
                  slug: routeLastSegment(route('categories.index')),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.manage_courses,
                  slug: routeLastSegment(route('courses.index')),
                  path: route('courses.index'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.create_course,
                  slug: routeLastSegment(route('courses.create')),
                  path: route('courses.create'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.course_coupons,
                  slug: routeLastSegment(route('course-coupons.index')),
                  path: route('course-coupons.index'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
            ],
         },
         {
            Icon: Book,
            name: sidebar.exams,
            path: '',
            slug: 'exams',
            active: true,
            access: ['admin', 'instructor', 'collaborative', 'administrative'],
            children: [
               {
                  name: sidebar.categories,
                  slug: routeLastSegment(route('exam-categories.index')),
                  path: route('exam-categories.index'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.manage_exams,
                  slug: routeLastSegment(route('exams.index')),
                  path: route('exams.index'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.create_exam,
                  slug: routeLastSegment(route('exams.create')),
                  path: route('exams.create'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.exam_coupons,
                  slug: routeLastSegment(route('exam-coupons.index')),
                  path: route('exam-coupons.index'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
            ],
         },
         {
            Icon: CassetteTape,
            name: sidebar.enrollments,
            path: '',
            slug: 'enrollments',
            active: true,
            access: ['admin', 'instructor', 'collaborative', 'administrative'],
            children: [
               {
                  name: sidebar.course_enrollments,
                  slug: routeLastSegment(route('course-enrollments.index')),
                  path: route('course-enrollments.index'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.exam_enrollments,
                  slug: routeLastSegment(route('exam-enrollments.index')),
                  path: route('exam-enrollments.index'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
            ],
         },
         {
            Icon: Users,
            name: sidebar.instructors,
            path: '',
            slug: 'instructors',
            active: true,
            access: ['admin', 'collaborative'],
            children: [
               {
                  name: sidebar.manage_instructors,
                  slug: routeLastSegment(route('instructors.index')),
                  path: route('instructors.index'),
                  access: ['admin', 'collaborative'],
               },
               {
                  name: sidebar.create_instructor,
                  slug: routeLastSegment(route('instructors.create')),
                  path: route('instructors.create'),
                  access: ['admin', 'collaborative'],
               },
               {
                  name: sidebar.applications,
                  slug: routeLastSegment(route('instructors.applications')),
                  path: route('instructors.applications', {
                     status: 'pending',
                  }),
                  access: ['admin', 'collaborative'],
               },
            ],
         },
         {
            Icon: Receipt,
            name: sidebar.payouts,
            path: '',
            slug: 'payouts',
            active: true,
            access: ['instructor', 'collaborative'],
            children: [
               {
                  name: sidebar.withdraw,
                  slug: routeLastSegment(route('payouts.index')),
                  path: route('payouts.index'),
                  access: ['instructor', 'collaborative'],
               },
               {
                  name: sidebar.settings,
                  slug: routeLastSegment(route('payouts.settings.index')),
                  path: route('payouts.settings.index'),
                  access: ['instructor', 'collaborative'],
               },
            ],
         },
         {
            Icon: Receipt,
            name: sidebar.payout_report,
            path: '',
            slug: 'payouts',
            active: true,
            access: ['admin', 'collaborative'],
            children: [
               {
                  name: sidebar.payout_request,
                  slug: routeLastSegment(route('payouts.request.index')),
                  path: route('payouts.request.index'),
                  access: ['admin', 'collaborative'],
               },
               {
                  name: sidebar.payout_history,
                  slug: routeLastSegment(route('payouts.history.index')),
                  path: route('payouts.history.index'),
                  access: ['admin', 'collaborative'],
               },
            ],
         },
         {
            Icon: CreditCard,
            name: sidebar.payment_report,
            path: '',
            slug: 'payment-reports',
            active: true,
            access: ['admin', 'collaborative', 'administrative'],
            children: [
               {
                  name: sidebar.online_payments,
                  slug: routeLastSegment(route('payment-reports.online.index')),
                  path: route('payment-reports.online.index'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.offline_payments,
                  slug: routeLastSegment(route('payment-reports.offline.index')),
                  path: route('payment-reports.offline.index'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
            ],
         },
         {
            Icon: Briefcase,
            name: sidebar.job_circulars,
            path: '',
            slug: 'job-circulars',
            active: true,
            access: ['admin', 'collaborative', 'administrative'],
            children: [
               {
                  name: sidebar.all_jobs,
                  slug: routeLastSegment(route('job-circulars.index')),
                  path: route('job-circulars.index'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.create_job,
                  slug: routeLastSegment(route('job-circulars.create')),
                  path: route('job-circulars.create'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
            ],
         },
         {
            Icon: Book,
            name: sidebar.blogs,
            path: '',
            slug: 'blogs',
            active: true,
            access: ['admin', 'instructor', 'collaborative', 'administrative'],
            children: [
               {
                  name: sidebar.categories,
                  slug: routeLastSegment(route('blogs.categories.index')),
                  path: route('blogs.categories.index'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.create_blog,
                  slug: routeLastSegment(route('blogs.create')),
                  path: route('blogs.create'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.manage_blog,
                  slug: routeLastSegment(route('blogs.index')),
                  path: route('blogs.index'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
            ],
         },
         {
            Icon: Newspaper,
            name: sidebar.newsletters,
            path: route('newsletters.index'),
            slug: routeLastSegment(route('newsletters.index')),
            active: true,
            access: ['admin', 'collaborative', 'administrative'],
            children: [],
         },
         {
            Icon: Users,
            name: sidebar.all_users,
            path: route('users.index'),
            slug: routeLastSegment(route('users.index')),
            active: true,
            access: ['admin', 'collaborative', 'administrative'],
            children: [],
         },
         {
            Icon: Award,
            name: sidebar.certificates,
            path: '',
            slug: 'certification',
            active: true,
            access: ['admin', 'collaborative', 'administrative'],
            children: [
               {
                  name: sidebar.certificate,
                  slug: routeLastSegment(route('certificate.templates.index')),
                  path: route('certificate.templates.index'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.marksheet,
                  slug: routeLastSegment(route('marksheet.templates.index')),
                  path: route('marksheet.templates.index'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
            ],
         },
         {
            Icon: Settings,
            name: sidebar.settings,
            path: '',
            slug: 'settings',
            active: true,
            access: ['admin', 'instructor', 'collaborative', 'administrative'],
            children: [
               {
                  name: sidebar.account,
                  slug: routeLastSegment(route('settings.account')),
                  path: route('settings.account'),
                  access: ['admin', 'instructor', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.system,
                  slug: routeLastSegment(route('settings.system')),
                  path: route('settings.system'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.pages,
                  slug: routeLastSegment(route('settings.pages')),
                  path: route('settings.pages'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.storage,
                  slug: routeLastSegment(route('settings.storage')),
                  path: route('settings.storage'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.payment,
                  slug: routeLastSegment(route('settings.payment')),
                  path: route('settings.payment'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.smtp,
                  slug: routeLastSegment(route('settings.smtp')),
                  path: route('settings.smtp'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.auth,
                  slug: routeLastSegment(route('settings.auth0')),
                  path: route('settings.auth0'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.live_class,
                  slug: routeLastSegment(route('settings.live-class')),
                  path: route('settings.live-class'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
               {
                  name: sidebar.translation,
                  slug: routeLastSegment(route('language.index')),
                  path: route('language.index'),
                  access: ['admin', 'collaborative', 'administrative'],
               },
            ],
         },
      ],
   },
];
};

export default getDashboardRoutes;
