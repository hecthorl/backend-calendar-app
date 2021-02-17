const Evento = require("../models/evento");

const getEventos = async (req, res) => {
  const eventos = await Evento.find().populate("user", "name");
  res.json({
    ok: true,
    eventos,
  });
};

const crearEventos = async (req, res) => {
  const evento = new Evento(req.body);
  try {
    evento.user = req.uid;
    await evento.save();
    res.status(201).json({
      ok: true,
      evento,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno",
    });
  }
};

const actualizarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese ID",
        status: 404,
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegios para esta accion",
        status: 401,
      });
    }
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(205).json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno Events",
      status: 500,
    });
  }
};

const eliminarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese ID",
        status: 404,
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegios para esta accion",
        status: 401,
      });
    }
    await Evento.findByIdAndDelete(eventoId);
    res.status(200).json({
      ok: true,
      msg: "eliminado Corectamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno Events",
      status: 500,
    });
  }
};

module.exports = { getEventos, crearEventos, actualizarEvento, eliminarEvento };
