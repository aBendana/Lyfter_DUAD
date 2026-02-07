const student = {
  name: "John Doe",
  grades: [
    { name: "math", grade: 80 },
    { name: "science", grade: 100 },
    { name: "history", grade: 60 },
    { name: "PE", grade: 90 },
    { name: "music", grade: 98 },
  ],
};

function destructuringStudent(anyStudent) {
  const { name, grades } = anyStudent;
  return { name, grades };
}

function averageGrade(grades) {
  let gradesSum = 0;
  grades.forEach((data) => {
    gradesSum += data.grade;
  });

  const studentAverageGrade = gradesSum / grades.length;
  return studentAverageGrade;
}

function lowerGrade(grades) {
  let courseLowestGrade = grades[0].name;
  let minimumGrade = grades[0].grade;

  for (let i = 1; i < grades.length; i++) {
    if (grades[i].grade < minimumGrade) {
      minimumGrade = grades[i].grade;
      courseLowestGrade = grades[i].name;
    }
  }
  return courseLowestGrade;
}

function higherGrade(grades) {
  let courseHigherGrade = grades[0].name;
  let higherGrade = grades[0].grade;

  for (let i = 1; i < grades.length; i++) {
    if (grades[i].grade > higherGrade) {
      higherGrade = grades[i].grade;
      courseHigherGrade = grades[i].name;
    }
  }
  return courseHigherGrade;
}

class constructResult {
  constructor(name, gradeAvg, lowestGrade, highestGrade) {
    this.fullName = name;
    this.gradesAverage = gradeAvg;
    this.lowestGrade = lowestGrade;
    this.highestGrade = highestGrade;
  }

  toString() {
    return `Full name: ${this.fullName} / Grades Avergae: ${this.gradesAverage} 
    / Lowest grade course: ${this.lowestGrade} / Highest grade course: ${this.highestGrade}`;
  }
}

function main(student) {
  const { name, grades } = destructuringStudent(student);
  const average = averageGrade(grades);
  const minimumGrade = lowerGrade(grades);
  const maximumGrade = higherGrade(grades);
  const result = new constructResult(name, average, minimumGrade, maximumGrade);

  console.log(student);
  // console.log(result);
  console.log(result.toString());
}

main(student);
