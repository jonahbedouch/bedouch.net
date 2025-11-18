import {
  Category,
  CourseOverview,
} from "@/components/CourseworkTable/CourseworkTable.helper";

export const courses = new CourseOverview({
  EECS: new Category(
    "eecs",
    "red",
    "bg-red-700 dark:bg-red-800 text-white",
    "Major requirements for the Electrical Engineering and Computer Science major.",
  ),
  Breadth: new Category(
    "breadth",
    "yellow",
    "bg-yellow-700 dark:bg-yellow-800 text-white",
    "Breadth requirements",
  ),
  Decal: new Category(
    "decal",
    "green",
    "bg-green-700 dark:bg-green-800 text-white",
    "A student-ran course taken for fun.",
  ),
  Teaching: new Category(
    "teaching",
    "purple",
    "bg-purple-700 dark:bg-purple-800 text-white",
    "Courses that I have taught.",
  ),
});

const fa22 = courses.addSemester("Fall 22");
fa22.addCourse(
  "The Structure and Interpretation of Computer Programs",
  "CS 61A",
  "EECS",
  "https://cs61a.org",
);
fa22.addCourse(
  "Calculus",
  "MATH 1B",
  "EECS",
  "https://classes.berkeley.edu/content/2022-fall-math-1b-001-lec-001",
);
fa22.addCourse(
  "Literature of American Cultures",
  "ENGL 31AC",
  "Breadth",
  "https://classes.berkeley.edu/content/2022-fall-english-31ac-001-lec-001",
);

const sp23 = courses.addSemester("Spring 23");
sp23.addCourse(
  "Data Structures",
  "CS 61B",
  "EECS",
  "https://sp23.datastructur.es",
);
sp23.addCourse(
  "Designing Information Devices and Systems I",
  "EECS 16A",
  "EECS",
  "https://eecs16a.org",
);
sp23.addCourse(
  "Multivariable Calculus",
  "MATH 53",
  "EECS",
  "https://classes.berkeley.edu/content/2023-spring-math-53-001-lec-001",
);
sp23.addCourse(
  "English Composition in Connection with the Reading of Literature",
  "FRNCH R1B",
  "Breadth",
  "https://classes.berkeley.edu/content/2023-spring-french-r1b-002-lec-002",
);

const fa23 = courses.addSemester("Fall 23");
fa23.addCourse(
  "Great Ideas of Computer Architecture (Machine Structures)",
  "CS 61C",
  "EECS",
  "https://cs61c.org",
);
fa23.addCourse(
  "Designing Information Devices and Systems II",
  "EECS 16B",
  "EECS",
  "https://eecs16b.org",
);
fa23.addCourse(
  "Physics for Scientists and Engineers",
  "PHYS 7A",
  "EECS",
  "https://classes.berkeley.edu/content/2023-fall-physics-7a-002-lec-002",
);
fa23.addCourse(
  "Urban Field Study",
  "GEOG 181",
  "Breadth",
  "https://classes.berkeley.edu/content/2023-fall-geog-181-001-fld-001",
);
fa23.addCourse(
  "Bicycle Maintenance and Repair",
  "CIVENG 98",
  "Decal",
  "https://classes.berkeley.edu/content/2023-fall-civeng-98-009-grp-009",
);
fa23.addCourse(
  "Introduction to Transportation and Mobility Planning",
  "CYPLAN 98 ",
  "Decal",
  "https://classes.berkeley.edu/content/2023-fall-cyplan-98-004-grp-004",
);

const sp24 = courses.addSemester("Spring 24");
sp24.addCourse(
  "Discrete Mathematics and Probability Theory",
  "CS 70",
  "EECS",
  "https://sp24.eecs70.org",
);
sp24.addCourse("Computer Security", "CS 161", "EECS", "https://sp24.cs161.org");
sp24.addCourse(
  "Introduction to Database Systems",
  "CS 186",
  "EECS",
  "https://cs186berkeley.net/sp24/",
);
sp24.addCourse(
  "Physics for Scientists and Engineers",
  "PHYS 7B",
  "EECS",
  "https://classes.berkeley.edu/content/2024-spring-physics-7b-002-lec-002",
);

