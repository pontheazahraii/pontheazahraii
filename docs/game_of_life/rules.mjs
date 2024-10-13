import {Grid} from './grid.mjs'; 

export class Rules {
    #m_grid; 
    #m_rows; 
    #m_cols; 
    #m_tempGrid; 
    #m_neighbors; 
    #m_two; 

    constructor(r=10, c=10, d=0.6) {
        this.#m_grid = new Grid(r, c, d);
        this.#m_rows = this.#m_grid.rows;
        this.#m_cols = this.#m_grid.columns;
        this.#m_tempGrid = this.#m_grid.array;
        this.#m_neighbors = 0; 
        this.#m_two = false; 

    }

    get grid() {
        return this.#m_grid; 
    }

    get rows() {
        return this.#m_rows; 
    }

    get columns() {
        return this.#m_cols;
    }

    play() {
        let rows = this.#m_rows; 
        let cols = this.#m_cols;
        let grid = this.#m_grid.array;  

        for (let r=0; r < rows; ++r) {
            for (let c=0; c < cols; ++c) {
                // Check Corners 
                if ((r == 0 || r == rows-1) && (c == 0 || c == cols-1)) {
                    if (r == 0 && c == 0) {
                        this.increment(0, 1); 
                        this.increment(1, 1); 
                        this.increment(1, 0); 
                    } else if (r == 0 && c == cols-1) {
                        this.increment(0, cols-2); 
                        this.increment(1, cols-2);
                        this.increment(1, cols-1);
                    } else if (r == rows-1 && c == 0) {
                        this.increment(rows-2, 0); 
                        this.increment(rows-2, 1); 
                        this.increment(rows-1, 1);
                    } else if (r == rows-1 && c == cols-1) {
                        this.increment(rows-2, cols-1); 
                        this.increment(rows-2, cols-2); 
                        this.increment(rows-1, cols-2); 
                    }

                // Check Edges
                } else if ((r == 0 || r == rows-1) || (c == 0 || c == cols-1)) {
                    if (r == 0) {
                        this.increment(0, c-1); 
                        this.increment(0, c+1); 
                        this.increment(1, c-1); 
                        this.increment(1, c); 
                        this.increment(1, c+1);  
                    } else if (r == rows-1) {
                        this.increment(r-1, c-1); 
                        this.increment(r-1, c+1);
                        this.increment(r-2, c-1); 
                        this.increment(r-2, c); 
                        this.increment(r-2, c+1); 
                    } else if (c == 0) {
                        this.increment(r-1, 0); 
                        this.increment(r+1, 0); 
                        this.increment(r-1, 1); 
                        this.increment(r, 1); 
                        this.increment(r+1, 1);
                    } else if (c == cols-1) {
                        this.increment(r-1, c-1);
                        this.increment(r+1, c-1); 
                        this.increment(r-1, c-2); 
                        this.increment(r, c-2); 
                        this.increment(r+1, c-2); 
                    }

                // Check Middle 
                } else {
                    this.increment(r-1, c-1); 
                    this.increment(r-1, c); 
                    this.increment(r-1, c+1); 
                    this.increment(r, c-1); 
                    this.increment(r, c+1); 
                    this.increment(r+1, c-1); 
                    this.increment(r+1, c); 
                    this.increment(r+1, c+1); 
                }

                // Check if there is two neighbors
                if (this.#m_neighbors == 2) {
                    if (grid[r][c] == 'x') {
                        this.#m_two = true; 
                    } else if (grid[r][c] == '.') {
                        this.#m_two = false; 
                    }
                } 

                this.#m_tempGrid[r][c] = this.rules(); 
            }
        }

        this.#m_grid.array = this.#m_tempGrid; 
        return this.#m_grid; 
    }

    increment(r, c) {
        let grid = this.#m_grid.array; 
        if (grid[r][c] == 'x') {
            ++this.#m_neighbors; 
        }
    }

    rules() {
        let neighbors = this.#m_neighbors; 
        let two = this.#m_two; 
        let decision; 
        if (neighbors == 3) {
            decision = 'x'; 
        } else if (neighbors == 2) {
            if (two) {
                decision = 'x'; 
            } else {
                decision = '.'; 
            }
        } else {
            decision = '.'; 
        }
        this.#m_neighbors = 0; 
        return decision; 
    }
}