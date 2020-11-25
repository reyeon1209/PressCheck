import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def sender():
    addr_send = 'test1smtp5858@naver.com' # 보낸 사람 메일 주소
    pw_send = 'test5858!' # 보낸 사람 메일 비밀번호
    addr_receive = 'reyeon5368@naver.com' # 받는 사람 메일 주소

    html = open("./templates/mail.html")
    msg = MIMEText(html.read(), 'html')
    msg['From'] = addr_send
    msg['To'] = addr_receive
    msg['Subject'] = '[PressCheck] 분석 리포트'

    debug = False
    if debug:
      print(msg.as_string())
    else :
      server = smtplib.SMTP('smtp.naver.com', 587)
      server.starttls()
      server.login(addr_send, pw_send)
      text = msg.as_string()
      server.sendmail(addr_send, addr_receive, text)
      server.quit()

# euc_text = text.encode('euc-kr')


if __name__ == '__main__':
    sender()
