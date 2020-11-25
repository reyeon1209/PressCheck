const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post("/", (req, res) => {
    let email = req.body.email;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'test1smtp5858@gmail.com',  // gmail 계정 아이디를 입력
            pass: 'test5858!'                 // gmail 계정의 비밀번호를 입력
        }   
    });

    let mailOptions = {
        from: 'test1smtp5858@gmail.com',        // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email ,                             // 수신 메일 주소
        subject: '[PressCheck] 분석 리포트',     // 제목
        text: '../views/mailer.html'            // 내용
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.redirect("/");
})

module.exports = router;