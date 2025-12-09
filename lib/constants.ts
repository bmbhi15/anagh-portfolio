export enum WindowId {
  Finder = "finder",
  Contact = "contact",
  Resume = "resume",
  Safari = "safari",
  Photos = "photos",
  Terminal = "terminal",
  TxtFile = "txtfile",
  ImgFile = "imgfile",
}
export interface NavLink {
  id: number; // <-- typed against your WindowId enum
  name: string;
  type: WindowId;
}
const navLinks: NavLink[] = [
  {
    id: 1,
    name: "Projects",
    type: WindowId.Finder,
  },
  {
    id: 3,
    name: "Contact",
    type: WindowId.Contact,
  },
  {
    id: 4,
    name: "Resume",
    type: WindowId.Resume,
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

interface DockWindowApp {
  id: WindowId; // <-- typed against your WindowId enum
  name: string;
  icon: string;
  canOpen: boolean;
}

// Special non-window item(s) like Trash
interface DockStaticApp {
  id: "trash";
  name: string;
  icon: string;
  canOpen: false;
}

type DockApp = DockWindowApp | DockStaticApp;

const dockApps: DockApp[] = [
  {
    id: WindowId.Finder,
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: WindowId.Safari,
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: false,
  },
  {
    id: WindowId.Photos,
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: false,
  },
  {
    id: WindowId.Contact,
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: WindowId.Terminal,
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: "/images/blog2.png",
    link: "",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "",
  },
];

const techStack = [
  {
    category: "Frontend & Mobile",
    items: ["React.js", "Next.js", "TypeScript", "React Native", "Expo"],
  },
  {
    category: "UI",
    items: ["Shadcn UI", "MUI", "Tailwind CSS", "GSAP", "Three.js", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Django", "GraphQL", "REST", "Prisma"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "Dev Tools",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Webpack",
      "pnpm",
      "yarn",
      "CodeRabbit",
      "Cursor",
    ],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    color: "#f4656b",
    link: "https://github.com/bmbhi15",
  },
  {
    id: 2,
    text: "Email",
    icon: "/icons/atom.svg",
    color: "#4bcb63",
    link: "mailto:anaghpranshu8@gmail.com",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    color: "#ff866b",
    link: "https://x.com/anagh90801",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    color: "#05b6f6",
    link: "https://www.linkedin.com/in/anagh-pranshu/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

export interface Location {
  id: number;
  type?: string;
  name: string;
  icon: string;
  kind: string;
  fileType?: string;
  position?: string;
  windowPosition?: string;
  description?: string[];
  href?: string;
  imageUrl?: string;
  subtitle?: string;
  image?: string;
  fileTitle?: string;
  children?: Location[];
}

export const WORK_LOCATION: Location = {
  id: 1,
  type: "work",
  name: "Projects",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "Cocktail Bar Landing Page",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-5", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "Cocktail Landing Page.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Velvet Pour is a cocktail landing page built with Next.js, GSAP, and Tailwind CSS.",
            "The site uses server-side rendering, structured content, and well-optimized metadata to improve SEO and initial load performance.",
            "Custom GSAP timelines add smooth scroll-based animations while maintaining good performance and core web vitals.",
            "The UI is fully responsive, with a clear visual hierarchy, accessible typography, and reusable Tailwind components.",
          ],
          fileTitle: "Project Summary",
        },
        {
          id: 2,
          name: "velvet-pour.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://cocktail-gsap-website-wine.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "preview_website_2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-45 right-50",
          imageUrl: "/images/project1/art.png",
        },
        {
          id: 5,
          name: "preview_website_1.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-45 right-95",
          imageUrl: "/images/project1/hero.png",
        },
        {
          id: 5,
          name: "preview_website_3.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-45 right-0",
          imageUrl: "/images/project1/menu.png",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "Apple Macbook Product Page Copy",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Apple Macbook Product Page Copy.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Apple MacBook Pro product page clone built with Next.js, Tailwind CSS, Three.js, and GSAP.",
            "Implements an interactive 3D MacBook model using Three.js, integrated into the layout to showcase hardware-focused sections.",
            "Uses GSAP for scroll-triggered animations to smoothly reveal content and mimic Apple-style narrative page transitions.",
            "Leverages server-side rendering, responsive Tailwind components, and optimized media to keep the page performant and production-ready.",
          ],
          fileTitle: "Project Summary",
        },
        {
          id: 2,
          name: "macbook-m4.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://apple-page-copy.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "preview1.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-45 right-95",
          imageUrl: "/images/project2/hero.png",
        },
        {
          id: 5,
          name: "preview2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-45 right-50",
          imageUrl: "/images/project2/model.png",
        },
        {
          id: 6,
          name: "preview3.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-45 right-0",
          imageUrl: "/images/project2/footer.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION: Location = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/about/me.jpeg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 right-5",
      imageUrl: "/images/about/casual-me.jpeg",
    },
    {
      id: 3,
      name: "conference-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-45 left-80",
      imageUrl: "/images/about/conference-me.jpeg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-45 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/adrian.jpg",
      description: [
        "Welcome to my portfolio traveller, I'm Anagh, Nice to meet you.",
        "I'm a Full-stack Engineer with 2 years of experience building analytics dashboards, mobile apps and marketing landing pages at a fast-paced startup.",
        "I specialize in JavaScript, React, and Next.js. I'm big on learning tech through first principles thinking and I usually have a good fundamental understanding of the tech",
        "I love making beautiful UIs with good UX and stunning animations. I like to make intuitive designs and highly performant websites that feel incredibly fast !!",
        "If you couldn't already tell I love to geek on anime and I'm passionate about cricket and chess. We can connect over a game of chess !",
      ],
      fileTitle: "Professional Summary",
    },
  ],
};

const RESUME_LOCATION: Location = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION: Location = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const ROOT_LOCATION: Location[] = [
  WORK_LOCATION,
  ABOUT_LOCATION,
  RESUME_LOCATION,
  TRASH_LOCATION,
];

const INITIAL_Z_INDEX = 1000;

export interface WindowState<TData = unknown> {
  isOpen: boolean;
  zIndex: number;
  data: TData | null;
}

export type WindowConfig = Record<WindowId, WindowState>;

const WINDOW_CONFIG: WindowConfig = {
  [WindowId.Finder]: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  [WindowId.Contact]: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  [WindowId.Resume]: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  [WindowId.Safari]: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  [WindowId.Photos]: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  [WindowId.Terminal]: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  [WindowId.TxtFile]: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  [WindowId.ImgFile]: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
