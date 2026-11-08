/* =====================================================================
   SITE CONTENT: edit everything here.
   Every page reads from this one file: links, projects, skills,
   timeline, achievements and tools.
   ===================================================================== */
window.SITE = {
  name: "Shadow Alghamdi",
  role: "Senior Computer Engineering Student",
  university: "American University of Bahrain (AUBH)",
  location: "Khobar, Saudi Arabia",

  links: {
    email: "Shadowalghamdii@gmail.com",
    linkedin: "https://www.linkedin.com/in/shadow-alghamdi-2277a9314",
    github: "https://github.com/ShadowAlghamdi",
    // Public link to the CV (PDF). While empty, the CV button says it is coming soon.
    cv: "https://7dee4c24-5f35-40fd-a3da-6f0f58cfd84a.usrfiles.com/ugd/fe76b3_8443db329a694112839c8c29c28a9091.pdf"
  },

  // Profile photo URL. Leave empty to show the monogram placeholder.
  photo: "",

  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent" }
  ],

  /* ---------------- PROJECTS ----------------
     category: "Embedded Systems", "Software Development", "Artificial Intelligence",
               "Data Science" or "Computer Engineering"
     image: optional URL; when empty a generated visual is shown.
     repo / demo / report: optional links (GitHub, live demo, PDF report).
     featured: true → appears on the Home page (keep it to three). */
  projects: [
    {
      id: "digital-lock-system",
      title: "Programmable Digital Lock System",
      category: "Computer Engineering",
      featured: true,
      year: "Feb – May 2026",
      role: "VHDL Implementation Developer",
      team: "2-person team",
      summary: "A secure digital lock built in VHDL: an FSM controller and a datapath that store and compare passwords, support password updates and lock out repeated wrong attempts.",
      tech: ["VHDL", "Quartus Prime", "Questa Simulator", "FSM Design", "Digital Logic"],
      overview: "A hardware digital lock designed in VHDL and verified in simulation. The system is split into a controller (a finite state machine that makes the decisions) and a datapath (which stores the password, takes the user's input and compares them), with 7-segment displays and LED indicators for the locked, unlocked and halt states.",
      problem: "Simple lock systems lack important security features: they offer no protection against repeated wrong attempts and no flexible way to update the password.",
      objectives: ["Design a secure digital lock using an FSM controller and a datapath", "Store and compare passwords in hardware", "Add a password-update feature", "Add a timed lockout after a wrong attempt"],
      implementation: ["Divided the system into a controller (FSM, timer, confirm button, status LEDs) and a datapath (input register, password register, comparator, 7-segment decoder)", "Designed a Moore FSM with five states: LOCKED → INPUT → CHECK → UNLOCKED, and HALT for a temporary lockout", "Wrote controller.vhd, datapath.vhd and the top-level digital_lock.vhd in Quartus Prime", "Built a testbench (tb_digital_lock.vhd) and verified behaviour with waveforms in Questa"],
      results: ["Wrong password → system enters HALT, inputs are ignored, and it returns to LOCKED when the timer ends", "Correct password → UNLOCKED, lock indicator turns off and access is granted", "Password update → old password rejected, new password accepted", "All three test cases passed in simulation", "Strengthened FSM design and controller/datapath separation skills"],
      image: "https://static.wixstatic.com/media/fe76b3_a2caef5db7434b23aab5a8376376e4a2~mv2.jpeg/v1/fit/w_1400,h_1400,q_85,enc_auto/vhdl-lock.jpg",
      gallery: [
        { src: "https://static.wixstatic.com/media/fe76b3_1f4b146229134265b969733f858eac0c~mv2.png", caption: "Block diagram: the datapath (registers, comparator, 7-segment decoder) and the controller (FSM + timer)" },
        { src: "https://static.wixstatic.com/media/fe76b3_79c69ada81294a199b88765e218fd61c~mv2.png", caption: "Controller state diagram: LOCKED, INPUT, CHECK, UNLOCKED and HALT" },
        { src: "https://static.wixstatic.com/media/fe76b3_0d4e498a7b9342359f1f908d62ab0ad2~mv2.png", caption: "Top-level VHDL (digital_lock.vhd) connecting the controller and datapath" }
      ],
      repo: "",
      demo: "",
      report: "",
      slides: ""
    },
    {
      id: "smart-charging-monitor",
      title: "Smart Charging Monitoring System",
      category: "Embedded Systems",
      featured: true,
      year: "Feb – May 2026",
      role: "Hardware Design & Embedded Software Developer",
      team: "2-person team",
      summary: "An 8086-based battery monitor written in Assembly: it reads battery voltage through an ADC, classifies it as LOW, NORMAL or FULL, and shows status and percentage on an LCD.",
      tech: ["8086 Assembly", "EMU8086", "Proteus", "ADC0804", "8255A PPI", "LCD"],
      overview: "A simulation-based battery monitoring system built around the Intel 8086. A simulated battery voltage is converted by an ADC0804, read by the 8086 through an 8255A programmable peripheral interface, classified with threshold logic in Assembly, and displayed on an LM016L LCD with the battery percentage.",
      problem: "Battery systems often lack a simple way to monitor charge: there is no clear status indication, and batteries degrade through overcharging.",
      objectives: ["Monitor battery voltage with a simulation-based system", "Classify battery status as LOW, NORMAL or FULL", "Implement the system with the 8086 (EMU8086 + Proteus)", "Display battery status and percentage to the user"],
      implementation: ["Designed the circuit in Proteus: potentiometer as the battery, RC filter, ADC0804, 8086, 8255A, 74LS373 latch and LCD", "Programmed the 8255A (Port B input from the ADC, Ports A and C as outputs) and drove the ADC's start-conversion and read signals", "Classified readings with compare-and-jump logic (thresholds 33h and 99h) and only refreshed the LCD when the state changed, avoiding flicker", "Converted the 0–255 ADC value to a percentage (×100 ÷ 255) and wrote LCD command/data routines and timing delays"],
      results: ["Correctly classifies LOW (0–1 V), NORMAL (1–3 V) and FULL (3–5 V)", "Five test cases passed, including the exact 0 V and 5 V edge cases", "Battery percentage displayed accurately on the LCD", "Demonstrated live in simulation", "Future work: current and temperature sensing, real hardware and alerts"],
      image: "https://static.wixstatic.com/media/fe76b3_82271dd0e58741679f3687be405b6136~mv2.jpg/v1/fit/w_1400,h_1400,q_85,enc_auto/battery-monitor.jpg",
      gallery: [
        { src: "https://static.wixstatic.com/media/fe76b3_6d9e4c8039cc4acc81b10890ae1047ac~mv2.png", caption: "Proteus circuit: 8086, 8255A, ADC0804 and LCD showing FULL at 100%" },
        { src: "https://static.wixstatic.com/media/fe76b3_e573c36802ee4f98aa6416c1cf55551d~mv2.webp", caption: "8255A port map: Port A and C drive the LCD and ADC control, Port B reads the ADC" },
        { src: "https://static.wixstatic.com/media/fe76b3_e07506564fa0432ab066c7c7e3aaf063~mv2.png", caption: "Main loop in 8086 Assembly: read the ADC, classify LOW, NORMAL or FULL, update the LCD" }
      ],
      repo: "",
      demo: "",
      report: "",
      slides: ""
    },
    {
      id: "routemate",
      title: "RouteMate: University Carpooling App",
      category: "Software Development",
      featured: true,
      year: "Sep – Dec 2025",
      role: "Front-end Developer",
      team: "5-person Scrum team",
      summary: "A React Native carpooling app for university students with real-time ride matching, live tracking, route previews on Google Maps, ratings and a female-only ride option.",
      tech: ["React Native", "Expo", "Firebase", "Google Maps API", "JavaScript"],
      overview: "RouteMate connects university students who travel the same routes so they can share rides safely. Built by a five-person Scrum team using an MVC architecture: Firebase Firestore as the model, React Native screens as the view, and screen logic as the controller. I worked on the front end: the screens and interactions students use.",
      problem: "Students commuting to campus often travel alone on the same routes, paying more for transport, with no safe and trusted way to find each other.",
      objectives: ["Reduce transportation costs for students", "Build a safe carpooling community", "Deliver real-time ride matching and live ride tracking", "Practise Agile development with Scrum"],
      implementation: ["Built React Native screens such as Home, Find Ride and Post Ride, connected to Firestore through a repository layer", "Ride posting with vehicle selection, Google Maps route preview with distance and time, scheduling and a female-only toggle", "Ride requests with real-time notifications, ratings and reviews using the Observer pattern", "Secured data with Firebase Auth and Firestore security rules (e.g. phone numbers hidden until a request is accepted)", "Worked in sprints with a Kanban board, burn-down chart and 8 documented meetings across 3 sprints"],
      results: ["Real-time features (notifications, ride requests, rating updates) performed reliably", "Tested with unit, integration and UI/UX tests, including iOS emulator testing", "Solved Firebase setup, Expo configuration, indexing and cross-device UI issues", "Gained experience with React Native, Firebase, the Google Maps API and design patterns (MVC, Observer, Repository)"],
      image: "https://static.wixstatic.com/media/fe76b3_6fdede97a69f4b178b9d4f28dabe30bd~mv2.webp/v1/fit/w_1600,h_1600,q_85,enc_auto/routemate.webp",
      gallery: [
        { src: "https://static.wixstatic.com/media/fe76b3_2aa77c87b1ea401b8ead1774f3b33dc3~mv2.webp", caption: "Ride posting: vehicle selection, Start Now or Schedule, and a Google Maps route preview" },
        { src: "https://static.wixstatic.com/media/fe76b3_e921fcc131ae4634976685eb1939a3cf~mv2.webp", caption: "Ride history and ratings: reviews and offered rides stored in Firestore" },
        { src: "https://static.wixstatic.com/media/fe76b3_bd2e2994f3914d5e8bcfd3dbb6fa0761~mv2.webp", caption: "Component diagram: client, application and data layers" }
      ],
      repo: "https://github.com/Mohamedeid710/university-carpooling-app",
      demo: "",
      report: "",
      slides: ""
    },
    {
      id: "heston-autoservices-db",
      title: "Heston Auto-Services Database",
      category: "Software Development",
      featured: false,
      year: "Feb – May 2026",
      role: "Database Designer",
      team: "3-person team",
      summary: "A normalized MySQL garage-management database for customers, vehicles, jobs, mechanics, parts, appointments and payments, with views, triggers and 20 test cases.",
      tech: ["MySQL", "SQL", "ER Modelling", "Normalization (3NF)", "Triggers & Views"],
      overview: "A centralized garage management database for Heston Auto-Services. It replaces manual records and spreadsheets with a single MySQL database covering customers, vehicles, repair jobs, mechanics, parts inventory, appointments and payments.",
      problem: "The garage relied on manual records and spreadsheets, which led to lost data, duplicate records and slow tracking of jobs.",
      objectives: ["Store customer and vehicle information", "Schedule appointments and track repair jobs and service history", "Assign mechanics to jobs and track parts inventory", "Record payments and payment status"],
      implementation: ["Designed the ER diagram and a schema of 11 main tables plus 3 associative tables, normalized to 3NF", "Made JOB the central table connecting every part of the system", "Enforced integrity with primary and foreign keys and NOT NULL, UNIQUE and CHECK constraints", "Added views and triggers: auto-completing job status, blocking parts usage when stock is insufficient, and updating inventory automatically"],
      results: ["Fully normalized (3NF) database supporting all garage operations", "20 test cases covering inserts, constraints, relationships, views and triggers", "Improved efficiency and fewer errors compared with the manual system", "Future work: user roles, reporting dashboards, multi-branch support and backups"],
      image: "https://static.wixstatic.com/media/fe76b3_339998aa836b4d88886bbe153b137f98~mv2.webp/v1/fit/w_1600,h_1600,q_85,enc_auto/heston.webp",
      gallery: [
        { src: "https://static.wixstatic.com/media/fe76b3_fda94a1e26a34c86859f9a425414647f~mv2.webp", caption: "ER diagram: customers, vehicles, appointments, jobs, mechanics, services, parts and payments" },
        { src: "https://static.wixstatic.com/media/fe76b3_9c069078ba97458f833ac02b0e347fb5~mv2.webp", caption: "Relational schema in MySQL with primary and foreign keys linking all 11 tables" },
        { src: "https://static.wixstatic.com/media/fe76b3_b7089552a03d452b8bf332c0263efbe5~mv2.webp", caption: "SQL views: mechanic assignments, payment balances and vehicle job history" }
      ],
      repo: "",
      demo: "",
      report: "",
      slides: ""
    },
    {
      id: "capstone-biofeedback-game",
      locked: true,
      title: "Biofeedback Adaptive Horror Stealth Game",
      category: "Computer Engineering",
      featured: false,
      year: "2026 – 2027",
      role: "Senior Capstone",
      summary: "My senior capstone project: a horror stealth game that adapts to the player in real time using biofeedback. Full details unlock when the project is complete.",
      tech: ["Capstone", "Biofeedback", "Game Development", "Sensors"],
      unlock: "Unlocks 2027",
      image: "",
      gallery: []
    }
  ],
  /* ---------------- SKILLS CIRCUIT (Skills page) ----------------
     Each category is a node on the circuit. Edit titles, descriptions and skills here.
     level is optional (Basic, Intermediate, Advanced). icon: any icon name used elsewhere. */
  skillCircuit: {
    start: "MY TECHNICAL SKILLS",
    end: "ALWAYS LEARNING, ALWAYS BUILDING",
    categories: [
      {
        id: "programming",
        title: "Programming Languages",
        icon: "code",
        blurb: "The languages I use to turn logic into working software and firmware.",
        skills: [
          { name: "C", icon: "code", level: "Basic", note: "Low-level programming and firmware" },
          { name: "C++", icon: "code", note: "Object-oriented, performance-focused code" },
          { name: "Python", icon: "python", note: "Scripting, automation and data analysis" },
          { name: "Java", icon: "java", note: "Object-oriented application development" },
          { name: "HTML", icon: "html", note: "Semantic, accessible page structure" },
          { name: "JavaScript", icon: "js", note: "Interactive front-end behaviour" }
        ]
      },
      {
        id: "hardware",
        title: "Embedded Systems & Hardware",
        icon: "chip",
        blurb: "Where code meets electronics: designing, wiring and programming real devices.",
        skills: [
          { name: "Arduino", icon: "board", note: "Sensor and actuator prototyping" },
          { name: "Microcontrollers", icon: "mcu", note: "8086 interfacing, peripherals and I/O" },
          { name: "Digital Logic", icon: "logic", level: "Intermediate", note: "Logic design, FSMs and VHDL" },
          { name: "Circuit Design", icon: "circuit", level: "Intermediate", note: "Digital circuits and Proteus simulation" },
          { name: "Hardware-Software Integration", icon: "layers", note: "Firmware and electronics working as one" },
          { name: "UART, SPI, I2C", icon: "signal", note: "Serial communication between devices" }
        ]
      },
      {
        id: "software",
        title: "Software & Technologies",
        icon: "layers",
        blurb: "The tools and fields I use to build, analyse and connect systems.",
        skills: [
          { name: "Artificial Intelligence", icon: "ai", note: "Intelligent systems and how they decide" },
          { name: "Machine Learning", icon: "ml", note: "Training and evaluating models" },
          { name: "Data Science", icon: "data", note: "Cleaning, analysing and visualising data" },
          { name: "Networking", icon: "net", level: "Intermediate", note: "Protocols, infrastructure and troubleshooting" },
          { name: "GitHub", icon: "git", note: "Version control and team collaboration" },
          { name: "VS Code", icon: "vscode", note: "My main development environment" }
        ]
      },
      {
        id: "professional",
        title: "Professional Skills",
        icon: "team",
        blurb: "How I work with people, plans and problems.",
        skills: [
          { name: "Problem Solving", icon: "puzzle", note: "Breaking problems into testable steps" },
          { name: "Critical Thinking", icon: "bulb", note: "Questioning assumptions, weighing trade-offs" },
          { name: "Teamwork", icon: "team", note: "Scrum teams of two to five people" },
          { name: "Communication", icon: "chat", level: "Advanced", note: "Explaining technical ideas clearly" },
          { name: "Project Management", icon: "kanban", note: "Sprints, Kanban boards and milestones" },
          { name: "Technical Documentation", icon: "doc", note: "Reports, READMEs and lab write-ups" }
        ]
      }
    ]
  },


  /* ---------------- SKILLS ----------------
     level: optional: Basic, Intermediate or Advanced (from the CV).
     applied: where the skill has been used: "Coursework", "Projects", "Labs", "Personal". */
  skills: {
    "Technical Skills": {
      blurb: "Languages and technologies I write code in.",
      items: [
        { name: "C / C++", icon: "code", level: "Basic", note: "Low-level programming, firmware and data structures.", applied: ["Coursework", "Labs"] },
        { name: "Assembly Language", icon: "chip", level: "Intermediate", note: "Programming microcontrollers close to the hardware.", applied: ["Coursework", "Projects", "Labs"] },
        { name: "Object-Oriented Programming", icon: "layers", level: "Intermediate", note: "Classes, inheritance and clean, reusable design.", applied: ["Coursework", "Projects"] },
        { name: "SQL", icon: "doc", level: "Basic", note: "Designing schemas and querying relational databases.", applied: ["Coursework", "Projects"] },
        { name: "Python", icon: "python", note: "Scripting, automation and data analysis.", applied: ["Coursework", "Personal"] },
        { name: "Java", icon: "java", note: "Object-oriented application development.", applied: ["Coursework"] },
        { name: "HTML / CSS", icon: "html", note: "Semantic, responsive and accessible interfaces.", applied: ["Projects", "Personal"] },
        { name: "JavaScript", icon: "js", note: "Interactive front-end behaviour and logic.", applied: ["Projects", "Personal"] },
        { name: "Arduino Programming", icon: "board", note: "Sensor integration, actuators and prototyping.", applied: ["Coursework", "Labs"] }
      ]
    },
    "Engineering Skills": {
      blurb: "Where hardware and software meet.",
      items: [
        { name: "Digital Circuit Design", icon: "circuit", level: "Intermediate", note: "Designing and verifying combinational and sequential circuits.", applied: ["Coursework", "Projects", "Labs"] },
        { name: "Logic Design", icon: "logic", level: "Intermediate", note: "Boolean logic, state machines and HDL (VHDL).", applied: ["Coursework", "Projects", "Labs"] },
        { name: "Computer Networking", icon: "signal", level: "Intermediate", note: "How systems communicate: protocols, infrastructure and troubleshooting.", applied: ["Coursework", "Labs"] },
        { name: "Embedded Systems", icon: "chip", note: "Real-time systems on constrained hardware.", applied: ["Coursework", "Projects", "Labs"] },
        { name: "Microcontrollers", icon: "mcu", note: "Peripherals, interrupts, timers and GPIO.", applied: ["Coursework", "Projects", "Labs"] },
        { name: "Hardware–Software Integration", icon: "layers", note: "Bringing firmware and electronics together reliably.", applied: ["Projects", "Labs"] },
        { name: "Digital Systems", icon: "logic", note: "Microprocessors, datapaths and system architecture.", applied: ["Coursework", "Labs"] },
        { name: "Circuit Design", icon: "circuit", note: "Schematics, prototyping and troubleshooting.", applied: ["Coursework", "Labs"] },
        { name: "Communication Protocols (UART, SPI, I2C)", icon: "signal", note: "Serial communication between microcontrollers and devices.", applied: ["Coursework", "Labs"] }
      ]
    },
    "Other Skills": {
      blurb: "How I work with people and problems.",
      items: [
        { name: "Verbal & Written Communication", icon: "doc", level: "Advanced", note: "Explaining technical ideas clearly to any audience.", applied: ["Coursework", "Projects", "Personal"] },
        { name: "Adaptability & Flexibility", icon: "layers", level: "Advanced", note: "Picking up new tools and roles quickly.", applied: ["Coursework", "Projects", "Personal"] },
        { name: "Problem Solving", icon: "puzzle", note: "Breaking complex problems into testable steps.", applied: ["Coursework", "Projects", "Labs"] },
        { name: "Critical Thinking", icon: "bulb", note: "Questioning assumptions and weighing trade-offs.", applied: ["Coursework", "Projects"] },
        { name: "Teamwork", icon: "team", note: "Collaborating across roles in group projects.", applied: ["Coursework", "Projects"] },
        { name: "Project Management", icon: "kanban", note: "Planning milestones and keeping work on track.", applied: ["Projects"] },
        { name: "Technical Documentation", icon: "doc", note: "Clear reports, READMEs and lab write-ups.", applied: ["Coursework", "Projects", "Labs"] },
        { name: "Research and Analysis", icon: "search", note: "Reading sources and turning data into decisions.", applied: ["Coursework", "Projects"] },
        { name: "System Troubleshooting", icon: "search", note: "Tracing faults methodically across hardware and software.", applied: ["Coursework", "Labs", "Personal"] }
      ]
    }
  },

  // Software, development tools and platforms.
  tools: ["Intel Quartus Prime", "Questa Simulator", "EMU8086", "Proteus", "MySQL", "React Native", "Expo", "Firebase", "Google Maps API", "VS Code", "Git & GitHub", "Microsoft Office", "Cisco Packet Tracer", "Wix"],

  /* ---------------- ABOUT ---------------- */
  timeline: [
    { when: "2011 – 2023", title: "Saad National School, Khobar", text: "Earned my High School Diploma in Khobar, Saudi Arabia, where my curiosity about how computers work began." },
    { when: "Sep 2023", title: "Joined AUBH: Computer Engineering", text: "Began my B.Sc. in Computer Engineering at the American University of Bahrain." },
    { when: "Sep – Dec 2025", title: "RouteMate: Front-end Developer", text: "Built the front end of a university ride-sharing application as part of a team project." },
    { when: "Feb – May 2026", title: "Hardware & Systems Semester", text: "Delivered three projects in one term: a VHDL Digital Lock System, a Smart Charging Monitoring System in Assembly, and the Heston AutoServices SQL database." },
    { when: "2026 – 2027", title: "Senior Year & Capstone", text: "Capstone: Biofeedback Adaptive Horror Stealth Game." },
    { when: "Expected 2027", title: "Graduation", text: "B.Sc. in Computer Engineering, American University of Bahrain." }
  ],

  achievements: [
    { type: "Education", title: "B.Sc. Computer Engineering", text: "American University of Bahrain (AUBH) · Sep 2023 – Present." },
    { type: "Education", title: "High School Diploma", text: "Saad National School, Khobar, Saudi Arabia · 2011 – 2023." },
    { type: "Academic", title: "[Academic Achievement]", text: "Add an honor, award or Dean's List recognition here." },
    { type: "Certification", title: "[Certification Name]", text: "Add the issuer and the year, e.g. a networking (CCNA) or programming certificate." },
    { type: "Extracurricular", title: "[Club / Society]", text: "Add your role in a student club, IEEE branch or tech community." },
    { type: "Extracurricular", title: "[Competition / Hackathon]", text: "Add a competition, hackathon or event you took part in." }
  ]
};