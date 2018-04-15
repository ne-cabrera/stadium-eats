import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

Meteor.methods({
    "location.getStadium"(lat, lng, acc){
        try{
            acc += 20000;
            var a = HTTP.call("GET", "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=" + acc + "&type=stadium&key=AIzaSyA1hR7bNT1ZIhNGm1eHDGcXUPOB3bIMPo4");
            var jRes = JSON.parse(a.content);
            res = jRes.results[0].name;
            return res;
        }
        catch(e){
            
        }
    }
})