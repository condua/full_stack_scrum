//type in command: npx jest createExam.test.js to run
const puppeteer = require('puppeteer');

describe('Create Exam Automation Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({headless:false});
    page = await browser.newPage();
    await page.goto('http://localhost:3000/teacher/exams'); // Điều hướng đến trang của bạn
  });

  afterAll(async () => { 
    await browser.close();
  });

  test('Create Exam Test Case', async () => {
    try{
    // Nhập tên bài thi
    await page.type('#exam-name', 'Tên bài thi mới');

    // Nhấn nút "Add Question"


    // Nhập nội dung câu hỏi và tạo đáp án
    for (let i = 0; i < 40; i++) {
        await page.click('#add-question');
      
        // Đợi cho input của câu hỏi xuất hiện trên trang
        const textQuestionSelector = `#textQuestion${i}`;
        await page.waitForSelector(textQuestionSelector);
      
        // Nhập nội dung cho câu hỏi
        await page.type(textQuestionSelector, `Nội dung câu hỏi ${i + 1}`);
      
        // Tạo 4 đáp án cho mỗi câu hỏi
        for (j = 0; j < 4; j++) {
          await page.click(`#add-option${i}`);
      
          // Đợi cho input của đáp án xuất hiện trên trang
          const contentOptionSelector = `#content-option${i}${j}`;
          await page.waitForSelector(contentOptionSelector);
      
          // Nhập nội dung cho đáp án
          await page.type(contentOptionSelector, `Nội dung đáp án ${j + 1}`);
      
          // Chọn checkbox "isCorrect" cho đáp án đầu tiên
        //   if (j === 0) {
        //     const isCorrectSelector = `#isCorrect${i}${j}`;
        //     await page.click(isCorrectSelector);
        //   }  
        }
        const isCorrectSelector = `#isCorrect${i}${0}`;
        await page.click(isCorrectSelector);
      }
      

    // Chọn checkbox "isCorrect" cho option
    // await page.click('input[type="checkbox"]');

    await page.waitForTimeout(1000);

    // Nhấn nút "Create Exam"
    await page.click('#button-create');

    // Chờ một chút để đảm bảo thông báo thành công được hiển thị (nếu có)
    await page.waitForSelector('.success-message');

    // Kiểm tra xem thông báo thành công đã xuất hiện hay chưa
    const successMessage = await page.evaluate(() => {
      return document.querySelector('.success-message').innerText; // Thay '.success-message' bằng selector của thông báo thành công (nếu có)
    });
    expect(successMessage).toBe('Tạo bài thi thành công');
    }catch(error){
        console.log(error)
    }
  },100000);
    
});
