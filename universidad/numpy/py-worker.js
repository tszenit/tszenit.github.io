/* TS Zenit Universidad · Python 3.12 + NumPy en el navegador (Pyodide), aislado en un Web Worker. */
importScripts("https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js");
let py = null, RUN = null, NUEVO = null, CONSOLA = null;
const listo = (async () => {
  py = await loadPyodide();
  await py.loadPackage("numpy");
  py.runPython([
    "import ast, numpy as np",
    "def _tsz_ns():",
    "    return {'np': np, '__name__': '__main__'}",
    "def _tsz_run(src, ns, nombre='<consola>'):",
    "    arbol = ast.parse(src, nombre, 'exec')",
    "    ultimo = None",
    "    if arbol.body and isinstance(arbol.body[-1], ast.Expr):",
    "        ultimo = ast.Expression(arbol.body.pop().value)",
    "    exec(compile(arbol, nombre, 'exec'), ns)",
    "    if ultimo is not None:",
    "        v = eval(compile(ultimo, nombre, 'eval'), ns)",
    "        if v is not None:",
    "            return repr(v)",
    "    return None"
  ].join("\n"));
  RUN = py.globals.get("_tsz_run");
  NUEVO = py.globals.get("_tsz_ns");
  CONSOLA = NUEVO();
})();
listo.then(() => postMessage({ id: 0, ok: true }), e => postMessage({ id: 0, ok: false, error: String((e && e.message) || e) }));

function limpiar(msg) {
  const l = String(msg).split("\n");
  const i = l.findIndex(x => /File "(<consola>|<celda>|tu_codigo\.py)"/.test(x));
  return (i >= 0 ? ["Traceback (most recent call last):"].concat(l.slice(i)) : l.slice(-3)).join("\n").trim();
}

self.onmessage = async ({ data }) => {
  const { id, code, modo, devolver } = data;
  try { await listo; } catch (e) { postMessage({ id, ok: false, out: "", error: "No se pudo cargar Python. Revisa tu conexión y recarga la página." }); return; }
  if (modo === "reiniciar") { CONSOLA.destroy(); CONSOLA = NUEVO(); postMessage({ id, ok: true, out: "", rep: null }); return; }
  let out = "";
  py.setStdout({ batched: s => { out += s + "\n"; } });
  py.setStderr({ batched: s => { out += s + "\n"; } });
  try { await py.loadPackagesFromImports(data.fuente || code, { messageCallback: () => {}, errorCallback: () => {} }); } catch (e) {}
  const ns = modo === "consola" ? CONSOLA : NUEVO();
  try {
    const rep = RUN(code, ns, modo === "consola" ? "<consola>" : "<celda>");
    let val = null;
    if (devolver) { const v = ns.get(devolver); val = v == null ? null : String(v); }
    postMessage({ id, ok: true, out, rep: rep == null ? null : String(rep), val });
  } catch (e) {
    postMessage({ id, ok: false, out, error: limpiar((e && e.message) || e) });
  } finally {
    if (ns !== CONSOLA) ns.destroy();
  }
};
