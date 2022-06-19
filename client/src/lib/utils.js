export const getRandomInt = (min, max) => {   //(1,13)=>1,2,...,12
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}