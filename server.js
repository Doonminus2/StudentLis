const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

// เก็บข้อมูลนักเรียน
let students = [];

// อ่านไฟล์ CSV
fs.createReadStream('student.csv')
  .pipe(csv())
  .on('data', (data) => students.push(data))
  .on('end', () => {
    console.log('อ่านข้อมูลนักเรียนเรียบร้อยแล้ว');
  });

// ดึงข้อมูลนักเรียนทั้งหมด
app.get('/api/students', (req, res) => {
  res.json(students);
});

// ดึงข้อมูลนักเรียนตาม ID
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.รหัสนักเรียน === req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'ไม่พบข้อมูลนักเรียน' });
  }
});

// ดึงข้อมูลนักเรียนตาม��ั้นเรียน
app.get('/api/classes/:className', (req, res) => {
  const classStudents = students.filter(s => s.ชั้นเรียน === req.params.className);
  res.json(classStudents);
});

app.listen(port, () => {
  console.log(`Server กำลังทำงานที่ port ${port}`);
}); 