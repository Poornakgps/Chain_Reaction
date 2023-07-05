
export default class game {
    constructor(options={players:2}){
        this.game = [...Array(9)].map(() => [...Array(9)].map(() => { return { player: null, mass: 0 } }));
        this.players = ['red', 'green','blue','yellow','pink'].slice(0,options.players);
        this.turn = 0;
        this.check = false;
    }

    add(pos) {
        if (this.game[pos[0]][pos[1]].player === this.players[this.turn] || this.game[pos[0]][pos[1]].player === null) {
            this.game[pos[0]][pos[1]] = { mass: this.game[pos[0]][pos[1]].mass + 1, player: this.players[this.turn] };
            try{
                this.checkunstable();
            }
            catch {}
            if (this.check) {
                var players = this.players;
                for (var i = 0; i < players.length; i++) {
                    if (!this.searchPlayer(players[i])) {
                    players.splice(i, 1);
                    i--;
                    }
                }
            }
            if (this.turn + 1 >= this.players.length) {
                this.turn = 0;
            } else {
                this.turn++;
            }
        }
    }

    includesArray = (data, arr) => {
        return data.some(e => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o)));
    }

    masslimit = pos => {
        if (this.includesArray([[0, 0], [0, 8], [8, 0], [8, 8]], pos)) {
            return 1;
        }
        else if ([0, 8].includes(pos[0]) || [0, 8].includes(pos[1])) {
            return 2;
        }
        else {
            return 3;
        }
    }

    explode(pos) {
        try {
            this.game[pos[0] - 1][pos[1]] = { mass: this.game[pos[0] - 1][pos[1]].mass + 1, player: this.game[pos[0]][pos[1]].player };
        } catch { }
        try {
            this.game[pos[0] + 1][pos[1]] = { mass: this.game[pos[0] + 1][pos[1]].mass + 1, player: this.game[pos[0]][pos[1]].player };
        } catch { }
        try {
            this.game[pos[0]][pos[1] - 1] = { mass: this.game[pos[0]][pos[1] - 1].mass + 1, player: this.game[pos[0]][pos[1]].player };
        } catch { }
        try {
            this.game[pos[0]][pos[1] + 1] = { mass: this.game[pos[0]][pos[1] + 1].mass + 1, player: this.game[pos[0]][pos[1]].player };
        } catch { }
        this.game[pos[0]][pos[1]] = { mass: 0, player: null };
    }

    checkunstable() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.game[i][j].mass > this.masslimit([i, j])) {
                    this.check = true;
                    this.explode([i, j]);
                    this.checkunstable();
                }
            }
        }
    }

    searchPlayer = player => {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.game[i][j].player === player) {
                    return true;
                }
            }
        }
        return false;
    }
}