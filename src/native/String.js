class ConstrainString extends String {
	capitalize() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }
}

module.exports = ConstrainString;


