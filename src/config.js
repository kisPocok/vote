
exports.config = {
    title: 'Vote(r)',
    titleAdmin: 'Vote(r) Admin',
    ratings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    teams: ['alma', 'barack', 'korte'],
    teamNames: {
        'alma':   'Alma csapat',
        'barack': 'Barackos csapat',
        'korte':  'Körték!'
    },
    users: [
        {code: 'aaaa', team: 'alma', admin: true},
        {code: 'bbbb', team: 'barack'},
        {code: '1234', team: 'korte'}
    ]
};
