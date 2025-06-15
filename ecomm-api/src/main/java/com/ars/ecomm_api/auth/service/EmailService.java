package com.ars.ecomm_api.auth.service;


import com.ars.ecomm_api.auth.entity.AppUser;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String sender;


    public void sendEmail(AppUser user) {
        String subject = "Email Verification";
        String senderName = "Dabchi";
        String mailContent = "<p>Hello " + user.getFirstName() + ",</p>"
                + "<p>Thank you for registering with <strong>"+senderName+"</strong>.</p>"
                + "<p>Your verification code is:</p>"
                + "<h2 style=\"color: #2e86de;\">" + user.getVerificationCode() + "</h2>"
                + "<p>Enter this code in the application to verify your account.</p>"
                + "<br>"
                + "<p>If you did not initiate this request, please ignore this email.</p>"
                + "<p>Regards,<br><strong>" + senderName + " Team</strong></p>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(sender);
            helper.setTo(user.getEmail());
            helper.setSubject(subject);
            helper.setText(mailContent, true); // true = send HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }

    }





}
