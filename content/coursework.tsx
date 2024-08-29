import { Category, CourseOverview } from "@/components/CourseworkTable/CourseworkTable.helper";

export const courses = new CourseOverview({
    "EECS": new Category("eecs", "red", "bg-red-700 dark:bg-red-800 text-white", "Major requirements for the Electrical Engineering and Computer Science major."),
    "Breadth": new Category("breadth", 'yellow', "bg-yellow-700 dark:bg-yellow-800 text-white", "Breadth requirements"),
    "Decal": new Category("decal", 'green', 'bg-green-700 dark:bg-green-800 text-white', 'A student-ran course taken for fun.'),
    "Teaching": new Category("teaching", "purple", "bg-purple-700 dark:bg-purple-800 text-white", "Courses that I have taught."),
});

const fa22 = courses.addSemester("Fall 22");
fa22.addCourse("The Structure and Interpretation of Computer Programs", "CS 61A", 'EECS', "https://cs61a.org")
fa22.addCourse("Calculus", 'MATH 1B', 'EECS', 'https://classes.berkeley.edu/content/2022-fall-math-1b-001-lec-001')
fa22.addCourse("Literature of American Cultures", 'ENGLISH 31AC', 'Breadth', 'https://classes.berkeley.edu/content/2022-fall-english-31ac-001-lec-001')

const sp23 = courses.addSemester("Spring 23");
sp23.addCourse("Data Structures", "CS 61B", 'EECS', "https://sp23.datastructur.es")
sp23.addCourse("Designing Information Devices and Systems I", "EECS 16A", 'EECS', "https://eecs16a.org")
sp23.addCourse("Multivariable Calculus", "MATH 53", 'EECS', "https://classes.berkeley.edu/content/2023-spring-math-53-001-lec-001")
sp23.addCourse("English Composition in Connection with the Reading of Literature", 'FRENCH R1B', 'Breadth', 'https://classes.berkeley.edu/content/2023-spring-french-r1b-002-lec-002')

const fa23 = courses.addSemester("Fall 23");
fa23.addCourse("Great Ideas of Computer Architecture (Machine Structures)", "CS 61C", 'EECS', "https://cs61c.org")
fa23.addCourse("Designing Information Devices and Systems II", "EECS 16B", 'EECS', "https://eecs16b.org")
fa23.addCourse("Physics for Scientists and Engineers", "PHYSICS 7A", 'EECS', "https://classes.berkeley.edu/content/2023-fall-physics-7a-002-lec-002")
fa23.addCourse("Urban Field Study", "GEOG 181", 'Breadth', "https://classes.berkeley.edu/content/2023-fall-geog-181-001-fld-001")
fa23.addCourse("Bicycle Maintenance and Repair", "CIVENG 98", 'Decal', "https://classes.berkeley.edu/content/2023-fall-civeng-98-009-grp-009")
fa23.addCourse("Introduction to Transportation and Mobility Planning", "CYPLAN 98 ", 'Decal', "https://classes.berkeley.edu/content/2023-fall-cyplan-98-004-grp-004")

const sp24 = courses.addSemester("Spring 24");
sp24.addCourse("Discrete Mathematics and Probability Theory", "CS 70", 'EECS', "https://sp24.eecs70.org");
sp24.addCourse("Computer Security", "CS 161", 'EECS', "https://sp24.cs161.org");
sp24.addCourse("Introduction to Database Systems", "CS 186", 'EECS', "https://cs186berkeley.net/sp24/");
sp24.addCourse("Physics for Scientists and Engineers", "PHYSICS 7B", 'EECS', "https://classes.berkeley.edu/content/2024-spring-physics-7b-002-lec-002");

const su24 = courses.addSemester("Summer 24");
su24.addCourse("Computer Security", "CS 161", 'Teaching', "https://su24.cs161.org");

const fa24 = courses.addSemester("Fall 24");
fa24.addCourse("Operating Systems and System Programming", "CS 162", 'EECS', "https://cs162.org");
fa24.addCourse("Programming Languages and Compilers", "CS 164", 'EECS', "https://classes.berkeley.edu/content/2024-fall-compsci-164-001-lec-001");
fa24.addCourse("Efficient Algorithms and Intractable Problems", "CS 170", 'EECS', "https://cs170.org/");
fa24.addCourse("Computer Security", "CS 161", 'Teaching', "https://fa24.cs161.org");
