export class Grid {
    #m_arr; 
    #m_rows; 
    #m_cols; 
    #m_dense; 

    constructor(r=10, c=10, d=0.6) {
        this.#m_rows = r; 
        this.#m_cols = c; 
        this.#m_dense = d; 
        this.#m_arr = new Array(r).fill(null).map(() => new Array(c).fill('.')); 
        
        var fill = Math.floor(this.#m_rows * this.#m_cols * this.#m_dense); 
        var filled = 0; 
        
        while (fill != filled) {
            let randRow = Math.floor(Math.random() * this.#m_rows); 
            let randCol = Math.floor(Math.random() * this.#m_cols); 

            if (this.#m_arr[randRow][randCol] != 'x') {
                this.#m_arr[randRow][randCol] = 'x'; 
                ++filled; 
            }
        }
    }

    get array() {
        return this.#m_arr; 
    }
    
    get rows() {
        return this.#m_rows; 
    }

    get columns() {
        return this.#m_cols; 
    }

    get density(){
        return this.#m_dense; 
    }

    set array(arr) {
        this.#m_arr = arr; 
    }

    output() {
        let rows = this.#m_rows; 
        let cols = this.#m_cols; 
        let arr = this.#m_arr
        let out = "+" + "---".repeat(cols) + "+\n"; 

        for (let i=0; i < rows; i++) {
            out += "|"; 
            for (let j=0; j < cols; j++) {
                out += " " + arr[i][j] + " "
            }
            out += "|\n";
        }

        out += "+" + "---".repeat(cols) + "+"; 
        return out; 
    }
}