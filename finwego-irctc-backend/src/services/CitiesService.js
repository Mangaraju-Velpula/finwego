
import ESService from '..//config/elasticsearchConfig';

const createCity = (params) => {
    console.log("params are here ", params);
    return ESService.index({"index" : 'cities', "body" : params});
};

const getCitites = () => {
    return ESService.search({
        index : "cities",
        body : {
            query : {
                match_all:{}
            }
        }
    })
};
export default {
    createCity,
    getCitites
};