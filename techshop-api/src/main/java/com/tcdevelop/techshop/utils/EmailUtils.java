package com.tcdevelop.techshop.utils;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.tcdevelop.techshop.errorhandler.ErrorObject;
import com.tcdevelop.techshop.model.User;

@Service
public class EmailUtils {
	
	@Autowired
	private JavaMailSender mailSender;
	
	public static String emailBody(User user) {
		String emailBody = "<html>" + 
				"    <head>" + 
				"        <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">" + 
				"    </head>" + 
				"    <body>" + 
				"        <div class=\"row\">" + 
				"            <div class=\"col-12\" style=\"text-align: center\">" + 
				"                <img src=\"https://dewey.tailorbrands.com/production/brand_version_mockup_image/772/1724204772_19116617-1b88-42f9-bc08-fa8ad1860dd1.png?cb=1550955812\" class=\"img-fluid\"/>" + 
				"            </div>" +
				"            <div class=\"col-12\" style=\"text-align: center;margin-top: 70px\">" + 
				"                <p class=\"text-center\">Olá <b><font color=\"#2d51a3\">"+ user.getName() +"</font></b>, obrigado pelo cadastro em nossa loja!</p>" + 
				"                <p class=\"text-center\">Para você começar a comprar na TechShop só falta mais um passo: a ativação da sua conta</p><br><br>" + 
				"                <p class=\"text-center\">Clique no link abaixo para que a sua conta seja ativada e seu cadastro seja finalizado:</p>" + 
				"                <a href=\"http://localhost:8080/registerActivation/"+ user.getConfirmHash() +"\">Ativar conta</a><br>\r\n" + 
				"            </div>" + 
				"            <div class=\"col-12\" style=\"text-align: center;margin-top: 50px; font-weight: bold\">" + 
				"                <p class=\"text-center\" style=\"color: #2d51a3\">EQUIPE TECHSHOP</p>" + 
				"            </div>" + 
				"        </div>" + 
				"    </body>" + 
				"</html>";
		return emailBody;
	}
	
	public ResponseEntity sendActivationEmail(User user) {
		if(!user.isEnabled()) {
			
			try {
				
				MimeMessage mail = mailSender.createMimeMessage();
				MimeMessageHelper helper = new MimeMessageHelper(mail);
				helper.setTo(user.getEmail());
				helper.setSubject("TechShop - Ativação da conta");
				helper.setText(EmailUtils.emailBody(user), 
						true
				);
				mailSender.send(mail);
				
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(new ErrorObject("Error while sending email; \n"+e, "", user));
			}
			
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.badRequest().body(new ErrorObject("The user is already enabled", "", user));
	
	}

}
