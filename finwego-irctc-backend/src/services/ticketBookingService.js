
import ESService from '..//config/elasticsearchConfig';

const bookTicket = (params) => {
    return ESService.index({"index" : 'bookings', id: params.id, "body" : params});
};

const cancelTicket = (params) => {
     return ESService.update({
        index: "bookings", 
        id: params.bookingId,
        body: {
            "script": {
                "source": "ctx._source.canceledTickets.add(params.id)",
                "lang": "painless",
                "params": {
                  "id" : params.ticketId,
                  "cancel": 1
                }
            }
        }
    })
};

const userBookingHistory = (userId) => {
    return ESService.search({
        index: 'bookings',
        body: {
            "query" : {
                "match" : {
                    "bookedBy.id": userId	
                }
            },
            "sort" : {
                "bookedOn": "desc"
            }
        }
    })
};

export default {
    bookTicket,
    cancelTicket,
    userBookingHistory
};