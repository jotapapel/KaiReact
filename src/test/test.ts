class Singleton {
	private constructor() {}
	private static value = 32;
	static trace () {
		console.log(this.value);
	}
}

