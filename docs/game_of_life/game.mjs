import {Rules} from './rules.mjs'; 

export class Game {
    #m_rows; 
    #m_cols; 
    #m_game; 

    constructor(r, c, d) {
        this.#m_rows = r; 
        this.#m_cols = c; 
        this.#m_game = new Rules(r, c, d); 
    }

    empty() { 
        let rows = this.#m_rows; 
        let cols = this.#m_cols;
        let grid = this.#m_game.grid.array;  

        for (let r = 0; r < rows; ++r) {
            for (let c = 0; c < cols; ++c) {
                if(grid[r][c] == 'x') {
                    return false;
                }
            }
        }

        return true; 
    }

    simulation() {
        var output; 
        while(!this.empty()) {
            output = this.#m_game.play(); 
            console.log(output.output()); 
        }
    }
}

var game = new Game(10, 10, 0.5)
game.simulation()