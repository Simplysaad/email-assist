<!-- # email-assist
email backend service




To manage or create new App Passwords, follow these steps:
1. Enable 2-Step Verification: This is a mandatory requirement to use App Passwords.
2. Access the Settings: Go to your Google Account and select Security.
3. Find App Passwords:
    * Scroll to the "How you sign in to Google" section and click on 2-Step Verification.
    * Scroll to the bottom of that page to find App Passwords.
    * Tip: If you can't find it, use the search bar at the top of your Google Account page and type "App Passwords".
4. Generate a New Password: Enter a name for the app (e.g., "Outlook" or "iPhone Mail") and click Create.
5. Copy and Use: Immediately copy the 16-character code shown on your screen. Use this instead of your regular password when signing into the third-party app. 

Note: If you change your main Google Account password, all existing App Passwords are automatically revoked for your protection. 

These guides detail the process for creating and using Google App Passwords when 2-Step Verification is enabled:


https://support.google.com/accounts/answer/185833?hl=en#:~:text=To%20continue%20to%20use%20an,with%20access%20to%20your%20account.

https://dev.to/usenmfon_uko/how-to-set-up-an-app-password-for-google-services-28oe#:~:text=Step%201:%20Click%20on%20your,%2C%20and%20click%20%22Create.%



requests

@BASE_URL = http://localhost:5000


POST {{BASE_URL}}/api/send-email 
Content-Type: application/json

{
    "to": ["mechseiko@gmail.com", "saadidris23@gmail.com"],
    "text": "nothing to see here",
    "subject": "Test120",
    "templateId":"69983ac6e50486c7a7bc8045",
    "templateParams": {
        "name": "saad",
        "subject": "Greetings 234",
        "reset-link": "http://localhost:5000"
    }
}


###
POST {{BASE_URL}}/api/template
Content-Type: application/json

{
    "title": "new Template",
    "description": "nothing to see here",
    "body": "<html lang='en'><head><title>{{{subject}}}</title></head><body><h1>Good Morning, {{{name}}}</h1><p>This is to inform you that there has been a password breach across ourservices and we request that you kindly reset your password to avoid being affected</p><p>This is your password reset link</p><a href='{{{reset-link}}}'>{{{reset-link}}}</a></body></html>",    "subject": "Greeting",
    "templateParams": ["subject", "reset-link", "name"]
}



 -->
