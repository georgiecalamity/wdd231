document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.getElementById('menu');
  
    menuIcon.addEventListener('click', function () {
        menu.classList.toggle('open');
        if (menu.classList.contains('open')) {
            menuIcon.textContent = '✖';
        } else {
            menuIcon.textContent = '☰';
        }
    });
  });
  

  const currentYear = new Date().getFullYear();
  const copyrightYear = document.getElementById("copyrightYear");
  copyrightYear.textContent = `©${currentYear}`;
  
  const lastModifiedDate = new Date(document.lastModified);
  const lastModified = document.getElementById("lastModified");
  lastModified.textContent = `Last Modified: ${lastModifiedDate.toLocaleDateString()}`;


//   list of courses
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]


//-------------------------------------------- Render the courses

const totalCreditsDisplay = document.getElementById('total-credits');

function renderCourses(filteredCourses) {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = ''; // Clear the existing list

    filteredCourses.forEach(course => {
        const courseContainer = document.createElement('div');
        courseContainer.classList.add('course-item');
        
        if (course.completed) {
            courseContainer.classList.add('completed');
        }
        
        // ---------------------------------------------------- display
        courseContainer.innerHTML = `<h4>${course.subject} ${course.number}</h4>`;
        courseList.appendChild(courseContainer);
    });

    // Calculate total credits using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = `Total Credits: ${totalCredits}`;
}

// Function to filter courses based on the selected category
function filterCourses(category) {
    let filteredCourses;
    if (category === 'all') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.subject === category);
    }
    renderCourses(filteredCourses);
}


// Initial rendering of all courses
renderCourses(courses);
