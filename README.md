"# SimplePassportTest" 

Simple test of passport.js with local strategy.
There's a service offered at /service which requires authentication by passport.js. The framework redirects to /static/logon.html. The form post the username and password to /logon endpoint which is driven by passport.js. The hardcoded username and passwort is admin/admin#. In case of sucessful login, the /login endpoint redirects to the /service endpoint again and the service endpoint can be accessed.

