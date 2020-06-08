
import ESService from '../config/elasticsearchConfig';

const createTrain = (params) => {
    console.log("params ", params);
    return ESService.index({"index" : 'trains', id: params.id, "body" : params});
};

const updateTrain = (id, params) => {
    return ESService.update({
        index: "trains", 
        id: id,
        body: {
            doc : params
        }
    })
}

const deleteTrain = (id) => {
    return ESService.delete({
        index: "trains",
        id: id
    })
}

const getTrain = (id ) => {
    return ESService.search({
        index: "trains",
        body: {
            query: {
                match : {
                    id : id
                }
            }
        }
    })
};

const getTrains = (reqObj) => {
    const query = {
        "query" : {
            "bool" : {
                "must" : [
                    {
                        "match" : {
                            "from.id" : reqObj.from.id
                        }
                    },
                    {
                        "match" : {
                            "to.id" : reqObj.to.id
                        }
                    }
                ]
            }
        }
    }
    if(reqObj.searchKey && reqObj.searchKey.length) {
        query.query.bool.must.push({
            "wildcard" : {
                "name" : {
                    "value" : "*"+reqObj.searchKey+"*"
                }
            }
        });
    }
    return ESService.search({
        index: 'trains',
        body: { ...query }     
    });
}

const getAllTrains = () => {
    return ESService.search({
        index: 'trains',
        body : {
            query : {
                match_all : {}
            }
        }
    })
}
export default {
    createTrain,
    updateTrain,
    deleteTrain,
    getTrain,
    getTrains,
    getAllTrains
};