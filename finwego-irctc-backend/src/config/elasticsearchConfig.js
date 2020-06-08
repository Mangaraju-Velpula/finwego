import elasticsearch from 'elasticsearch';
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace',
})
export default client;