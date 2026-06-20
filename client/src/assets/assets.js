import logo from './logo.svg'
import logo_dark from './logo_dark.svg'
import search_icon from './search_icon.svg'
import cross_icon from './cross_icon.svg'
import upload_area from './upload_area.svg'
import sketch from './sktech.svg'
import microsoft_logo from './microsoft_logo.svg'
import walmart_logo from './walmart_logo.svg'
import accenture_logo from './accenture_logo.svg'
import adobe_logo from './adobe_logo.svg'
import paypal_logo from './paypal_logo.svg'
import course_1_thumbnail from './course_1.png'
import course_2_thumbnail from './course_2.png'
import course_3_thumbnail from './course_3.png'
import course_4_thumbnail from './course_4.png'
import star from './rating_star.svg'
import star_blank from './star_dull_icon.svg'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'
import arrow_icon from './arrow_icon.svg'
import down_arrow_icon from './down_arrow_icon.svg'
import time_left_clock_icon from './time_left_clock_icon.svg'
import time_clock_icon from './time_clock_icon.svg'
import user_icon from './user_icon.svg'
import home_icon from './home_icon.svg'
import add_icon from './add_icon.svg'
import my_course_icon from './my_course_icon.svg'
import person_tick_icon from './person_tick_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import file_upload_icon from './file_upload_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import dropdown_icon from './dropdown_icon.svg'
import patients_icon from './patients_icon.svg'
import play_icon from './play_icon.svg'
import blue_tick_icon from './blue_tick_icon.svg'
import profile_img from './profile_img.png'
import profile_img2 from './profile_img2.png'
import profile_img3 from './profile_img3.png'
import lesson_icon from './lesson_icon.svg'

/* ✅ ASSETS OBJECT */
export const assets = {
  logo,
  logo_dark,
  search_icon,
  cross_icon,
  upload_area,
  sketch,
  microsoft_logo,
  walmart_logo,
  accenture_logo,
  adobe_logo,
  paypal_logo,
  course_1_thumbnail,
  course_2_thumbnail,
  course_3_thumbnail,
  course_4_thumbnail,
  star,
  star_blank,
  profile_img_1,
  profile_img_2,
  profile_img_3,
  arrow_icon,
  dropdown_icon,
  down_arrow_icon,
  time_left_clock_icon,
  time_clock_icon,
  user_icon,
  home_icon,
  add_icon,
  my_course_icon,
  person_tick_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  file_upload_icon,
  appointments_icon,
  earning_icon,
  patients_icon,
  play_icon,
  blue_tick_icon,
  profile_img,
  profile_img2,
  profile_img3,
  lesson_icon
}

