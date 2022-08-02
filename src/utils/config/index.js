const API_DEV_HOST = `http://192.168.1.8/evoucher/api-v2/`;
// const API_DEV_HOST = `https://devsysadd.da.gov.ph/evoucher/api-v2/`;
const API_PROD_HOST = `https://imp-app.da.gov.ph/api-v2/`;

const Config = {
    // 0 => Devlopment env, 1 => Production env
    APP_MODE:1,
    DEVELOPMENT: {
        API_HOST: `${API_DEV_HOST}`,
        API_ACCESS_POINT: `${API_DEV_HOST}`,
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
    };
    

    if (Config.APP_MODE === 0) {
        config = {
            ...config,
            apihost: Config.DEVELOPMENT.API_HOST,
            accesspoint: Config.DEVELOPMENT.API_ACCESS_POINT,
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
