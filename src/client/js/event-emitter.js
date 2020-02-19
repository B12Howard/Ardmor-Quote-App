const EventEmitter = {
    events = {},
    dispatch(e, data) {
        if(!this.events[e]) return;
        this.events[e].forEach(callback => {
            return callback(data);
        });
    },
    subscribe(e,callback) {
        if(!this.events[e]) this.events[e] = [];
        this.events[e].push(callback);
    }
};

export default { EventEmitter };
