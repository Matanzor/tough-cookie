const tough = require('tough-cookie');

// Create a cookie with a potentially malicious domain name
const cookie = new tough.Cookie({
  key: "test",
  value: "value",
  domain: "</script><script>alert('EXPLOITED SUCCESSFULLY')</script>",
  path: "/"
});

// Serialize the cookie
console.log("Serialized Cookie:", cookie.toString());

// Check for the sanitized version to determine if the patch worked
if (cookie.toString().includes("&lt;script&gt;alert('EXPLOITED SUCCESSFULLY')&lt;/script&gt;")) {
  console.log("EXPLOIT FAILED");
} else {
  console.log("EXPLOITED SUCCESSFULLY");
}
