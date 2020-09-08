/*
Este arquivo é um auxiliar utilizado para desenvolver essa aplicação.
Era necessário um local para armazenar o URL do local host entendido pelo celular.
*/
const utils = {

    serverURL: link => {
        const fullPath = 'http://192.168.0.109:3333';
        const ip = '192.168.0.109';
        
        return link ? link.replace('localhost',ip) : fullPath;
    }
}
export default utils;