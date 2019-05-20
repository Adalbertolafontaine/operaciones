class helpers {
    mayor(valor1, valor2, options) {
        if (valor1 > valor2) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
    igual(valor1, valor2, options) {
        if (valor1 === valor2) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
    desigual(valor1, valor2, options) {
        if (valor1 !== valor2) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
    menor(valor1, valor2, options) {
        if (valor1 < valor2) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
}
exports = helpers;
