Meteor.methods({

  getYelpSearchResults: function(search) {
  // Query OAUTH credentials (these are set manually)
  //var auth = Accounts.loginServiceConfiguration.findOne({service: 'yelp'});

  // Add auth signature manually
  //auth['serviceProvider'] = { signatureMethod: "HMAC-SHA1" };

    var auth = {
        consumerSecret: "hK9gvz41glWwSSGqyN3lviLKnwo", // "nZw3_mkpUTs7hFWiLrxQAtE2dPo",
        consumerKey: "g2405YRES-FgILfUHV0GDg",// "2Vt-kngU-JGLCVuQBxi0pA"
        accessToken: "J5iwfqtMxutjMMq6p6FiR_L4UzawJlPS",
        accessTokenSecret: "gdAqrZD0sVHR_yTu9Tlb2sxbyho"
    };

    var parameters = {};

    parameters.term = search;

    // (SF is default location)
    parameters.location = 'San+Francisco';

    // Results limited to 5
    parameters.limit = 5;

    // Configure OAUTH parameters for REST call
    parameters.oauth_consumer_key = auth.consumerKey;
    parameters.oauth_consumer_secret = auth.consumerSecret;
    parameters.oauth_token = auth.accessToken;
    parameters.oauth_signature_method = "HMAC-SHA1";

    var config = {
      consumerKey: auth.consumerKey,
      secret: auth.consumerSecret
    };

    var urls = {
      requestToken: 'http://api.yelp.com/v2/search',
      accessToken: auth.accessToken
    }
    // Create OAUTH1 headers to make request to Yelp API
    var oauthBinding = new OAuth1Binding(config, urls);
    oauthBinding.accessTokenSecret = auth.accessTokenSecret;
    var headers = oauthBinding._buildHeader();
    return oauthBinding._call('GET', 'http://api.yelp.com/v2/search', headers, parameters).data;
  }

});