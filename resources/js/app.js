


function mainScenario() {
    
    ON('slack', (method, data) => {
        console.log(method, '\n\t', data, '\n');
    });
    
    GLOBALEVENT.click.add((ev) => console.log('Click!'));
    
}


// Start
loadJson('config.json', function() {
    loadJson(['locale/',config.locale,'.json'].join(''), () => {
        declareInstances();
        STORAGE.db.onready(mainScenario);
    });
});

function declareInstances() {
    for ( var name in MODEL ) {
        MODEL[name].declare.forEach(worker => worker());
    }
}

