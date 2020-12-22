const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const router = express.Router();

router.post("/", (req, res) => {
    let email = req.body.email;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'test1smtp5858@gmail.com',  // gmail 계정 아이디를 입력
            pass: ''                 // gmail 계정의 비밀번호를 입력
        }   
    });


    fs.readFile(__dirname + '/mailer.html', (err, data) => {
        var mailOptions = {
            from: 'test1smtp5858@gmail.com',        // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
            to: email,                              // 수신 메일 주소
            subject: '[PressCheck] 분석 리포트',     // 제목
            text: data                              // 내용
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

})

module.exports = router;
