//  เเก้ไข 2จุดครับ 1 บรรทัดที่18 ตอนเเรกอ่านไฟล์ไม่ได้เพราะ ใส่เป็น student ไม่มี s ทำได้เเก้เป็น students ทำให้อ่านไฟล์ได้ จุดที่2 บรรทัดที่25 ที่เเก้ คือ หน้าบ้านข้อมูลไม่ขึ้น

const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

// เก็บข้อมูลนักเรียน
let students = [];

// อ่านไฟล์ CSV
// จุดที่เเก้ไข จุดที่ 1 ชื่อใส่ ไฟล์ผิด
fs.createReadStream('students.csv')
  .pipe(csv())
  .on('data', (data) => students.push(data))
  .on('end', () => {
    console.log('อ่านข้อมูลนักเรียนเรียบร้อยแล้ว');
  });

//จุดที่2 เเก้ไขข้อมูลไม่เเสดง ที่ front-end โดยการเพิ่ม path index.html เข้าไปทำให้ back-end กับ front-end สามารถคุยกันได้
app.use(express.static(path.join(__dirname)));

// เสิร์ฟ index.html เมื่อเข้าถึง root ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
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

// ดึงข้อมูลนักเรียนตามชั้นเรียน
app.get('/api/classes/:className', (req, res) => {
  const classStudents = students.filter(s => s.ชั้นเรียน === req.params.className);
  res.json(classStudents);
});

app.listen(port, () => {
  console.log(`Server กำลังทำงานที่ port ${port}`);
});
