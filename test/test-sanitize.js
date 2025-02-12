const assert = require('assert');
const tough = require('../lib/cookie');

describe('Sanitization Test for Domain and Path', function() {
  it('should sanitize < and > in domain and path', function() {
    const cookie = new tough.Cookie({
      key: "test",
      value: "value",
      domain: "</script><script>alert('EXPLOITED')</script>",
      path: "</script><script>alert('EXPLOITED')</script>"
    });

    const serializedCookie = cookie.toString();
    console.log("Serialized Cookie:", serializedCookie);

    assert(serializedCookie.includes('&lt;'), 'Expected sanitized domain and path');
    assert(serializedCookie.includes('&gt;'), 'Expected sanitized domain and path');
    assert(!serializedCookie.includes('<'), 'Sanitization failed for <');
    assert(!serializedCookie.includes('>'), 'Sanitization failed for >');
  });
});
