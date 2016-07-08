


function mainScenario(done) {
    
    ON('slack', (method, data) => {
        console.log(method, '\n\t', data, '\n');
    });
    
    GLOBALEVENT.click.add((ev) => console.log('Click!'));
    
    done();
}


// Start
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

