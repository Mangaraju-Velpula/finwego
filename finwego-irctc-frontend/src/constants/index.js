export const users = [
    {
        name: "Jhon Smith",
        id: "a2dcc8e6-d723-44bb-91d9-000f77841483",
        mail: "jhon.smith@gmail.com",
        role: "User"
    },
    {
        name: "Peter Parker",
        id: "3db8de37-4d60-4c77-a792-15c0a511b834",
        mail: "peter.parker@gmail.com",
        role: "User",
    },
    {
        name: "Bob Smith",
        id: "be2cc8b1-5f4b-4dff-b833-b5e05de9b254",
        mail: "bob.smith@gmail.com",
        role: "Admin",
    }
]

export const APIURLS = {
    cities : {
        getCities : 'http://localhost:9090/cities',
        createCity : 'http://localhost:9090/cities',
    },
    trains: {
        createTrain: 'http://localhost:9090/trains',
        getAllTrains: 'http://localhost:9090/trains',
        deleteTrain: 'http://localhost:9090/trains/{id}',
        updateTrain: 'http://localhost:9090/trains/{id}',
        getTrainsBetweenCities : 'http://localhost:9090/trains/between',
    },
    booking: {
        bookTickets: 'http://localhost:9090/booking',
        fetchUserBookings: 'http://localhost:9090/booking/history/user/{userId}',
        cancelTicket: 'http://localhost:9090/booking/cancel',
    }
}

export const HTTP_STATUS = {
    OK: 200,
}

export const HTTP_RESPONSES = {
    SUCCESS : 'success',
    FAILED: 'failed',
}

export const GENDERS = [
    {
        key: 'male',
        displayName: 'Male',
    },
    {
        key: 'female',
        displayName: 'Female',
    },
    {
        key: 'other',
        displayName: 'Other',
    }
]

export const PEOPLECATOGORIES = [
    {
        key: 'kid',
        displayName: 'Kids',
    },

    {
        key: 'adult',
        displayName: 'Adult',
    },

    {
        key: 'senior',
        displayName: "Senior Citizen"
    }
]