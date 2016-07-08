
MODEL.Protocol.declare.push(() => {
    
    new Protocol('slack', {
        read: function(self, data, path, done) {
            done(data);
            EMIT('slack/'+path.split('.').join('/'), path, data);
        },
        write: function(self, path, data, todo) {
            todo = todo || function(resp) { console.log(resp); };
            
            ajaxRequest('POST','https://slack.com/api/'+path, data, (resp)=> {
                self.read(resp, path, todo);
            });
        }
    });
    window.slack = PROTOCOL.slack.write;
    
});
