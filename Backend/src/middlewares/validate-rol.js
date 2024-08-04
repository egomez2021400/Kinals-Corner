const { request, response } = require("express");

const rolAdmin = (req = request, res = response, next) => {
    if (!req.user) return res.status(404).json({ message: "Verifique el rol asignado con su token" });

    const { name, rol } = req.user
    if (rol !== 'ADMIN') {
        return res.status(404).json({
            message: `El usuario ${name} no es ADMIN - no puede realizar esta acción`
        });
    }

    next();
}

module.exports = {rolAdmin}