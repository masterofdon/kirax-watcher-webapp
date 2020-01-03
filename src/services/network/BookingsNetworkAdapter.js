import ApiStringBuilder from 'util/ApiStringBuilder';
import Axios from 'axios';

export default class AgenciesNetworkAdapter {
    constructor(authuser) {
        this.token = authuser.token;
        this.type = authuser.type;
        this.uid = authuser.uid;
        this.username = authuser.username
    }

    b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    getBookings(page, size) {
        var apiStr = new ApiStringBuilder().
            bookings()
            .parameter("page", page || 0)
            .parameter("size", size || 10)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    createBooking(booking) {
        var apiStr = new ApiStringBuilder().
            bookings()
            .toApiString();
        return Axios.post(
            apiStr,
            booking,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    verifiyBooking(bookingid){
        var apiStr = new ApiStringBuilder()
            .bookings(bookingid)
            .state("verified")
            .toApiString();
        return Axios.patch(
            apiStr,
            {},
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    rejectBooking(bookingid){
        var apiStr = new ApiStringBuilder()
            .bookings(bookingid)
            .state("reject")
            .toApiString();
        return Axios.patch(
            apiStr,
            {},
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    closeBooking(bookingid){
        var apiStr = new ApiStringBuilder()
            .bookings(bookingid)
            .state("close")
            .toApiString();
        return Axios.patch(
            apiStr,
            {},
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }

    queryBooking(query){
        var apiStr = new ApiStringBuilder().
            bookings()
            .parameter("query" , query)
            .toApiString();
        return Axios.get(
            apiStr,
            {
                headers: {
                    "Authorization": this.token
                }
            }
        );
    }
}