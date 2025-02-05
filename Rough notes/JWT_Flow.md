1️⃣ User Registers → Their credentials are stored in the database.
2️⃣ User Logs In → Server validates credentials and issues a JWT token.
3️⃣ Client Stores Token → Token is saved in LocalStorage or a cookie.
4️⃣ User Makes Requests → Token is sent in the headers (Authorization).
5️⃣ Server Verifies Token → If valid, the user is granted access to protected resources.

