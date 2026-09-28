export const portfolioData = {
    personal: {
        name: "S.Sibiraj",
        firstName: "Sibi",
        role: "Full Stack Developer",
        location: "Chennai, Tamil Nadu, India",
        email: "shalomsibi16@gmail.com",

        intro:
            "Computer Science Engineering student and Full Stack Developer focused on building modern, responsive, and practical web applications.",

        about:
            "I am a Computer Science Engineering student with hands-on experience in full-stack web development. I enjoy building responsive interfaces, developing backend APIs, working with databases, and turning ideas into functional products.",
    },

    socialLinks: [
        {
            name: "GitHub",
            url: "https://github.com/Sibishalom16",
            icon: "github",
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/sibiraj-sornaraj",
            icon: "linkedin",
        },
        {
            name: "Figma",
            url: "https://figma.com/@sibishalom",
            icon: "figma",
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/sibi.pvt_/",
            icon: "instagram",
        },
        {
            name: "LeetCode",
            url: "https://leetcode.com/u/Sibiraj16/",
            icon: "leetcode",
        },
    ],

    skills: {
        frontend: [
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "HTML5",
            "CSS3",
            "Tailwind CSS",
        ],

        backend: [
            "Node.js",
            "Express.js",
            "REST APIs",
            "Authentication",
        ],

        database: [
            "MongoDB",
            "Mongoose",
            "PostgreSQL",
            "Supabase",
        ],

        tools: [
            "Git",
            "GitHub",
            "Postman",
            "VS Code",
            "Figma",
        ],
    },

    projects: [
        {
            number: "01",
            title: "GreenNest",
            category: "Full Stack Web Application",
            description:
                "A gardening-focused web application built around an online marketplace experience.",
            technologies: [
                "React",
                "Node.js",
                "Express.js",
                "MongoDB",
            ],
            githubUrl: "https://github.com/kalviumcommunity/S74_Sibiraj_Capstone_GreenNest.git",
            liveUrl: "https://greennesst.netlify.app/",
        },

        {
            number: "02",
            title: "E-Commerce Platform",
            category: "Full Stack Web Application",
            description:
                "A full-stack e-commerce application with a complete online shopping experience.",
            technologies: [
                "React",
                "Node.js",
                "Express.js",
                "MongoDB",
            ],
            githubUrl: "https://github.com/Sibishalom16/E-commerce-project.git",
            liveUrl: "https://e-commerce-project-plum-nine.vercel.app/",
        },

        {
            number: "03",
            title: "Amdox ERP",
            category: "Team Project / Enterprise ERP Application",
            description:
                "Contributed to an enterprise ERP application as part of a development team, working on frontend features and application modules using modern web technologies.",
            contribution:
                "Worked on frontend screens and features within the ERP application, including modules related to Finance and Supply Chain Management.",
            technologies: [
                "Next.js",
                "TypeScript",
                "React",
                "Tailwind CSS",
                "Prisma",
                "PostgreSQL",
            ],
            githubUrl: "https://github.com/PawanYN/amdox-erp.git",
        },
    ],

    experience: [
        {
            number: "01",
            role: "Web Development Intern",
            company: "Amdox Technologies",
            type: "Internship",
            duration: "2 Months",
            description:
                "Worked on web development tasks and contributed to application features during the internship.",
            certificateUrl: "/certificates/amdoxcertificate.pdf",
        },

        {
            number: "02",
            role: "Full Stack Development Intern",
            company: "CodeAlpha",
            type: "Internship",
            duration: "1 Month",
            description:
                "Completed a full stack development internship with hands-on work in web development.",
            certificateUrl: "/certificates/codealpha certificate.pdf",
        },
    ],

    certifications: [
        {
            number: "01",
            title: "Rajya Puraskar",
            organization: "Bharat Scouts & Guides",
            category: "Scouting Achievement",
            year: "2025",
            imageUrl: "/certificates/rajyapruskar.jpeg",
            certificateUrl: "/certificates/Scouts.jpeg",
        },
        {
            number: "02",
            title: "AI Hackathon",
            organization: "AI Hackathon",
            category: "National Hackathon",
            year: "2024",
            imageUrl: "/certificates/Ai Hackathon.jpg",
            certificateUrl: "/certificates/Ai Hackathon.jpg",
        },
        {
            number: "03",
            title: "Walmart Global Tech",
            organization: "Walmart Global Tech",
            category: "Technology Simulation",
            year: "2026",
            imageUrl: "/certificates/Walmart Certificate_page-0001.jpg",
            certificateUrl: "/certificates/Walmart Certificate_page-0001.jpg",
        },
        {
            number: "04",
            title: "Deloitte Technology Simulation",
            organization: "Deloitte",
            category: "Technology Simulation",
            year: "2026",
            imageUrl: "/certificates/sibiraj deloite certificate_page-0001.jpg",
            certificateUrl: "/certificates/sibiraj deloite certificate_page-0001.jpg",
        },
        {
            number: "05",
            title: "Tata Data Visualization",
            organization: "Tata Group & Forage",
            category: "Data Visualization",
            year: "2026",
            imageUrl: "/certificates/sibiraj tata certificate_page-0001.jpg",
            certificateUrl: "/certificates/sibiraj tata certificate_page-0001.jpg",
        },
    ],

    education: {
        period: "2024 — 2028",
        degree: "B.Tech — Software Product Engineering",
        program: "Kalvium UG Program in Computer Science",
        institution:
            "VELS Institute of Science, Technology and Advanced Studies, Chennai",
        status: "Currently in 5th Semester",
    },

    resume: {
        label: "Download Resume",
        path: "/S.Sibiraj.pdf",
    },

    contact: {
        title: "Let's work together",
        description:
            "Have a project, opportunity, or idea? Feel free to get in touch.",
        email: "shalomsibi16@gmail.com",
        apiEndpoint: "/api/contact",
    },
} as const;