/* ✅ DUMMY TESTIMONIALS */
export const dummyTestimonial = [
  {
    name: 'Donald Jackman',
    role: 'SWE 1 @ Amazon',
    image: assets.profile_img_1,
    rating: 5,
    feedback:
      "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    name: 'Richard Nelson',
    role: 'SWE 2 @ Samsung',
    image: assets.profile_img_2,
    rating: 4,
    feedback:
      "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    name: 'James Washington',
    role: 'SWE 2 @ Google',
    image: assets.profile_img_3,
    rating: 4.5,
    feedback:
      "I've been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
]

/* ✅ DUMMY COURSES */
export const dummyCourses = [
  {
    _id: "697738609eaa4a10bcd33a26",
    courseTitle: "Introduction to JavaScript",
    courseThumbnail: assets.course_1_thumbnail,
    coursePrice: 49.99,
    discount: 20,
    courseRatings: [{ rating: 5 }, { rating: 4 }],

    courseContent: [
      {
        chapterTitle: "JavaScript Basics",
        chapterContent: [
          {
            lectureId: "js1",
            lectureTitle: "What is JavaScript?",
            lectureUrl: "https://www.youtube.com/watch?v=upDLs1sn7g4",
            lectureDuration: 10,
          },
          {
            lectureId: "js2",
            lectureTitle: "Variables and Data Types",
            lectureUrl: "https://www.youtube.com/watch?v=9emXNzqCKyg",
            lectureDuration: 12,
          },
          {
            lectureId: "js3",
            lectureTitle: "Operators and Expressions",
            lectureUrl: "https://www.youtube.com/watch?v=md-6k3i2oCw",
            lectureDuration: 11,
          },
        ],
      },
      {
        chapterTitle: "Control Flow",
        chapterContent: [
          {
            lectureId: "js4",
            lectureTitle: "If-Else & Switch",
            lectureUrl: "https://www.youtube.com/watch?v=IsG4Xd6LlsM",
            lectureDuration: 13,
          },
          {
            lectureId: "js5",
            lectureTitle: "Loops in JavaScript",
            lectureUrl: "https://www.youtube.com/watch?v=s9wW2PpJsmQ",
            lectureDuration: 14,
          },
        ],
      },
    ],
  },

  {
    _id: "697739259eaa4a10bcd33a28",
    courseTitle: "Advanced Python Programming",
    courseThumbnail: assets.course_2_thumbnail,
    coursePrice: 79.99,
    discount: 15,
    courseRatings: [{ rating: 5 }, { rating: 3 }],

    courseContent: [
      {
        chapterTitle: "Advanced Python Concepts",
        chapterContent: [
          {
            lectureId: "py1",
            lectureTitle: "Decorators in Python",
            lectureUrl: "https://www.youtube.com/watch?v=FsAPt_9Bf3U",
            lectureDuration: 15,
          },
          {
            lectureId: "py2",
            lectureTitle: "Generators & Iterators",
            lectureUrl: "https://www.youtube.com/watch?v=bD05uGo_sVI",
            lectureDuration: 14,
          },
        ],
      },
      {
        chapterTitle: "Performance & Best Practices",
        chapterContent: [
          {
            lectureId: "py3",
            lectureTitle: "Memory Management",
            lectureUrl: "https://www.youtube.com/watch?v=F6u5rhUQ6dU",
            lectureDuration: 12,
          },
          {
            lectureId: "py4",
            lectureTitle: "Async & Await",
            lectureUrl: "https://www.youtube.com/watch?v=t5Bo1Je9EmE",
            lectureDuration: 16,
          },
        ],
      },
    ],
  },

  {
    _id: "697739439eaa4a10bcd33a2a",
    courseTitle: "Web Development Bootcamp",
    courseThumbnail: assets.course_3_thumbnail,
    coursePrice: 99.99,
    discount: 25,
    courseRatings: [{ rating: 4 }, { rating: 5 }],

    courseContent: [
      {
        chapterTitle: "HTML & CSS",
        chapterContent: [
          {
            lectureId: "web1",
            lectureTitle: "HTML Basics",
            lectureUrl: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
            lectureDuration: 14,
          },
          {
            lectureId: "web2",
            lectureTitle: "CSS Fundamentals",
            lectureUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
            lectureDuration: 15,
          },
        ],
      },
      {
        chapterTitle: "JavaScript for Web",
        chapterContent: [
          {
            lectureId: "web3",
            lectureTitle: "DOM Manipulation",
            lectureUrl: "https://www.youtube.com/watch?v=5fb2aPlgoys",
            lectureDuration: 13,
          },
          {
            lectureId: "web4",
            lectureTitle: "Fetch API",
            lectureUrl: "https://www.youtube.com/watch?v=cuEtnrL9-H0",
            lectureDuration: 12,
          },
        ],
      },
    ],
  },

  {
    _id: "6977395f9eaa4a10bcd33a2c",
    courseTitle: "Data Science and Machine Learning",
    courseThumbnail: assets.course_4_thumbnail,
    coursePrice: 89.99,
    discount: 30,
    courseRatings: [{ rating: 5 }, { rating: 4 }],

    courseContent: [
      {
        chapterTitle: "Introduction to ML",
        chapterContent: [
          {
            lectureId: "ml1",
            lectureTitle: "What is Machine Learning?",
            lectureUrl: "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
            lectureDuration: 18,
          },
          {
            lectureId: "ml2",
            lectureTitle: "Types of Machine Learning",
            lectureUrl: "https://www.youtube.com/watch?v=f_uwKZIAeM0",
            lectureDuration: 16,
          },
        ],
      },
      {
        chapterTitle: "ML Algorithms",
        chapterContent: [
          {
            lectureId: "ml3",
            lectureTitle: "Linear Regression",
            lectureUrl: "https://www.youtube.com/watch?v=E5RjzSK0fvY",
            lectureDuration: 17,
          },
          {
            lectureId: "ml4",
            lectureTitle: "Classification Algorithms",
            lectureUrl: "https://www.youtube.com/watch?v=9yl6-HEY7_s",
            lectureDuration: 15,
          },
        ],
      },
    ],
  },
];
