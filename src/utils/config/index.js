const API_DEV_HOST = `http://172.17.150.216/evoucher/api-v2/`;
const EXPRESS_ACCESS_POINT = `http://172.17.150.216:8080/`;
// const API_DEV_HOST = `https://devsysadd.da.gov.ph/imp/api-v2/`;
const API_PROD_HOST = `https://imp-rsbsa.da.gov.ph/api-v2/`;

const Config = {
    // 0 => Devlopment env, 1 => Production env
    APP_MODE:0,
    DEVELOPMENT: {
        API_HOST: `${API_DEV_HOST}`,
        API_ACCESS_POINT: `${API_DEV_HOST}`,
        EXPRESS_ACCESS_POINT:`${EXPRESS_ACCESS_POINT}`
    },
    PRODUCTION: {
        API_HOST: `${API_PROD_HOST}`,
        API_ACCESS_POINT: `${API_PROD_HOST}`,
    },
};

export default function getBaseUrl() {

    let config = {
        apihost: '',
        accesspoint: '',
        expressAccessPoint:''
    };
    

    if (Config.APP_MODE === 0) {
        config = {
            ...config,
            apihost: Config.DEVELOPMENT.API_HOST,
            accesspoint: Config.DEVELOPMENT.API_ACCESS_POINT,
            expressAccessPoint:Config.DEVELOPMENT.EXPRESS_ACCESS_POINT

        };
    } else {
        config = {
            ...config,
            apihost: Config.PRODUCTION.API_HOST,
            accesspoint: Config.PRODUCTION.API_ACCESS_POINT,
        };
    }

    return config;
}
