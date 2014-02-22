
exports.config = {
    title: 'Vote(r)',
    titleAdmin: 'Vote(r) Admin',
    ratings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    teams: ['ateam', 'eduteam', 'fruitloops', 'fux', 'ignore', 'macgyver', 'pumasimi', 'redduck', 'screamo'],
    teamNames: {
        'ateam':        {name: 'A Team', boss: 'Gyula', appName: 'Termék neve'},
        'eduteam':      {name: 'Eduteam', boss: '', appName: ''},
        'fruitloops':   {name: 'Fruit Loops', boss: '', appName: ''},
        'fux':          {name: 'Fux', boss: '', appName: ''},
        'ignore':       {name: 'Ignore', boss: '', appName: ''},
        'macgyver':     {name: 'Mac Gyver', boss: '', appName: ''},
        'pumasimi':     {name: 'Puma Simogató Trollok', boss: '', appName: ''},
        'redduck':      {name: 'Red Duck', boss: '', appName: ''},
        'screamo':      {name: 'Screamo', boss: '', appName: ''}
    },
    users: [
        {code: 'aaaa', email: 'david@ustream.tv', team: 'admin', admin: true},
        {code: 'OEVnLO22RLGN6', email: 'koszti.lajos@ustream.tv', team: 'fruitloops'},
        {code: 'BhZVn91BqfXrc', email: 'vachter.attila@ustream.tv', team: 'fruitloops'},
        {code: '1I2E7kgl9BBqQ', email: 'sulik.szabolcs@ustream.tv', team: 'fruitloops'}
    ]
};
