// src/data.ts

export const personalInfo = {
  name: 'Muhammad Ziyad Bin Hilaluddin',
  title: 'Software Engineer',
  location: 'Bandar Tun Razak, Kuala Lumpur',
  phone: '011-1880756',
  email: 'ziyadhilalluddin@gmail.com',
}

export const experiences = [
  {
    title: 'Software Developer – QCT (Contracted to FGV)',
    date: 'Jul 2025 – Present',
    desc: 'Contract duration: 6 months (1-month notice)',
    bullets: [
      'Focused on Online Business System (OBS) project only',
      'Participated in UAT to refine feature requests and fix bugs',
      'Developed reports for Balance Sheet & Profit & Loss modules',
      'Contributed to flow design and accurate data representation',
      'Discussed enhancements and improvements with clients',
    ],
  },
  {
    title: 'Software Engineer – IFCA MSC BHD',
    date: 'Feb 2024 – Apr 2025',
    bullets: [
      'Built HR reports (payroll, time attendance, claims) using React, SQL, DevExpress',
      'Integrated APIs to streamline reporting and improve data flow',
      'Provided hotfixes and worked closely with consultants for UAT',
      'Managed deployment and maintained stable releases',
    ],
  },
  {
    title: 'IT Internship – Micro Technology Solution',
    date: 'Sep 2023 – Dec 2023',
    bullets: [
      'Installed antivirus to enhance company IT security',
      'Supported ChinHin Group with IT and vendor integration',
      'Demonstrated skills in domain integration (Prowitz)',
    ],
  },
]

export const projects = [
  {
    title: 'Online Business System (OBS)',
    date: 'Jul 2025 – Present',
    bullets: [
      'Developed reports for financial modules (Balance Sheet, Profit & Loss)',
      'Gathered feedback in UAT and improved report accuracy',
    ],
  },
  {
    title: 'Machine Maintenance System (Nichicon - Freelance)',
    date: 'Jan 2025 – Jun 2025',
    bullets: [
      'Designed dynamic checklist input with access control and 2-level approval',
      'Handled frontend-backend integration using modular structure',
    ],
  },
  {
    title: 'Human Resource Management System (HRMS)',
    date: 'Feb 2024 – Jun 2025',
    bullets: [
      'Created reports for payroll, claims, and CP22/CP8D',
      'Used React.js, SQL, DevExpress for dynamic report exports',
    ],
  },
]

export const skills = [
  { title: 'Languages', desc: 'JavaScript, TypeScript, SQL, HTML, CSS, Python (basic)' },
  { title: 'Frameworks & Tools', desc: 'React.js, Laravel, Node.js, DevExpress, PocketBase' },
  { title: 'Databases', desc: 'PostgreSQL, SQL Server, MySQL, DBeaver' },
  { title: 'Reporting & APIs', desc: 'GraphQL, REST, ReportViewer, DevExpress' },
  { title: 'Deployment & CI/CD', desc: 'Azure DevOps (basic), GitHub Actions' },
  { title: 'Collaboration', desc: 'JIRA, UML diagrams, UAT sessions, Flowcharts' },
]

export const education = [
  {
    degree: 'Bachelor of Information Technology (Hons)',
    school: 'Universiti Poly-Tech Malaysia',
    year: '2021 – 2023',
    gpa: '3.79',
  },
  {
    degree: 'Diploma in Computer Science',
    school: 'Kolej Universiti Poly-Tech Mara',
    year: '2018 – 2020',
    gpa: '3.69',
  },
]