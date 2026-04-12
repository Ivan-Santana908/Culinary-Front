export function auth(to, from, next){
    if(!localStorage.getItem('authToken')){
        next('/login');
    } else {
        next();
    }
}