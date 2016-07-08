


var mainScenario = PF((done, fail) => {
    
    ON('slack', (method, data) => {
        console.log(method, '\n\t', data, '\n');
    });
    
    GLOBALEVENT.click.add((ev) => console.log('Click!'));
    
    done();
});


// Start

PAGE = {
    loadSettings     : PF(done => { loadJson('config.json', done); }),
    loadLocale       : PF(done => { loadJson(['locale/',config.locale,'.json'].join(''), done); }),
    declareInstances : PF(done => {
        for ( var name in MODEL ) {
            MODEL[name].declare.forEach(worker => worker());
        }
        done();
    }),
    loadDB           : PF(done => { STORAGE.db.onready(done); })
}

PAGE.loadSettings()
    .then(PAGE.loadLocale)
    .then(PAGE.declareInstances)
    .then(PAGE.loadDB)
    .catch(err => {
        console.error('Failed to initialize\n\t',err);
        return Promise.reject();
    })
    .then(
        mainScenario,
        ()=>console.error('Returning...')
    )
    .catch(err => {
        console.error('Failed during uptime\n\t',err);
        return Promise.reject();
    });


/*
window.PAGE = new Scenario('page');
PAGE.addNode('loadSettings', [], (done)=>{ loadJson('config.json', done); });
PAGE.addNode('loadLocale', ['loadSettings'], (done)=>{ loadJson(['locale/',config.locale,'.json'].join(''), done); });

PAGE.addNode('declareInstances', ['loadSettings'], (done)=>{
    for ( var name in MODEL ) {
        MODEL[name].declare.forEach(worker => worker());
    }
    done();
});
PAGE.addNode('loadDB', ['declareInstances'], (done)=>{ STORAGE.db.onready(done); });
PAGE.addNode('start',['loadDB'], mainScenario);

PAGE.run();
*/
