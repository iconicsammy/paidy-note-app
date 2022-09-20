/*
    Analytics class that would log errors and others to our preffered
    space such as sentry or firebase

    for now logging to console
*/

class Logger {
    private static instance : Logger;

    constructor(){
        if(!Logger.instance){
            Logger.instance = this;
        }
        return Logger.instance;
    }

    logError(error: any){
        console.error(error);
    }
}

export default new Logger();