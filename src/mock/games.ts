const firstGame_RowCount = 3;
const firstGame_ColCount = 3;

const firstGame = {
    gameId: '1',
    gameName: 'Amazing game',
    private: false,
    exactPlayerCount: 2,
    rules: {
        colCount: 5,
        rowCount: 4,
        timeLimit: 30,
        maxPlayerCount: 3,
        winMode: 'Most Streaks',
        tilePop: false,
        streakLength: 3,
    },
    gameStarted: false,
}

export const games = [
    {
        players: {
            active: [1, 2],
            initial: [1, 2]
        },
        playerSymbols: {
            0: '-',
            1: 'X',
            2: 'O',
        },
        spectators: [],
        moves: [
            {
                playerId: 0,
                playerAbandon: false,
                boardLayout: Array.from({length: firstGame_RowCount}, (_, k) => 
                    Array.from({length: firstGame_ColCount}, (_, __) => 0)
                ),
                gameOver: false,
                tilePop: false,
                moveSpecs: {
                    row: 0,
                    col: 0,
                    time: 0,
                },
                highlightLayout: []
            }
        ],
        rules: {
            /* initial rules define a tictactoe 
            game with 60 second time limit */
            timeLimit: 60,
            winMode: 'firstStreak',
            tilePop: false,
            rowCount: firstGame_RowCount,
            colCount: firstGame_ColCount,
            streakLength: 3,
            maxPlayerCount: 2,
        },
        current: {
            playerId: 1,
            time: 0,
        },
        winnerId: 0,
        gameOver: false,
    }
]

export const gamesLists = [
    // {
    //     player: {
    //         name: 'Utku',
    //         motto: 'I win, you lose'
    //     }
    // },
    {
        gamesList: {
            items: [
                firstGame,
                {
                    gameId: '2',
                    gameName: 'Hard game',
                    private: false,
                    exactPlayerCount: 2,
                    rules: {
                        rowCount: 10,
                        colCount: 10,
                        streakLength: 6,
                        maxPlayerCount: 4,
                        timeLimit: 10,
                        tilePop: true,
                        winMode: 'Most Streaks'                       
                    },
                },
            ]
        }
    },
    {
        gamesList: {
            items: [
                firstGame,
                {
                    gameId: '2',
                    gameName: 'Hard game',
                    private: false,
                    exactPlayerCount: 2,
                    rules: {
                        rowCount: 10,
                        colCount: 10,
                        streakLength: 6,
                        maxPlayerCount: 4,
                        timeLimit: 10,
                        tilePop: true,
                        winMode: 'Most Streaks'
                    }
                },
                {
                    gameId: '3',
                    gameName: 'Ticky Tacky Topy',
                    exactPlayerCount: 2,
                    private: false,
                    rules: {
                        rowCount: 3,
                        colCount: 3,
                        streakLength: 3,
                        maxPlayerCount: 2,
                        timeLimit: 60,
                        tilePop: false,
                        winMode: 'First Streak'
                    }
                },
                {
                    gameId: '4',
                    gameName: 'Connect 4',
                    private: false,
                    exactPlayerCount: 4,
                    rules: {
                        rowCount: 10,
                        colCount: 10,
                        streakLength: 4,
                        maxPlayerCount: 4,
                        timeLimit: 60,
                        tilePop: false,
                        winMode: 'First Streak'
                    }
                },
                {
                    gameId: '5',
                    gameName: 'Hard TicTacToe',
                    private: false,
                    exactPlayerCount: 2,
                    rules: {
                        rowCount: 3,
                        colCount: 3,
                        streakLength: 3,
                        maxPlayerCount: 2,
                        timeLimit: 3,
                        tilePop: true,
                        winMode: 'First Streak'
                    }
                },
                {
                    gameId: '6',
                    gameName: 'Hard Connect 6',
                    private: false,
                    exactPlayerCount: 4,
                    rules: {
                        rowCount: 10,
                        colCount: 10,
                        streakLength: 6,
                        maxPlayerCount: 4,
                        timeLimit: 5,
                        tilePop: true,
                        winMode: 'Most Streaks'
                    },
                },
            ]
        }
    }
]