const su24 = courses.addSemester("Summer 24");
su24.addCourse(
  "Computer Security",
  "CS 161",
  "Teaching",
  "https://su24.cs161.org",
);

const fa24 = courses.addSemester("Fall 24");
fa24.addCourse(
  "Operating Systems and System Programming",
  "CS 162",
  "EECS",
  "https://cs162.org",
);
fa24.addCourse(
  "Programming Languages and Compilers",
  "CS 164",
  "EECS",
  "https://classes.berkeley.edu/content/2024-fall-compsci-164-001-lec-001",
);
fa24.addCourse(
  "Efficient Algorithms and Intractable Problems",
  "CS 170",
  "EECS",
  "https://cs170.org/",
);
fa24.addCourse(
  "Adaptive Instruction Methods in Computer Science",
  "CS 370",
  "Breadth",
  "https://classes.berkeley.edu/content/2024-fall-compsci-370-002-lec-002",
);
fa24.addCourse(
  "Computer Security",
  "CS 161",
  "Teaching",
  "https://fa24.cs161.org",
);

const sp25 = courses.addSemester("Spring 25");
sp25.addCourse(
  "Computer Architecture",
  "CS 152",
  "EECS",
  "https://inst.eecs.berkeley.edu/~cs152/sp25/",
);
sp25.addCourse(
  "Introduction to the Internet: Architecture and Protocols",
  "CS 168",
  "EECS",
  "https://sp25.cs168.io/",
);
sp25.addCourse(
  "Foundations of Computer Graphics",
  "CS 184",
  "EECS",
  "https://cs184.eecs.berkeley.edu/sp25",
);
sp25.addCourse(
  "Designing Computer Science Education",
  "CS 302",
  "Breadth",
  "https://cs302.org/sp25/",
);
sp25.addCourse(
  "Computer Security",
  "CS 161",
  "Teaching",
  "https://sp25.cs161.org",
);

const su25 = courses.addSemester("Summer 25");
su25.addCourse(
  "Computer Security",
  "CS 161",
  "Teaching",
  "https://su25.cs161.org",
);

const fa25 = courses.addSemester("Fall 25");
fa25.addCourse(
  "Introduction to Digital Design and Integrated Circuits",
  "EECS 151",
  "EECS",
  "https://www2.eecs.berkeley.edu/Courses/EECS151/",
);
fa25.addCourse(
  "Introduction to Digital Design and Integrated Circuits — ASIC Lab",
  "EECS 151LA",
  "EECS",
  "https://www2.eecs.berkeley.edu/Courses/EECS151/",
);
fa25.addCourse(
  "Introduction to Digital Design and Integrated Circuits — FPGA Lab",
  "EECS 151LB",
  "EECS",
  "https://www2.eecs.berkeley.edu/Courses/EECS151/",
);
fa25.addCourse(
  "Social Implications of Computer Technology",
  "CS 195",
  "EECS",
  "https://cs195.org/fa25/",
);
fa25.addCourse(
  "Advanced Topics in Computer Systems",
  "CS 262A",
  "EECS",
  "https://people.eecs.berkeley.edu/~kubitron/courses/cs262a-F25/index.html",
);
fa25.addCourse(
  "Introduction to Linguistic Science",
  "LING 100",
  "Breadth",
  "https://classes.berkeley.edu/content/2025-fall-linguis-100-001-lec-001",
);
fa25.addCourse(
  "Computer Security",
  "CS 161",
  "Teaching",
  "https://fa25.cs161.org",
);

// const sp26 = courses.addSemester("Spring 26");
// sp26.addCourse
